// 1. Selección de elementos del DOM
const btnGenerar = document.getElementById('btn-generar');
const selectCantidad = document.getElementById('select-cantidad');
const selectFormato = document.getElementById('select-formato');
const paletaGrid = document.getElementById('paleta-grid');
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

// 3. Lógica para generar y ajustar la paleta
function generarPaleta() {
    const cantidadDeseada = parseInt(selectCantidad.value);
    const formato = selectFormato.value;

    // Si necesitamos más colores, los agregamos respetando los bloqueados o existentes
    while (paletaActual.length < cantidadDeseada) {
        paletaActual.push({
            color: obtenerNuevoColor(formato),
            bloqueado: false
        });
    }

    // Si seleccionó una cantidad menor, recortamos el array al tamaño deseado
    if (paletaActual.length > cantidadDeseada) {
        paletaActual = paletaActual.slice(0, cantidadDeseada);
    }

    // Actualizamos los colores que NO estén bloqueados si ya existían
    paletaActual = paletaActual.map(item => {
        if (item.bloqueado) return item;
        return {
            color: obtenerNuevoColor(formato),
            bloqueado: false
        };
    });

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

// 5. Feedback visual (Toast)
function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add('activo');
    setTimeout(() => {
        toast.classList.remove('activo');
    }, 2000);
}

// 6. Event Listeners (¡Aquí estaba el error del 'map' en vez de 'change'!)
btnGenerar.addEventListener('click', generarPaleta);
selectCantidad.addEventListener('change', generarPaleta);
selectFormato.addEventListener('change', () => {
    const formato = selectFormato.value;
    paletaActual = paletaActual.map(item => {
        if (item.bloqueado) return item;
        return {
            color: obtenerNuevoColor(formato),
            bloqueado: false
        };
    });
    renderizarPaleta();
});

// Carga inicial al abrir la página
window.addEventListener('DOMContentLoaded', () => {
    generarPaleta();
});