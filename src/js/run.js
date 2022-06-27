let apps;
fetch("src/apps/apps.json")
    .then(response => response.json())
    .then(json => apps = json);

let allSchemes = ["min", "max", "cross"];

function executeProgram(programName) {
    let app = apps[programName];
    let options = app.titleBarScheme ?? allSchemes;
    let win1 = new Window(app.name, "black", "white", app.icon, app.src, options);
    win1.createWindow();
}


//从iframe获取命令
window.addEventListener('message', e => {
    executeProgram(e.data)
});
