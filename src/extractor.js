const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Archivos y extensiones a excluir
const EXCLUDED_FILES = new Set([
    'node_modules', '.git', '.gitignore', 'README.md', 'package-lock.json', 'package.json', 'project_code.txt'
]);

const EXCLUDED_EXTENSIONS = new Set([
    '.env', '.psd', '.png', '.jpg', '.svg'
]);

async function readFileContent(filePath, projectPath, outputFile, logCallback) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const relativePath = path.relative(projectPath, filePath);
        const fileContent = `\n\n// Archivo: ${relativePath}\n\n${data}\n`;

        // Escribir en el archivo de salida
        await fs.promises.appendFile(outputFile, fileContent);
        logCallback(`Contenido de ${relativePath} agregado a ${outputFile}`);
    } catch (error) {
        console.error(`Error al leer o escribir el archivo: ${filePath}`, error);
    }
}

async function readDirectory(directoryPath, projectPath, outputFile, logCallback) {
    try {
        const files = await fs.promises.readdir(directoryPath);

        for (const file of files) {
            const fullPath = path.join(directoryPath, file);

            // Excluir directorios y archivos específicos
            const fileExtension = path.extname(file);
            if (EXCLUDED_FILES.has(file) || EXCLUDED_EXTENSIONS.has(fileExtension)) {
                continue;
            }

            const stats = await fs.promises.stat(fullPath);

            if (stats.isDirectory()) {
                await readDirectory(fullPath, projectPath, outputFile, logCallback);
            } else if (stats.isFile()) {
                await readFileContent(fullPath, projectPath, outputFile, logCallback);
            }
        }
    } catch (error) {
        console.error(`Error al leer el directorio: ${directoryPath}`, error);
    }
}

// Función para abrir el archivo o la carpeta después de la extracción
async function openFileOrDirectory(outputFile) {
    const command = process.platform === 'win32' 
        ? `start "" "${outputFile}"` // Para Windows
        : process.platform === 'darwin' 
        ? `open "${outputFile}"` // Para macOS
        : `xdg-open "${outputFile}"`; // Para Linux

    exec(command, (err) => {
        if (err) {
            console.error('Error al abrir la carpeta o archivo:', err);
        } else {
            console.log('Carpeta o archivo abierto exitosamente');
        }
    });
}

async function extractProjectCode(projectPath, outputFile = 'project_code.txt', logCallback) {
    try {
        // Limpiar el archivo de salida antes de comenzar
        await fs.promises.writeFile(outputFile, '');

        // Iniciar la extracción
        await readDirectory(projectPath, projectPath, outputFile, logCallback);
        logCallback('Extracción completada.');

        // Abrir el archivo o la carpeta después de la extracción
        await openFileOrDirectory(outputFile);
    } catch (error) {
        console.error('Error durante la extracción:', error);
    }
}

module.exports = { extractProjectCode };
