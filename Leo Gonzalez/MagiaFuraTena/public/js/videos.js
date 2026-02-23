document.addEventListener('DOMContentLoaded', () => {
    const listaVideos = [
        { id: '1', titulo: 'Majestuosidad desde el Aire', url: 'videos/mi_video.mp4' },
        { id: '2', titulo: 'Majestuosidad desde el Aire', url: 'videos/mi_video1.mp4' },
        { id: '3', titulo: 'El Rugir de Fura y Tena', url: 'videos/portada.mp4' },
        { id: '4', titulo: 'Vista desde el Bosque', url: 'videos/entrada.mp4' },
        { id: '5', titulo: 'Cabañas', url: 'videos/hospedajerural.mp4' },
        { id: '6', titulo: 'Cabañas', url: 'videos/hospedajerural2.mp4' },
        { id: '7', titulo: 'Cabañas', url: 'videos/hospedajerural1.mp4' }
    ];

    const videoMaster = document.getElementById('video-master');
    const tituloMaster = document.getElementById('titulo-master');
    const gridThumbs = document.getElementById('videos-grid');

    // Inicializar con el primer video
    if (listaVideos.length > 0) {
        cargarVideo(listaVideos[0].url, listaVideos[0].titulo);
    }

    function cargarVideo(url, titulo) {
        videoMaster.src = url;
        tituloMaster.innerText = titulo;
        videoMaster.play().catch(e => console.log("Auto-play prevenido por el navegador"));
    }

    // Generar Miniaturas
    listaVideos.forEach((video, index) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = `thumb-card ${index === 0 ? 'active' : ''}`;

        // El truco del "#t=0.1" en la URL fuerza al navegador a mostrar el primer frame como miniatura
        thumbDiv.innerHTML = `
            <div class="thumb-wrapper">
                <video src="${video.url}#t=0.1" preload="metadata" muted></video>
            </div>
            <p class="thumb-caption">${video.titulo}</p>
        `;

        thumbDiv.onclick = () => {
            // 1. Quitar clase activa de otros
            document.querySelectorAll('.thumb-card').forEach(el => el.classList.remove('active'));

            // 2. Añadir clase activa al actual
            thumbDiv.classList.add('active');

            // 3. Cargar el video en el reproductor principal
            cargarVideo(video.url, video.titulo);

            // 4. NUEVO: Centrar la miniatura automáticamente al tocarla
            thumbDiv.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        };

        gridThumbs.appendChild(thumbDiv);
    });
});