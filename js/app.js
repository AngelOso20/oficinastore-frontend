/* ===========================
   APLICACION JAVASCRIPT
   OficinaStore - Frontend
   =========================== */

const CONFIG = {
    URL_API: 'http://localhost:3000',
    ENDPOINTS: {
        ARTICULOS: '/api/articulos',
        CATEGORIAS: '/api/categorias'
    }
};

let todosLosArticulos = [];
let categoriasDisponibles = [];

// Iconos SVG inline - no requieren conexion externa
const ICONOS_SVG = {
    'edit_note': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>',
    'menu_book': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>',
    'calculate': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-6h2v6zm0-8h-2V7h2v2zm-8 8H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2z"/></svg>',
    'folder': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',
    'content_cut': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z"/></svg>',
    'brush': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-2.41-2.04zM2 19.99l3.14 3.14 8.82-8.82L10.82 12 2 19.99z"/></svg>',
    'library_books': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>',
    'description': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',
    'post_add': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M22 13c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.55 0 1.09-.13 1.58-.39l.41 1.58c.05.15.08.31.08.47 0 .48-.39.87-.87.87H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1 0 .11-.02.22-.05.32l1.89 1.89c.38.38.89.59 1.42.59h2.64c.48 0 .87-.39.87-.87 0-.15-.03-.31-.08-.47l.41-1.58c.49.26 1.03.42 1.58.42 1.1 0 2-.9 2-2V13z"/></svg>',
    'push_pin': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>',
    'check_circle': '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
    'cancel': '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>',
    'inventory_2': '<svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v3.01c0 .27.11.52.29.71l3.71 3.7c.19.19.44.29.71.29h9.18c.53 0 1.04-.21 1.41-.59l.71-.71V4c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v9.18c-.39-.39-.88-.58-1.41-.58h-.18zM8 16h8v2H8v-2z"/></svg>'
};

const elementos = {
    contenedorArticulos: document.getElementById('contenedor-articulos'),
    indicadorCarga: document.getElementById('indicador-carga'),
    mensajeError: document.getElementById('mensaje-error'),
    textoError: document.getElementById('texto-error'),
    btnReintentar: document.getElementById('btn-reintentar'),
    btnActualizar: document.getElementById('btn-actualizar'),
    filtroCategoria: document.getElementById('filtro-categoria'),
    buscador: document.getElementById('buscador'),
    contadorArticulos: document.getElementById('contador-articulos'),
    estadoConexion: document.getElementById('estado-conexion'),
    mensajeConexion: document.getElementById('mensaje-conexion'),
    infoBackend: document.getElementById('info-backend')
};

function formatearPrecio(precio) {
    return `$${precio.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP`;
}

function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

function actualizarEstadoConexion(conectado, mensaje) {
    elementos.estadoConexion.className = `estado-conexion ${conectado ? 'conectado' : 'desconectado'}`;
    elementos.mensajeConexion.textContent = mensaje;
}

async function obtenerArticulos() {
    try {
        const respuesta = await fetch(`${CONFIG.URL_API}${CONFIG.ENDPOINTS.ARTICULOS}`);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        if (datos.exito) {
            return datos.datos;
        } else {
            throw new Error(datos.mensaje);
        }
    } catch (error) {
        console.error('Error al obtener articulos:', error);
        throw error;
    }
}

async function obtenerCategorias() {
    try {
        const respuesta = await fetch(`${CONFIG.URL_API}${CONFIG.ENDPOINTS.CATEGORIAS}`);
        const datos = await respuesta.json();
        if (datos.exito) {
            return datos.datos;
        }
        return [];
    } catch (error) {
        console.error('Error al obtener categorias:', error);
        return [];
    }
}

function crearTarjetaArticulo(articulo) {
    const stockClase = articulo.stock > 0 ? 'disponible' : 'agotado';
    const stockTexto = articulo.stock > 0 ? `Stock: ${articulo.stock} unidades` : 'Agotado';
    const stockIcono = articulo.stock > 0 ? 'check_circle' : 'cancel';
    const iconoSvg = ICONOS_SVG[articulo.icono] || ICONOS_SVG['inventory_2'];

    return `
        <article class="tarjeta-articulo">
            <div class="contenedor-icono">
                ${iconoSvg}
            </div>
            <div class="informacion-articulo">
                <span class="categoria-badge">${escaparHTML(articulo.categoria)}</span>
                <h3 class="nombre-articulo">${escaparHTML(articulo.nombre)}</h3>
                <p class="descripcion-articulo">${escaparHTML(articulo.descripcion)}</p>
                <div class="footer-tarjeta">
                    <span class="precio">${formatearPrecio(articulo.precio)}</span>
                    <span class="stock ${stockClase}">
                        ${ICONOS_SVG[stockIcono]}
                        ${stockTexto}
                    </span>
                </div>
            </div>
        </article>
    `;
}

function renderizarArticulos(articulos) {
    elementos.indicadorCarga.classList.remove('mostrar');
    elementos.mensajeError.classList.remove('mostrar');

    if (articulos.length === 0) {
        elementos.contenedorArticulos.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: #718096;">
                    No se encontraron articulos
                </p>
            </div>
        `;
        elementos.contadorArticulos.textContent = '0 articulos encontrados';
        return;
    }

    elementos.contenedorArticulos.innerHTML = articulos
        .map(articulo => crearTarjetaArticulo(articulo))
        .join('');

    elementos.contadorArticulos.textContent =
        `${articulos.length} articulo${articulos.length !== 1 ? 's' : ''} encontrado${articulos.length !== 1 ? 's' : ''}`;
}

function llenarSelectorCategorias(categorias) {
    elementos.filtroCategoria.innerHTML = `
        <option value="">Todas las categorias</option>
        ${categorias.map(cat =>
            `<option value="${escaparHTML(cat)}">${escaparHTML(cat)}</option>`
        ).join('')}
    `;
}

function aplicarFiltros() {
    const categoriaSeleccionada = elementos.filtroCategoria.value;
    const textoBusqueda = elementos.buscador.value.toLowerCase().trim();

    let articulosFiltrados = [...todosLosArticulos];

    if (categoriaSeleccionada) {
        articulosFiltrados = articulosFiltrados.filter(
            articulo => articulo.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
        );
    }

    if (textoBusqueda) {
        articulosFiltrados = articulosFiltrados.filter(articulo =>
            articulo.nombre.toLowerCase().includes(textoBusqueda) ||
            articulo.descripcion.toLowerCase().includes(textoBusqueda)
        );
    }

    renderizarArticulos(articulosFiltrados);
}

async function cargarDatos() {
    elementos.indicadorCarga.classList.add('mostrar');
    elementos.mensajeError.classList.remove('mostrar');
    elementos.contenedorArticulos.innerHTML = '';

    try {
        const [articulos, categorias] = await Promise.all([
            obtenerArticulos(),
            obtenerCategorias()
        ]);

        todosLosArticulos = articulos;
        categoriasDisponibles = categorias;

        llenarSelectorCategorias(categorias);
        renderizarArticulos(articulos);
        actualizarEstadoConexion(true, 'Conectado al servidor backend');

    } catch (error) {
        elementos.indicadorCarga.classList.remove('mostrar');
        elementos.mensajeError.classList.add('mostrar');
        elementos.textoError.textContent =
            `No se pudo conectar al servidor: ${error.message}`;
        actualizarEstadoConexion(false, 'Error de conexion con el servidor');
        elementos.contenedorArticulos.innerHTML = '';
    }
}

elementos.btnActualizar.addEventListener('click', cargarDatos);
elementos.btnReintentar.addEventListener('click', cargarDatos);
elementos.filtroCategoria.addEventListener('change', aplicarFiltros);

let timerDebounce;
elementos.buscador.addEventListener('input', () => {
    clearTimeout(timerDebounce);
    timerDebounce = setTimeout(aplicarFiltros, 300);
});

document.addEventListener('DOMContentLoaded', () => {
    elementos.infoBackend.textContent = CONFIG.URL_API;
    cargarDatos();
});
