// 1. Selección de elementos del DOM
const btnGenerar = document.getElementById('btn-generar');
const btnGuardar = document.getElementById('btn-guardar');
const selectCantidad = document.getElementById('select-cantidad');
const selectFormato = document.getElementById('select-formato');
const paletaGrid = document.getElementById('paleta-grid');
const paletasGuardadasGrid = document.getElementById('paletas-guardadas-grid');
const toast = document.getElementById('toast');

// Estado general para guardar los colores actuales y bloqueos
let paletaActual = [];

// 2. Funciones de generación aleatoria

// Genera un color en formato HEX
function generarHexAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Genera un color en formato HSL
function generarHslAleatorio() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 51) + 50; 
    const l = Math.floor(Math.random() * 41) + 30; 
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Selector central para elegir el formato activo
function obtenerNuevoColor(formato) {
    return formato === 'hex' ? generarHexAleatorio() : generarHslAleatorio();
} 
// 3. Lógica  para generar paleta
function generarPaleta() {
    const cantidadDeseada = parseInt(selectCantidad.value);
    const formato = selectFormato.value;

    if (paletaActual.length !== cantidadDeseada) {
        let nuevaPaleta = [];
        for (let i = 0; i < cantidadDeseada; i++) {
            if (paletaActual[i] !== undefined) {
                nuevaPaleta.push(paletaActual[i]);
            } else {
                nuevaPaleta.push({
                    color: obtenerNuevoColor(formato),
                    bloqueado: false
                });
            }
        }
        paletaActual = nuevaPaleta.slice(0, cantidadDeseada);
    } else {
        paletaActual = paletaActual.map(item => {
            if (item.bloqueado) {
                return item;
            } else {
                return {
                    color: obtenerNuevoColor(formato),
                    bloqueado: false
                };
            }
        });
    }

    renderizarPaleta();
}

// 4. Renderizado visual de las tarjetas
function renderizarPaleta() {
    paletaGrid.innerHTML = '';

    paletaActual.forEach((item, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-color';

        tarjeta.innerHTML = `
            <div class="bloque-color" style="background-color: ${item.color};">
                <button class="btn-bloqueo" title="Bloquear color">
                    ${item.bloqueado ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="info-color">${item.color}</div>
        `;

        const btnBloqueo = tarjeta.querySelector('.btn-bloqueo');
        btnBloqueo.addEventListener('click', (e) => {
            e.stopPropagation();
            paletaActual[index].bloqueado = !paletaActual[index].bloqueado;
            renderizarPaleta();
        });

        tarjeta.addEventListener('click', () => {
            navigator.clipboard.writeText(item.color).then(() => {
                mostrarToast(`¡Copiado: ${item.color}!`);
            });
        });

        paletaGrid.appendChild(tarjeta);
    });
}

// 5. LocalStorage (Guardar y reutilizar)
function guardarPaletaActual() {
    if (paletaActual.length === 0) return;

    let paletasGuardadas = JSON.parse(localStorage.getItem('paletas')) || [];
    const nuevaPaletaArray = paletaActual.map(item => item.color);

    if (!paletasGuardadas.some(p => JSON.stringify(p) === JSON.stringify(nuevaPaletaArray))) {
        paletasGuardadas.push(nuevaPaletaArray);
        localStorage.setItem('paletas', JSON.stringify(paletasGuardadas));
        renderizarPaletasGuardadas();
        mostrarToast('¡Paleta guardada con éxito!');
    } else {
        mostrarToast('¡Esta paleta ya estaba guardada!');
    }
}

function renderizarPaletasGuardadas() {
    if (!paletasGuardadasGrid) return;
    paletasGuardadasGrid.innerHTML = '';
    let paletasGuardadas = JSON.parse(localStorage.getItem('paletas')) || [];

    if (paletasGuardadas.length === 0) {
        paletasGuardadasGrid.innerHTML = '<p style="color: #64748b; font-size: 0.9rem;">No hay paletas guardadas aún.</p>';
        return;
    }

    paletasGuardadas.forEach((paleta, index) => {
        const fila = document.createElement('div');
        fila.className = 'fila-paleta';
        fila.title = 'Haz clic para cargar esta paleta en la vista principal';
        fila.style.cursor = 'pointer';

        const miniColoresDiv = document.createElement('div');
        miniColoresDiv.className = 'mini-colores';

        paleta.forEach(color => {
            const bloque = document.createElement('div');
            bloque.className = 'mini-color-block';
            bloque.style.backgroundColor = color;
            bloque.title = color;
            miniColoresDiv.appendChild(bloque);
        });

        fila.addEventListener('click', () => {
            paletaActual = paleta.map(colorHex => ({
                color: colorHex,
                bloqueado: false
            }));

            if (selectCantidad.querySelector(`option[value="${paleta.length}"]`)) {
                selectCantidad.value = paleta.length;
            }

            renderizarPaleta();
            mostrarToast('¡Paleta cargada en la vista principal!');
        });      
               
        
        

        fila.appendChild(miniColoresDiv);
        fila.appendChild(btnEliminar);
        paletasGuardadasGrid.appendChild(fila);
    });
}

// 6. Feedback visual (Toast)
function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add('activo');
    setTimeout(() => {
        toast.classList.remove('activo');
    }, 2000);
}

// 7. Event Listeners
btnGenerar.addEventListener('click', generarPaleta);
if (btnGuardar) btnGuardar.addEventListener('click', guardarPaletaActual);
selectCantidad.addEventListener('change', generarPaleta);
selectFormato.addEventListener('change', () => {
    paletaActual = paletaActual.map(item => {
        if (item.bloqueado) return item;
        return {
            color: obtenerNuevoColor(selectFormato.value),
            bloqueado: false
        };
    });
    renderizarPaleta();
});

// Carga inicial al abrir la página
window.addEventListener('DOMContentLoaded', () => {
    generarPaleta();
    renderizarPaletasGuardadas();
});