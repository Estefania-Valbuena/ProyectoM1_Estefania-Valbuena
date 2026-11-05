// 1. Selección de elementos del DOM
const btnGenerar = document.getElementById('btn-generar');
const selectCantidad = document.getElementById('select-cantidad');
const selectFormato = document.getElementById('select-formato');
const paletaGrid = document.getElementById('paleta-grid');
const toast = document.getElementById('toast');

// Estado general: guardamos el colorBase (HEX) como fuente de verdad única
let paletaActual = [];

// 2. Función de conversión matemática de HEX a HSL (Corregida)
function convertirHexAHsl(hex) {
    // 1. Limpiamos el # del inicio
    hex = hex.replace(/^#/, '');
}

    // Mitigación: Expandir HEX de 3 dígitos (ej: #FFF -> #FFFFFF) para evitar NaN Sugerido por la IA
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // 2. Cortamos en pedazos y los pasamos a decimal (0 a 1)
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    // 3. Buscamos el máximo, el mínimo y la diferencia (Delta)
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let delta = max - min;

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    // 4. Si hay diferencia, calculamos Matiz y Saturación real
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

        if (max === r) {
            h = (g - b) / delta + (g < b ? 6 : 0);
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }
        h /= 6;
    }

    // 5. Pasamos los valores a grados y porcentajes legibles
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    // 6. Devolvemos el texto listo para usar en CSS
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// 3. Función auxiliar para formatear el color maestro según el formato activo en pantalla
function obtenerColorFormateado(colorHex, formato) {
    if (formato === 'hex') {
        return colorHex;
    } else if (formato === 'hsl') {
        return convertirHexAHsl(colorHex);
    }
    return colorHex;
}

// 4. Generador base de colores aleatorios en formato HEX (Fuente de verdad)
function generarHexAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 5. Lógica para el botón "Generar" (crea nuevos colores en los no bloqueados)
function generarPaleta() {
    const cantidadDeseada = parseInt(selectCantidad.value);

    // Actualizamos los colores que NO estén bloqueados
    paletaActual = paletaActual.map(item => {
        if (item.bloqueado) return item;
        return {
            colorBase: generarHexAleatorio(),
            bloqueado: false
        };
    });

    // Si faltan casillas para llegar a la cantidad deseada, las agregamos
    while (paletaActual.length < cantidadDeseada) {
        paletaActual.push({
            colorBase: generarHexAleatorio(),
            bloqueado: false
        });
    }

    // Si sobraron, recortamos el array
    if (paletaActual.length > cantidadDeseada) {
        paletaActual = paletaActual.slice(0, cantidadDeseada);
    }

    renderizarPaleta();
}

// 5.1. Lógica exclusiva para cuando cambias la cantidad (no altera colores existentes)
function ajustarCantidad() {
    const cantidadDeseada = parseInt(selectCantidad.value);

    if (paletaActual.length > cantidadDeseada) {
        paletaActual = paletaActual.slice(0, cantidadDeseada);
    } else {
        while (paletaActual.length < cantidadDeseada) {
            paletaActual.push({
                colorBase: generarHexAleatorio(),
                bloqueado: false
            });
        }
    }

    renderizarPaleta();
}

// 6. Renderizado visual de las tarjetas en la interfaz
function renderizarPaleta() {
    paletaGrid.innerHTML = '';
    const formatoActual = selectFormato.value;

    paletaActual.forEach((item, index) => {
        // Obtenemos el texto visual convirtiendo el colorBase al formato actual
        const colorVisual = obtenerColorFormateado(item.colorBase, formatoActual);

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-color';

        tarjeta.innerHTML = `
            <div class="bloque-color" style="background-color: ${colorVisual};">
                <button class="btn-bloqueo" title="Bloquear color">
                    ${item.bloqueado ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="info-color">${colorVisual}</div>
        `;

        // Evento para bloquear / desbloquear el color
        const btnBloqueo = tarjeta.querySelector('.btn-bloqueo');
        btnBloqueo.addEventListener('click', (e) => {
            e.stopPropagation();
            paletaActual[index].bloqueado = !paletaActual[index].bloqueado;
            renderizarPaleta();
        });

        // Evento para copiar al portapapeles al hacer clic en la tarjeta
        tarjeta.addEventListener('click', () => {
            navigator.clipboard.writeText(colorVisual).then(() => {
                mostrarToast(`¡Copiado: ${colorVisual}!`);
            });
        });

        paletaGrid.appendChild(tarjeta);
    });
}

// 7. Feedback visual (Toast)
function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add('activo');
    setTimeout(() => {
        toast.classList.remove('activo');
    }, 2000);
}

// 8. Event Listeners 
btnGenerar.addEventListener('click', generarPaleta);
selectCantidad.addEventListener('change', ajustarCantidad);

// Al cambiar el formato, SOLO volvemos a renderizar sin generar nuevos tonos
selectFormato.addEventListener('change', () => {
    renderizarPaleta();
});

// Carga inicial al abrir la página por primera vez
window.addEventListener('DOMContentLoaded', () => {
    generarPaleta();
});