let taskBarCenterBox = document.querySelector(".center");
let allTaskBarIcons = taskBarCenterBox.children;

let Taskbar = {
    centerBox: document.querySelector(".center"),
    get allIcons() {
        return this.centerBox.children;
    },
    addItem(clAss, icon, window) {
        console.log(clAss);
        // 使用class class查找dom中有多少元素
        let iconCount = document.getElementsByClassName(clAss).length + 1;
        let idName = clAss + iconCount;
        let item = document.createElement("img");
        item.id = idName;
        window.dataset.id = idName; // 执行此操作可从任务栏获取相应的最小化窗口。。
        item.src = icon.includes("edge") ? "" : icon;
        // item.classList.add(clAss); // 对此进行注释以处理无法创建标题中有空格的窗口的错误
        this.centerBox.appendChild(item);
        this.openedIcons.push(item);
        this.maximize(item);
        this.openedWindows.push(window);
    },
    removeItem(windowToRemove) {
        console.log(windowToRemove);
        let taskBarIconId = windowToRemove.dataset.id;
        let taskBarIconToRemove = document.getElementById(taskBarIconId);
        console.log(taskBarIconToRemove);
        this.centerBox.removeChild(taskBarIconToRemove);
    },
    // 显示隐藏窗口的方法

    maximize(item) {
        item.addEventListener("click", event => {
            let targetId = event.target.id;
            // 现在获取具有相应数据集值的窗口
            let windows = document.getElementsByClassName("window");
            Array.from(windows).some(item => {
                if (item.dataset.id == targetId) {
                    item.classList.remove("minimized");
                    return true;
                } else {
                    return false;
                }
            })
        })
    },
    pinnedTaskBarIcons: null,
    openedIcons: [],
    openedWindows: []
}

//将事件侦听器添加到任务栏图标
//不要添加事件侦听器，而是使用executeProgram（）来执行此操作