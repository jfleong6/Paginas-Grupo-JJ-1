// ===== SISTEMA DE GALERÍA DINÁMICA =====
function inicializarGaleriaDinamica() {
    const galeriaGrid = document.getElementById('galeria-grid');
    const lightbox = document.getElementById('lightbox');
<<<<<<< HEAD

    if (!galeriaGrid) return;

    // Configuración de Rutas Optimizadas
    const configGaleria = {
        rutaGaleria: 'img/Galeria/optimizadas/', // Fuente principal WebP
        rutaOriginal: 'img/Galeria/',           // Respaldo o Lightbox
        rutaMiniaturas: 'img/Galeria/optimizadas/',
=======
    
    if (!galeriaGrid) return;
    
    // Configuración
    const configGaleria = {
        rutaGaleria: 'img/Galeria/',
        rutaMiniaturas: 'img/Galeria/miniaturas/',
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
        imagenesPorPagina: 12,
        paginaActual: 1,
        imagenesCargadas: 0,
        todasLasImagenes: [],
        imagenesFiltradas: [],
        filtroActual: 'todas'
    };
<<<<<<< HEAD

    const categorias = {
        'paisajes': 'Paisajes',
        'flora': 'Flora',
        'fauna': 'Fauna',
        'cultura': 'Cultura',
        'actividades': 'Actividades'
    };

    cargarImagenesReales();

    // ===== FUNCIONES PRINCIPALES =====

    async function cargarImagenesReales() {
        mostrarEstadoCarga();
        try {
            const nombresImagenes = await obtenerNombresImagenes();
=======
    
    // Datos para las imágenes (se completarán dinámicamente)
    const categorias = {
        'paisajes': 'Paisajes',
        'flora': 'Flora',
        'fauna': 'Fauna', 
        'cultura': 'Cultura',
        'actividades': 'Actividades'
    };
    
    // Inicializar galería
    cargarImagenesReales();
    
    // ===== FUNCIONES PRINCIPALES =====
    
    async function cargarImagenesReales() {
        mostrarEstadoCarga();
        
        try {
            // Obtener lista de imágenes de la carpeta
            const nombresImagenes = await obtenerNombresImagenes();
            
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
            if (nombresImagenes.length === 0) {
                mostrarSinImagenes();
                return;
            }
<<<<<<< HEAD

            const imagenesMezcladas = mezclarArray(nombresImagenes);
            const nuevasImagenes = crearObjetosImagenes(imagenesMezcladas);

            configGaleria.todasLasImagenes = [...configGaleria.todasLasImagenes, ...nuevasImagenes];
            configGaleria.imagenesFiltradas = nuevasImagenes;

            renderizarImagenes(nuevasImagenes);
            configGaleria.imagenesCargadas += nuevasImagenes.length;
=======
            
            // Mezclar las imágenes aleatoriamente
            const imagenesMezcladas = mezclarArray(nombresImagenes);
            
            // Crear objetos de imágenes con metadatos
            const nuevasImagenes = crearObjetosImagenes(imagenesMezcladas);
            
            // Actualizar configuración
            configGaleria.todasLasImagenes = [...configGaleria.todasLasImagenes, ...nuevasImagenes];
            configGaleria.imagenesFiltradas = nuevasImagenes;
            
            // Renderizar imágenes
            renderizarImagenes(nuevasImagenes);
            
            // Actualizar contador
            configGaleria.imagenesCargadas += nuevasImagenes.length;
            
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
        } catch (error) {
            console.error('Error cargando imágenes:', error);
            mostrarErrorGaleria();
        }
    }
<<<<<<< HEAD

    async function obtenerNombresImagenes() {
        const imagenesConocidas = [
            'AMFT-2.webp', 'AMFT-3.webp', 'AMFT-4.webp', 'AMFT-5.webp', 'AMFT-6.webp',
            'cascadaAbuelos.webp', 'CharcoLaMoya2.webp', 'charcoMoya.webp',"hospedajerural1.webp",
            'galeriaEsmeralda.webp', 'gastronomiaCampesina.webp', 'MuseoCampesino3.webp',
            'MusesoCampesino1.webp', 'museoCampesino.webp', 'Panoramica.webp',
            'peñaCorazonEncantado.webp', "Panoramica1.webp", "caminataecologica1.webp", "Mariposa.webp"
        ];

        const imagenesExistentes = [];
        // Chequeo de existencia asíncrono
=======
    
    async function obtenerNombresImagenes() {
        // Lista de imágenes conocidas (puedes ampliarla)
        const imagenesConocidas = [
            'AMFT-2.jpg',
            'AMFT-3.jpg', 
            'AMFT-4.jpg',
            'AMFT-5.jpg',
            'AMFT-6.jpg'
        ];
        
        // En un entorno real con backend, aquí harías fetch a una API
        // Por ahora usamos las imágenes conocidas más un chequeo de existencia
        const imagenesExistentes = [];
        
        // Verificar qué imágenes existen realmente
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
        for (const imagen of imagenesConocidas) {
            if (await imagenExiste(`${configGaleria.rutaGaleria}${imagen}`)) {
                imagenesExistentes.push(imagen);
            }
        }
<<<<<<< HEAD
        return imagenesExistentes.length > 0 ? imagenesExistentes : [];
    }

=======
        
        // Si no hay imágenes, usar placeholder
        if (imagenesExistentes.length === 0) {
            console.warn('No se encontraron imágenes en la carpeta. Usando imágenes de ejemplo.');
            return ['placeholder-1.jpg', 'placeholder-2.jpg', 'placeholder-3.jpg'];
        }
        
        return imagenesExistentes;
    }
    
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
    function imagenExiste(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
<<<<<<< HEAD
            setTimeout(() => resolve(false), 1500);
        });
    }

    function mezclarArray(array) {
=======
            
            // Timeout por si la imagen no responde
            setTimeout(() => resolve(false), 1000);
        });
    }
    
    function mezclarArray(array) {
        // Algoritmo Fisher-Yates para mezclar aleatoriamente
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
        const mezclado = [...array];
        for (let i = mezclado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mezclado[i], mezclado[j]] = [mezclado[j], mezclado[i]];
        }
        return mezclado;
    }
<<<<<<< HEAD

    function crearObjetosImagenes(nombresImagenes) {
        const categoriasDisponibles = Object.keys(categorias);
        const titulosPorNombre = {
            'AMFT-2.webp': 'Vista Panorámica del Cerro Fura',
            'AMFT-3.webp': 'Atardecer en los Cerros Gemelos',
            'AMFT-4.webp': 'Sendero Ecológico entre Montañas',
            'AMFT-5.webp': 'Flora Nativa del Bosque',
            'AMFT-6.webp': 'Mirador Natural con Vista Aérea',
            'cascadaAbuelos.webp': 'Cascada de los Abuelos',
            'CharcoLaMoya2.webp': 'Pozo Esmeralda La Moya',
            'charcoMoya.webp': 'Caída de Agua La Moya',
            "hospedajerural1.webp": "Expectacular vista desde el hospedaje rural",
            'galeriaEsmeralda.webp': 'Riqueza Mineral y Esmeraldífera',
            'gastronomiaCampesina.webp': 'Sabores de Nuestra Tierra',
            'museoCampesino.webp': 'Herencia Agrícola Ancestral',
            'MuseoCampesino3.webp': 'Cocina de Antaño',
            'MusesoCampesino1.webp': 'Memorias de la Vida Campesina',
            'Panoramica.webp': 'Majestuosidad de Fura y Tena',
            'peñaCorazonEncantado.webp': 'Peña Corazón Encantado',
            "Panoramica1.webp": "Panorámica de los Cerros Fura y Tena",
            "caminatasecologicas1.webp": "Caminatas Ecológicas en la Naturaleza",
            "Mariposas.webp": "El Encanto de las Mariposas Azules"

        };

        const descripcionesPorNombre = {
            'AMFT-2.webp': 'Captura aérea que muestra la majestuosidad del cerro Fura en todo su esplendor.',
            'AMFT-3.webp': 'Los últimos rayos del sol pintan el cielo sobre los cerros Fura y Tena.',
            'AMFT-4.webp': 'Sendero natural que serpentea entre la vegetación autóctona de la región.',
            'AMFT-5.webp': 'Diversidad de especies vegetales que habitan en este ecosistema único.',
            'AMFT-6.webp': 'Vista privilegiada desde uno de nuestros miradores naturales estratégicos.',
            'cascadaAbuelos.webp': 'Una impresionante caída de agua rodeada de densa vegetación selvática.',
            'CharcoLaMoya2.webp': 'Pozo natural de aguas tranquilas y tonos esmeralda.',
            'charcoMoya.webp': 'Vista del charco La Moya y el entorno natural virgen.',
            "hospedajerural1.webp": "Expectacular vista desde el hospedaje rural",
            'galeriaEsmeralda.webp': 'Exhibición de minerales y cristales en bruto de la región.',
            'gastronomiaCampesina.webp': 'Plato tradicional de Piquete servido sobre hojas de bijao.',
            'museoCampesino.webp': 'Herramientas agrícolas antiguas y maquinaria de madera.',
            'MuseoCampesino3.webp': 'Colección de utensilios de cocina ancestrales.',
            'MusesoCampesino1.webp': 'Máquinas de coser antiguas y vasijas de barro.',
            'Panoramica.webp': 'Espectacular vista de los cerros Fura y Tena.',
            'peñaCorazonEncantado.webp': 'Imponente pared de roca natural con estratos visibles.',
            "Panoramica1.webp": "Vista panorámica de los cerros Fura y Tena desde un mirador estratégico.",
            "caminatasecologicas1.webp": "Explora senderos naturales rodeados de biodiversidad con nuestras caminatas ecológicas guiadas. Una oportunidad para conectarte con la naturaleza y aprender sobre la flora y fauna local.",
            "Mariposas.webp": "Admira el fascinante espectáculo de las mariposas azules en su hábitat natural. Un santuario donde estas criaturas aladas realizan su danza aérea, crear un paisaje mágico y colorido."
    
        };

        return nombresImagenes.map((nombre, index) => {
            const categoria = categoriasDisponibles[index % categoriasDisponibles.length];
            return {
                id: Date.now() + index,
                src: `${configGaleria.rutaOriginal}${nombre}`,
                nombreArchivo: nombre,
                titulo: titulosPorNombre[nombre] || `Magia Fura y Tena`,
                descripcion: descripcionesPorNombre[nombre] || `Explora la magia ancestral de Boyacá.`,
                categoria: categoria,
                categoriaTexto: categorias[categoria]
            };
        });
    }

    function renderizarImagenes(imagenes) {
        const skeletons = document.querySelectorAll('.galeria-item.cargando');
        skeletons.forEach(skeleton => skeleton.remove());

        imagenes.forEach((imagen, index) => {
            const delay = index * 50;
            const imagenElement = document.createElement('div');
            imagenElement.className = 'galeria-item';
            imagenElement.style.animationDelay = `${delay}ms`;

            imagenElement.innerHTML = `
                <div class="imagen-contenedor" style="background: #eee; aspect-ratio: 16/9; overflow: hidden;">
                    <img class="galeria-img" 
                         alt="${imagen.titulo}" 
                         loading="lazy" 
                         style="opacity: 0; transition: opacity 0.5s ease; width: 100%; height: 100%; object-fit: cover;">
                    <div class="galeria-overlay">
                        <div class="galeria-info">
                            <h3>${imagen.titulo}</h3>
                            <p>${imagen.descripcion}</p>
                        </div>
                    </div>
                </div>
            `;

            const imgElement = imagenElement.querySelector('img');
            
            // Lógica de aparición suave
            const imgReal = new Image();
            imgReal.src = imagen.src;
            imgReal.onload = () => {
                imgElement.src = imagen.src;
                imgElement.style.opacity = '1';
                imgElement.classList.add('cargado');
            };

            imagenElement.addEventListener('click', () => abrirLightbox(imagen));
            
=======
    
    function crearObjetosImagenes(nombresImagenes) {
        const categoriasDisponibles = Object.keys(categorias);
        const titulosPorNombre = {
            'AMFT-2.jpg': 'Vista Panorámica del Cerro Fura',
            'AMFT-3.jpg': 'Atardecer en los Cerros Gemelos',
            'AMFT-4.jpg': 'Sendero Ecológico entre Montañas',
            'AMFT-5.jpg': 'Flora Nativa del Bosque',
            'AMFT-6.jpg': 'Mirador Natural con Vista Aérea'
        };
        
        const descripcionesPorNombre = {
            'AMFT-2.jpg': 'Captura aérea que muestra la majestuosidad del cerro Fura en todo su esplendor.',
            'AMFT-3.jpg': 'Los últimos rayos del sol pintan el cielo sobre los cerros Fura y Tena.',
            'AMFT-4.jpg': 'Sendero natural que serpentea entre la vegetación autóctona de la región.',
            'AMFT-5.jpg': 'Diversidad de especies vegetales que habitan en este ecosistema único.',
            'AMFT-6.jpg': 'Vista privilegiada desde uno de nuestros miradores naturales estratégicos.'
        };
        
        return nombresImagenes.map((nombre, index) => {
            // Asignar categoría aleatoria para variedad
            const categoriaIndex = index % categoriasDisponibles.length;
            const categoria = categoriasDisponibles[categoriaIndex];
            
            // Obtener título y descripción
            const titulo = titulosPorNombre[nombre] || `Imagen ${index + 1} - Magia Fura y Tena`;
            const descripcion = descripcionesPorNombre[nombre] || 
                `Fotografía capturada en los majestuosos cerros Fura y Tena, mostrando la belleza natural del lugar.`;
            
            return {
                id: Date.now() + index, // ID único
                src: `${configGaleria.rutaGaleria}${nombre}`,
                srcMiniatura: `${configGaleria.rutaMiniaturas}${nombre}`,
                nombreArchivo: nombre,
                titulo: titulo,
                descripcion: descripcion,
                categoria: categoria,
                categoriaTexto: categorias[categoria],
                fecha: obtenerFechaAleatoria(),
                likes: Math.floor(Math.random() * 150) + 50,
                vistas: Math.floor(Math.random() * 1000) + 200
            };
        });
    }
    
    function obtenerFechaAleatoria() {
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const mes = meses[Math.floor(Math.random() * 12)];
        const año = 2022 + Math.floor(Math.random() * 3); // 2022-2024
        return `${mes} ${año}`;
    }
    
    function mostrarEstadoCarga() {
        const skeletons = Array(configGaleria.imagenesPorPagina).fill().map((_, i) => `
            <div class="galeria-item cargando" style="animation-delay: ${i * 50}ms">
                <div class="skeleton"></div>
            </div>
        `).join('');
        
        galeriaGrid.innerHTML = skeletons;
    }
    
    function renderizarImagenes(imagenes) {
        // Limpiar skeletons
        const skeletons = document.querySelectorAll('.galeria-item.cargando');
        skeletons.forEach(skeleton => skeleton.remove());
        
        // Agregar imágenes reales
        imagenes.forEach((imagen, index) => {
            const delay = index * 50;
            
            const imagenElement = document.createElement('div');
            imagenElement.className = 'galeria-item';
            imagenElement.style.animationDelay = `${delay}ms`;
            imagenElement.dataset.id = imagen.id;
            imagenElement.dataset.categoria = imagen.categoria;
            
            // Crear elemento de imagen con lazy loading
            const imgElement = document.createElement('img');
            imgElement.loading = 'lazy';
            imgElement.alt = imagen.titulo;
            
            // Usar un placeholder pequeño mientras carga
            imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyNSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+';
            imgElement.dataset.src = imagen.src;
            
            // Cargar la imagen real
            const imgReal = new Image();
            imgReal.onload = () => {
                imgElement.src = imagen.src;
                imgElement.classList.add('cargado');
            };
            imgReal.src = imagen.src;
            
            // Manejar error
            imgElement.onerror = () => {
                imgElement.src = 'img/placeholder.jpg';
                imgElement.alt = 'Imagen no disponible';
            };
            
            imagenElement.innerHTML = `
                <div class="imagen-contenedor">
                    <!-- Imagen se insertará aquí -->
                </div>
                <div class="galeria-overlay">
                    <div class="galeria-info">
                        <h3>${imagen.titulo}</h3>
                        <p>${imagen.descripcion}</p>
                    </div>
                </div>
            `;
            
            // Insertar la imagen en el contenedor
            imagenElement.querySelector('.imagen-contenedor').appendChild(imgElement);
            
            // Agregar evento click para lightbox
            imagenElement.addEventListener('click', () => {
                abrirLightbox(imagen);
            });
            
            // Agregar efecto de carga gradual
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
            setTimeout(() => {
                galeriaGrid.appendChild(imagenElement);
            }, delay);
        });
<<<<<<< HEAD
    }

    // ===== LIGHTBOX =====

    function abrirLightbox(imagen) {
        console.log('Abriendo Lightbox para:', imagen);
        document.getElementById('lightbox-imagen').src = imagen.src;
        document.getElementById('lightbox-titulo').textContent = imagen.titulo;
        document.getElementById('lightbox-descripcion').textContent = imagen.descripcion;

        lightbox.classList.add('mostrar');
        document.body.style.overflow = 'hidden';
        configurarNavegacionLightbox(imagen.id);
    }
=======
        
        // Inicializar observador para lazy loading
        inicializarLazyLoading();
    }
    
    function inicializarLazyLoading() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target.querySelector('img');
                        if (img && img.dataset.src) {
                            img.src = img.dataset.src;
                            delete img.dataset.src;
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });
            
            document.querySelectorAll('.galeria-item:not(.cargando)').forEach(item => {
                observer.observe(item);
            });
        }
    }
    
    function mostrarSinImagenes() {
        galeriaGrid.innerHTML = `
            <div class="sin-imagenes">
                <i class="fas fa-images"></i>
                <h3>Galería Vacía</h3>
                <p>No se encontraron imágenes en la carpeta de galería.</p>
                <p>Agrega imágenes en: <code>${configGaleria.rutaGaleria}</code></p>
                <div class="imagenes-ejemplo">
                    <p>Imágenes esperadas:</p>
                    <ul>
                        <li>AMFT-2.jpg</li>
                        <li>AMFT-3.jpg</li>
                        <li>AMFT-4.jpg</li>
                        <li>AMFT-5.jpg</li>
                        <li>AMFT-6.jpg</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    function mostrarErrorGaleria() {
        galeriaGrid.innerHTML = `
            <div class="error-galeria">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Cargando Galería</h3>
                <p>Ocurrió un problema al cargar las imágenes.</p>
                <button class="btn-reintentar" id="btn-reintentar">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
        
        document.getElementById('btn-reintentar')?.addEventListener('click', () => {
            location.reload();
        });
    }
    
    // ===== LIGHTBOX =====
    
    function abrirLightbox(imagen) {
        // Actualizar lightbox con la imagen
        document.getElementById('lightbox-imagen').src = imagen.src;
        document.getElementById('lightbox-titulo').textContent = imagen.titulo;
        document.getElementById('lightbox-descripcion').textContent = imagen.descripcion;
        
        // Actualizar miniaturas
        // actualizarMiniaturas(imagen.id);
        
        // Mostrar lightbox
        lightbox.classList.add('mostrar');
        document.body.style.overflow = 'hidden';
        
        // Configurar navegación
        configurarNavegacionLightbox(imagen.id);
    }
    
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e

    function configurarNavegacionLightbox(imagenIdActual) {
        const btnCerrar = document.getElementById('lightbox-cerrar');
        const btnPrev = document.getElementById('lightbox-prev');
        const btnNext = document.getElementById('lightbox-next');
<<<<<<< HEAD

        btnCerrar.onclick = cerrarLightbox;
        btnPrev.onclick = () => navegarImagen('anterior', imagenIdActual);
        btnNext.onclick = () => navegarImagen('siguiente', imagenIdActual);

=======
        
        if (btnCerrar) {
            btnCerrar.onclick = cerrarLightbox;
        }
        
        if (btnPrev) {
            btnPrev.onclick = () => navegarImagen('anterior', imagenIdActual);
        }
        
        if (btnNext) {
            btnNext.onclick = () => navegarImagen('siguiente', imagenIdActual);
        }
        
        // Eventos de teclado
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
        const tecladoHandler = (e) => {
            if (e.key === 'Escape') cerrarLightbox();
            if (e.key === 'ArrowLeft') navegarImagen('anterior', imagenIdActual);
            if (e.key === 'ArrowRight') navegarImagen('siguiente', imagenIdActual);
        };
<<<<<<< HEAD

        document.addEventListener('keydown', tecladoHandler);
        lightbox.onclick = (e) => { if (e.target === lightbox) cerrarLightbox(); };
        lightbox.dataset.tecladoHandler = tecladoHandler;
    }

    function navegarImagen(direccion, imagenIdActual) {
        const imagenes = configGaleria.imagenesFiltradas;
        const indiceActual = imagenes.findIndex(img => img.id === imagenIdActual);
        let nuevoIndice = direccion === 'siguiente' 
            ? (indiceActual + 1) % imagenes.length 
            : (indiceActual - 1 + imagenes.length) % imagenes.length;

        abrirLightbox(imagenes[nuevoIndice]);
    }

    function cerrarLightbox() {
        lightbox.classList.remove('mostrar');
        document.body.style.overflow = '';
=======
        
        document.addEventListener('keydown', tecladoHandler);
        
        // Cerrar haciendo clic fuera
        lightbox.onclick = (e) => {
            if (e.target === lightbox) cerrarLightbox();
        };
        
        // Guardar referencia para limpiar después
        lightbox.dataset.tecladoHandler = tecladoHandler;
    }
    
    function navegarImagen(direccion, imagenIdActual) {
        const imagenes = configGaleria.imagenesFiltradas;
        const indiceActual = imagenes.findIndex(img => img.id === imagenIdActual);
        
        let nuevoIndice;
        if (direccion === 'siguiente') {
            nuevoIndice = (indiceActual + 1) % imagenes.length;
        } else {
            nuevoIndice = (indiceActual - 1 + imagenes.length) % imagenes.length;
        }
        
        const nuevaImagen = imagenes[nuevoIndice];
        if (nuevaImagen) {
            abrirLightbox(nuevaImagen);
        }
    }
    
    function cerrarLightbox() {
        lightbox.classList.remove('mostrar');
        document.body.style.overflow = '';
        
        // Limpiar event listeners
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
        if (lightbox.dataset.tecladoHandler) {
            document.removeEventListener('keydown', lightbox.dataset.tecladoHandler);
            delete lightbox.dataset.tecladoHandler;
        }
<<<<<<< HEAD
    }

    function mostrarEstadoCarga() {
        galeriaGrid.innerHTML = Array(6).fill(`<div class="galeria-item cargando"><div class="skeleton" style="height:200px; background:#eee;"></div></div>`).join('');
    }

    function mostrarSinImagenes() {
        galeriaGrid.innerHTML = `<div class="error-galeria"><p>No se encontraron imágenes optimizadas.</p></div>`;
    }
=======
        
        const btnCerrar = document.getElementById('lightbox-cerrar');
        const btnPrev = document.getElementById('lightbox-prev');
        const btnNext = document.getElementById('lightbox-next');
        
        if (btnCerrar) btnCerrar.onclick = null;
        if (btnPrev) btnPrev.onclick = null;
        if (btnNext) btnNext.onclick = null;
        lightbox.onclick = null;
    }
        
    // ===== BOTÓN MEZCLAR =====
    
    function crearBotonMezclar() {
        const btnMezclar = document.createElement('button');
        btnMezclar.className = 'btn-mezclar';
        btnMezclar.innerHTML = '<i class="fas fa-random"></i> Mezclar Imágenes';
        btnMezclar.onclick = mezclarImagenes;
        
        // Insertar después de los filtros
        const filtrosContainer = document.querySelector('.filtros-galeria');
        if (filtrosContainer) {
            filtrosContainer.appendChild(btnMezclar);
        }
    }
    
    function mezclarImagenes() {
        // Mezclar las imágenes actuales
        configGaleria.imagenesFiltradas = mezclarArray([...configGaleria.imagenesFiltradas]);
        
        // Volver a renderizar
        galeriaGrid.innerHTML = '';
        renderizarImagenes(configGaleria.imagenesFiltradas);
        
        // Efecto visual
        const btnMezclar = document.querySelector('.btn-mezclar');
        btnMezclar.classList.add('animando');
        setTimeout(() => {
            btnMezclar.classList.remove('animando');
        }, 500);
    }
    
    // ===== INICIALIZACIÓN =====
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
}

// Agregar CSS adicional para la galería dinámica
function agregarEstilosGaleriaDinamica() {
    const estilos = `
        
    `;
<<<<<<< HEAD

=======
    
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
    const styleSheet = document.createElement('style');
    styleSheet.textContent = estilos;
    document.head.appendChild(styleSheet);
}

// Inicializar cuando el DOM esté listo
<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
=======
document.addEventListener('DOMContentLoaded', function() {
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
    agregarEstilosGaleriaDinamica();
    inicializarGaleriaDinamica();
});

// También puedes mezclar imágenes periódicamente
setInterval(() => {
    const btnMezclar = document.querySelector('.btn-mezclar');
    if (btnMezclar && Math.random() > 0.7) { // 30% de probabilidad
        btnMezclar.click();
    }
<<<<<<< HEAD
}, 30000); // Cada 30 segundos


// ===== SISTEMA DE GALERÍA DINÁMICA - VERSIÓN OPTIMIZADA WEBP =====
=======
}, 30000); // Cada 30 segundos
>>>>>>> bcaf3967527d6f5b9f523d53a61c5797f14e9d6e
