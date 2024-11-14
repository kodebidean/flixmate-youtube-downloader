---

# YouTube Audio/Video Downloader

Este proyecto es una herramienta de backend y frontend que permite descargar el audio o video de YouTube utilizando la API de Flixmate y `ytdl-core`. Actualmente, el proyecto está en desarrollo, y se enfrenta a un problema con la descarga, marcado como un "Unspecified error".

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Uso](#uso)
- [Problemas Conocidos](#problemas-conocidos)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción del Proyecto

La intención de este proyecto es permitir a los usuarios ingresar una URL de YouTube y seleccionar opciones de formato y calidad para descargar el archivo como audio (mp3) o video (mp4). La aplicación está diseñada con una arquitectura de cliente-servidor, utilizando Flixmate como API para gestionar las descargas en el frontend y `ytdl-core` en el backend para obtener enlaces directos de los videos de YouTube.

## Tecnologías Utilizadas

- **Node.js**: Plataforma de ejecución para el backend.
- **Express.js**: Framework para crear el servidor backend.
- **Flixmate API**: Herramienta de descarga utilizada en el frontend.
- **ytdl-core**: Librería de Node.js para obtener enlaces de YouTube.
- **HTML/CSS/JavaScript**: Estructura básica para el frontend.

## Estructura del Proyecto

```plaintext
YouTube-Downloader/
├── backend/                  # Código del servidor backend
│   ├── server.js             # Servidor principal
│   ├── package.json          # Dependencias y scripts
│   └── .env                  # Variables de entorno (no incluído en el repo)
├── frontend/                 # Código del frontend
│   ├── index.html            # Interfaz de usuario
│   ├── app.js                # Lógica principal del frontend
│   └── flixmate-1.1.0.min.js # Archivo de Flixmate para manejar descargas
├── README.md                 # Descripción del proyecto
└── .gitignore                # Archivos a ignorar en el repositorio
```

## Instalación y Configuración

### Requisitos Previos

- Node.js y npm instalados.
- Cuenta y acceso a Flixmate.

### Pasos de Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/YouTube-Downloader.git
   cd YouTube-Downloader
   ```

2. **Instala las dependencias del backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Configura las variables de entorno**:
   Crea un archivo `.env` en la carpeta `backend` (si en el futuro necesitas claves de API adicionales o configuraciones sensibles).

4. **Ejecuta el servidor**:
   ```bash
   node server.js
   ```

5. **Accede al frontend**:
   Abre el archivo `frontend/index.html` en tu navegador para acceder a la interfaz de usuario.

## Uso

1. **Ingresa la URL de YouTube** en el campo de texto.
2. **Selecciona el formato** (mp3 o mp4).
3. **Elige la calidad** (opciones como 128kbps, 256kbps para mp3 y 720p para mp4).
4. **Haz clic en "Descargar"** para iniciar el proceso.

> Nota: La aplicación actualmente está en desarrollo y puede no funcionar completamente debido a problemas técnicos con la API de Flixmate.

## Problemas Conocidos

### Unspecified Error en la Descarga

Al iniciar la descarga, se genera un error de "Unspecified error" que no permite completar la descarga correctamente. A continuación se detallan algunas posibles causas y el trabajo en progreso para solucionarlo:

- **Configuración del `addonId`**: Se utiliza un `addonId` generado dinámicamente. Se investigan posibles problemas de compatibilidad o configuración adicional en Flixmate.
- **Parámetros de Calidad y Formato**: Aunque se están pasando valores válidos para `quality` y `format`, el error persiste. Se están probando configuraciones específicas y URLs alternativas.
- **Integración con Flixmate**: Puede haber limitaciones o requisitos no documentados en la API de Flixmate que están afectando el funcionamiento.

Estamos investigando estas causas y trabajando en soluciones.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, sigue estos pasos:

1. Realiza un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

---