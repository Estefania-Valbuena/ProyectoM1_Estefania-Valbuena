# Proyecto-M1

Paleta de Colores 🎨

> "Genera una combinación inspiradora y armónica para tus proyectos o trabajos."

## Para ver el proyecto ingresa al (DEMO)
👉 [https://estefania-valbuena.github.io/ProyectoM1_Estefania-Valbuena/](https://estefania-valbuena.github.io/ProyectoM1_Estefania-Valbuena/)

---

## 🛠️ Tecnologías utilizadas

- **HTML5:** Estructura semántica con etiquetas modernas (`header`, `main`, `section`, `footer`).
- **CSS:** Estilos avanzados mediante `Grid`, `Flexbox`, diseño responsivo y efectos visuales (`transitions`, notificaciones `toast`).
- **JavaScript:** Lógica de conversión de colores (HEX/HSL), manipulación del DOM y gestión de estados de bloqueo.
- **Control de versiones y despliegue:** Git, GitHub y GitHub Pages.

---

## 🔧 Proceso de Desarrollo del Proyecto

### 1. Planificación y Definición de Requerimientos
- **Objetivo:** Crear una aplicación web interactiva y responsiva que permita generar paletas de colores aleatorias en formatos **HEX** y **HSL**, ofreciendo herramientas de personalización y accesibilidad.
- **Características clave definidas:**
  - Selector dinámico de cantidad de colores (6, 8 o 9).
  - Alternancia de formatos de código (HEX y HSL).
  - Sistema de bloqueo (*freeze*) de colores favoritos.
  - Copiado automático al portapapeles con retroalimentación visual (*Toast*).

## 📱 Demostración de la Aplicación

<p align="center">
  <img src="./demo.gif" alt="Demostración de la App" width="100%">
</p>

---

### 2. Maquetación y Estructura (HTML5)
- Se diseñó una estructura semántica limpia utilizando elementos modernos de HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`).
- Se integraron selectores y un contenedor principal (`paleta-grid`) para alojar las tarjetas de color de manera dinámica.

## Demostración Maquetación y Estructura (HTML5)

<p align="center">
  <img src="./html.gif" alt="Demostración HTML" width="100%">
</p>

---

### 3. Diseño Visual y Estilos (CSS3)
- **Diseño Adaptativo:** Implementación de **CSS Grid** (`repeat(auto-fit, minmax(...))`) y **Flexbox** para asegurar una correcta visualización en dispositivos móviles y de escritorio.
- **Estética y UI:** Uso de sombras suaves (`box-shadow`), transiciones fluidas en botones y tarjetas, y un diseño moderno con tipografías legibles.

## Demostración del diseño Visual y Estilos (CSS3)

<p align="center">
  <img src="./CSS.gif" alt="Demostración CSS" width="100%">
</p>

### 4. Lógica de Programación e Interactividad (JavaScript)
- **Generación de Colores:** Creación de funciones matemáticas en JavaScript para generar códigos aleatorios en formato HEX y HSL con rangos de saturación y luminosidad armónicos.
- **Gestión de Estado:** Uso de un array reactivo (`paletaActual`) para controlar qué colores están bloqueados mediante el icono de ❤️ y cuáles deben regenerarse 🤍.
- **Eventos del DOM:** Manipulación dinámica de elementos mediante escuchadores de eventos (`addEventListener`) para los cambios en los selectores, clics de generación y copiado al portapapeles con la API `navigator.clipboard`.

## Demostración Lógica de Programación e Interactividad (JavaScript)

<p align="center">
  <img src="./JS.gif" alt="Demostración JS" width="100%">
</p>

### 5. Control de Versiones y Despliegue (Git & GitHub Pages)
- Control de versiones incremental mediante **Git** con commits descriptivos estructurados.
- Despliegue continuo de la aplicación en GitHub Pages.

---

## ✨ Funcionalidades

### Requisitos principales
- **Selector de cantidad:** Permite elegir dinámicamente paletas de **6, 8 o 9 colores**.
- **Formatos de código:** Soporte para visualizar, alternar y convertir dinámicamente entre formatos **HEX** y **HSL** manteniendo el tono visual.
- **Generación aleatoria:** Botón interactivo para crear nuevas combinaciones al instante.
- **Microfeedback:** Notificaciones visuales flotantes (*Toast*) al copiar códigos de color.
- **Accesibilidad y diseño:** Enfoque accesible con etiquetas asociadas, diseño adaptativo con una estética limpia.

### Extras implementados
- **Bloqueo de colores:** Permite "congelar" colores específicos mediante un icono interactivo para que no cambien al generar una nueva paleta.
- **Copiado al portapapeles:** Copia automática del código de color al hacer clic sobre cualquier tarjeta.

---

## 🕹️ Cómo usar la app

1. Selecciona la cantidad de colores deseada (6, 8 o 9) desde el menú desplegable.
2. Elige el formato de código de tu preferencia (**HEX** o **HSL**).
3. Haz clic en el botón **GENERAR PALETA** para obtener combinaciones.
4. Haz clic en el icono de corazón (❤️) en cualquier tarjeta para **bloquear** el color que te guste y conservar su tono en la siguiente generación.
5. Haz clic sobre cualquier tarjeta de color para copiar su código al portapapeles de forma automática.

---

## 💻 Cómo ejecutarla en local

Si deseas probar el proyecto directamente en tu computadora:

1. Clona este repositorio abriendo tu terminal:
   ```bash
   git clone https://github.com/Estefania-Valbuena/ProyectoM1_Estefania-Valbuena.git 
--- 

## ✍️ Autor

Estefania Valbuena Rincon

