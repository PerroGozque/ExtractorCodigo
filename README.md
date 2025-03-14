# CodeExtractor

**CodeExtractor** es una herramienta que permite extraer el contenido de los archivos de código de un proyecto, excluyendo archivos y directorios innecesarios. Este proyecto está desarrollado utilizando **Electron** para la interfaz de usuario y **Node.js** para la lógica de extracción, 
puede compilarse un EXE usando. npm run build
asegurarse de instalar todas las dependencias necesarias 
npm install --save-dev electron-builder



## Descripción

El objetivo de este proyecto es proporcionar una forma rápida y sencilla de extraer todo el código fuente de un proyecto, ignorando archivos como dependencias, imágenes y otros archivos que no sean relevantes para el código. Los archivos extraídos se guardan en un archivo de texto llamado `project_code.txt`.

## Características

- Excluye directorios y archivos no deseados como `node_modules`, `.git`, imágenes, y más.
- Interfaz gráfica simple desarrollada con **Electron**.
- Permite la visualización de los logs de extracción en tiempo real.
- Compatible con Windows, macOS y Linux.

## Estructura del Proyecto

```bash
├── src
│   ├── extractor.js        # Lógica de extracción de archivos
│   ├── index.html          # Interfaz de usuario (HTML)
│   ├── main.js             # Lógica de la ventana principal de Electron
│   ├── renderer.js         # Conexión entre la UI y la lógica de extracción
│   └── style.css           # Estilos CSS para la interfaz
├── package.json            # Dependencias y configuración del proyecto
└── README.md               # Documentación del proyecto
Requisitos
Node.js v12 o superior
Electron para la creación de la interfaz de usuario
npm o yarn para la gestión de dependencias
Instalación
Sigue los siguientes pasos para instalar y ejecutar el proyecto:

Clona este repositorio:

bash
Copiar
git clone <URL_DEL_REPOSITORIO>
Navega al directorio del proyecto:

bash
Copiar
cd CodeExtractor
Instala las dependencias:

bash
Copiar
npm install
Ejecuta la aplicación:

bash
Copiar
npm start
Esto abrirá la ventana de la aplicación donde podrás pegar la ruta de tu proyecto y empezar la extracción.

Uso
Pega la ruta del proyecto en el campo correspondiente.
Haz clic en el botón Iniciar para comenzar la extracción del código.
El progreso de la extracción se mostrará en el área de logs en tiempo real.
Una vez completada la extracción, el archivo project_code.txt se generará en la ruta especificada, conteniendo todo el código fuente del proyecto.
Excluidos
La herramienta excluye los siguientes archivos y directorios por defecto:

Archivos: README.md, package.json, package-lock.json, project_code.txt
Directorios: node_modules, .git
Extensiones: .env, .psd, .png, .jpg, .svg
Contribuciones
Las contribuciones son bienvenidas. Si deseas mejorar el proyecto o añadir nuevas funcionalidades, por favor abre un pull request o abre un issue.

Licencia
Este proyecto está bajo la MIT License. Consulta el archivo LICENSE para más detalles.