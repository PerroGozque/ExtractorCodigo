const { ipcRenderer } = require('electron');

document.getElementById('runButton').addEventListener('click', () => {
    const projectPath = document.getElementById('projectPathInput').value;
    if (projectPath) {
        ipcRenderer.invoke('extract-project-code', projectPath)
            .then(() => {
                alert('Extracción completada con éxito.');
            })
            .catch((error) => {
                alert(`Error: ${error}`);
            });
    } else {
        alert('Por favor ingrese una ruta válida.');
    }
});

ipcRenderer.on('log-message', (event, message) => {
    const logContent = document.querySelector('.logContent');
    const logItem = document.createElement('div');
    logItem.textContent = message;
    logContent.appendChild(logItem);
});
