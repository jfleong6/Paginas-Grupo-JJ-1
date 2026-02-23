document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('galeria-dinamica');
    const lightbox = document.getElementById('lightbox');
    const contenidoLightbox = document.getElementById('contenido-lightbox');
    const btnCerrar = document.querySelector('.cerrar-lightbox');

    // CONFIGURACIÓN: Solo cambia estos números
    const totalImagenes = 13; 
    const totalVideos = 5;

    // 1. Generar Imágenes
    for (let i = 1; i <= totalImagenes; i++) {
        const item = crearItemGaleria('foto', i);
        contenedor.appendChild(item);
    }

    // 2. Generar Videos
    for (let i = 1; i <= totalVideos; i++) {
        const item = crearItemGaleria('video', i);
        contenedor.appendChild(item);
    }

    // Función para crear el elemento HTML
    function crearItemGaleria(tipo, indice) {
        const figure = document.createElement('figure');
        figure.className = 'galeria-item';
        
        let mediaHTML = "";
        let titulo = "";
        let sub = "";

        if (tipo === 'foto') {
            mediaHTML = `<img src="static/img/galeria${indice}.jpg" alt="Trabajo ${indice}" class="vertical-img">`;
            titulo = "Proyecto Visual";
            sub = "Fotografía";
        } else {
            figure.classList.add('video-item');
            mediaHTML = `
                <video autoplay muted loop playsinline class="galeria-video vertical-img">
                    <source src="static/video/video${indice}.mp4" type="video/mp4">
                </video>`;
            titulo = "Producción";
            sub = "Video Profesional";
        }

        figure.innerHTML = `
            ${mediaHTML}
            <figcaption>
                <h3>${titulo} ${indice}</h3>
                <span>${sub}</span>
            </figcaption>
        `;

        // Evento para abrir el Lightbox
        figure.addEventListener('click', () => abrirLightbox(tipo, indice));
        
        return figure;
    }

    // Función para el Zoom
    function abrirLightbox(tipo, indice) {
        lightbox.classList.add('activo');
        if (tipo === 'foto') {
            contenidoLightbox.innerHTML = `<img src="static/img/galeria${indice}.jpg">`;
        } else {
            contenidoLightbox.innerHTML = `
                <video controls autoplay>
                    <source src="static/video/video${indice}.mp4" type="video/mp4">
                </video>`;
        }
    }

    // Cerrar Lightbox
    btnCerrar.onclick = () => lightbox.classList.remove('activo');
    lightbox.onclick = (e) => { if(e.target === lightbox) lightbox.classList.remove('activo'); };
});