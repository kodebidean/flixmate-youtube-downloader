// Generar el addonId una vez y reutilizarlo
const addonId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

// Inicializa el cliente de Flixmate
const FlixmateClient = Flixmate.default;
FlixmateClient.setDebugLevel('debug');

const flixmate = new FlixmateClient({
    addonId: addonId, // UUID generado
    addonName: 'Audio/Video Downloader',
    addonVersion: '1.0.0',
});

// Verificar compatibilidad y conectar si es posible
if (flixmate.isSupported) {
    if (!flixmate.isConnected) {
        flixmate.connect();
    }
} else {
    document.getElementById('status').innerText = "El servicio Flixmate no es compatible con este sistema.";
    console.warn("El servicio Flixmate no es compatible con este sistema.");
}

// Evento de conexión
flixmate.onConnected(async () => {
    console.log("Flixmate conectado exitosamente.");
    document.getElementById('status').innerText = "Flixmate conectado.";

    // Función de descarga
    window.downloadMedia = async function () {
        const videoUrl = document.getElementById('video-url').value;
        const format = document.getElementById('format').value;
        const quality = document.getElementById('quality').value;

        if (!videoUrl) {
            document.getElementById('status').innerText = "Por favor, ingresa una URL de YouTube válida.";
            return;
        }

        try {
            // Llama al backend para obtener el enlace directo
            const response = await fetch(`http://localhost:3000/getDirectUrl?videoUrl=${encodeURIComponent(videoUrl)}&format=${format}`);
            const data = await response.json();

            if (data.error) {
                document.getElementById('status').innerText = "Error al obtener el enlace directo: " + data.error;
                return;
            }

            const directUrl = data.directUrl;

            // Parámetros de depuración
            console.log("Parámetros de descarga:", {
                quality: quality,
                videoUrl: format === 'mp4' ? directUrl : null,
                audioUrl: format === 'mp3' ? directUrl : null,
                format: format,
            });

            // Enviar la solicitud de descarga a Flixmate
            // Enviar la solicitud de descarga a Flixmate
            const download = await flixmate.downloads.add({
                quality: quality,
                videoUrl: format === 'mp4' ? directUrl : null,
                audioUrl: format === 'mp3' ? directUrl : null,
                format: format,
                title: `Media Download - ${new Date().getTime()}`, // Título único basado en la marca de tiempo
                avoidFilenameCollision: true // Evita colisiones de nombres de archivo
            });


            document.getElementById('status').innerText = "Descarga iniciada...";
        } catch (error) {
            document.getElementById('status').innerText = "Error al iniciar la descarga: " + error.message;
            console.error("Error al iniciar la descarga:", error);
        }
    };
});

// Monitoreo del progreso de descarga
flixmate.downloads.onChange((changes) => {
    const { items } = changes;
    Object.keys(items).forEach((downloadId) => {
        const downloadItem = items[downloadId];
        
        if (!downloadItem) {
            console.warn(`No se encontraron detalles para la descarga con ID: ${downloadId}`);
            return;
        }

        const { state, progress, errorMessage } = downloadItem;
        console.log(`Estado de la descarga (${downloadId}):`, { state, progress, errorMessage });

        if (state === 'downloading') {
            document.getElementById('status').innerText = `Descargando... ${progress}% completado`;
        } else if (state === 'completed') {
            document.getElementById('status').innerText = "Descarga completada. Archivo guardado.";
        } else if (state === 'error' && errorMessage) {
            document.getElementById('status').innerText = "Error en la descarga: " + errorMessage;
            console.error("Detalles del error en la descarga:", JSON.stringify(downloadItem, null, 2)); // Imprime todos los detalles
        }
    });
});



// Evento de desconexión
flixmate.onDisconnected(() => {
    document.getElementById('status').innerText = "Se ha perdido la conexión con Flixmate.";
    console.warn("Flixmate se ha desconectado inesperadamente.");
});

// Manejador de excepciones
flixmate.onExceptionCaught((error) => {
    document.getElementById('status').innerText = `Error: ${error.message}`;
    console.error("Excepción de Flixmate:", error.message, error.stack);
});
