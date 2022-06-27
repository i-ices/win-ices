//window类
class Window {
    constructor(title, titleColor = "#000", titleBgColor = "#fff", icon, body, btns = ['min', 'max', 'cross']) {
        this.title = title;
        this.titleColor;
        this.titleBgColor = titleBgColor;
        this.icon = icon;
        this.btns = btns;
        this.body = body;
    }

    createWindow() {
        // 创建主窗口
        let window = document.createElement("div");
        window.classList.add("window");
        // 创建窗口标题栏
        let windowTitleBar = document.createElement("div");
        windowTitleBar.classList.add("windowTitleBar");
        // 创建窗口图标
        let windowIcon = document.createElement("img");
        windowIcon.src = this.icon;
        windowIcon.alt = this.title + "window";
        windowIcon.classList.add("smallTitleIcon");
        // 在窗口标题栏上附加窗口图标
        windowTitleBar.appendChild(windowIcon);
        // 创建窗口标题名称
        let windowName = document.createElement("span");
        windowName.innerText = this.title;
        windowName.classList.add("windowTitle");
        // 在窗口标题栏中添加窗口名称
        windowTitleBar.appendChild(windowName);
        // 创建窗口选项，即最小、最大、交叉
        // 创建optionsWrapper
        let optionsWrapper = document.createElement("div");
        optionsWrapper.classList.add("optionsWrapper");
        // 最小化
        if (this.btns.includes("min")) {
            let minimizer = document.createElement("img");
            minimizer.src = "src/icons/minimize.svg";
            minimizer.alt = "minimize" + this.title;
            minimizer.classList.add("windowOptions", "windowMinimizer");
            optionsWrapper.appendChild(minimizer);
            this.makeMinimizerAlive(minimizer);

        }
        // 最大化
        if (this.btns.includes("max")) {
            let maximizer = document.createElement("img");
            maximizer.src = "src/icons/maximize.svg";
            maximizer.alt = "maximize" + this.title;
            maximizer.classList.add("windowOptions", "windowMaximizer");
            optionsWrapper.appendChild(maximizer);
            this.makeMaximizerAlive(maximizer);

        }

        // crosser
        if (this.btns.includes("cross")) {
            let cross = document.createElement("img");
            cross.src = "src/icons/cross.svg";
            cross.alt = "Close" + this.title;
            cross.classList.add("windowOptions", "windowCrosser");
            optionsWrapper.appendChild(cross);
            this.makeCrosserAlive(cross);
        }

        window.appendChild(windowTitleBar);
        // 在窗口标题栏中附加选项包装器
        windowTitleBar.appendChild(optionsWrapper)
        //  创建窗主体
        let windowBody = document.createElement("div");
        windowBody.classList.add("windowBody");
        let iframe = document.createElement("iframe");
        iframe.src = this.body;
        let frame = iframe;

        // 调整iframe height onload事件
        frame.onload = function () {// 加载iframe时执行函数
            //将iframe的高度设置为
            //iframe内容的高度
            console.log(frame.contentWindow.document.querySelector(".container"));
            // frame.style.height = frame.contentWindow.document.querySelector(".container").getBoundingClientRect().height + "px";

            //将iframe的宽度设置为
            //iframe内容的宽度
            console.log(frame.contentWindow.document.querySelector(".container").getBoundingClientRect());
            // frame.style.width = frame.contentWindow.document.querySelector(".container").getBoundingClientRect().width + "px";
            // 在iframe内单击ok按钮隐藏窗口
            if (frame.contentWindow.document.title == "winver") {
                frame.contentWindow.document.querySelector(".ok").addEventListener("click", event => {
                    document.body.removeChild(window);
                    Taskbar.removeItem(window);
                })
            }

        }
        windowBody.appendChild(iframe);
        window.appendChild(windowBody);
        document.body.appendChild(window);
        // 将新打开的窗口放置在中心
        window.style.left = "20%"; //其他应用程序也同样精确
        window.style.top = "10%";

        // 最后创建窗口
        this.makeDraggable(window);
        Taskbar.addItem(this.title, this.icon, window);

    }

    // 使窗口可拖动
    makeDraggable(item) {
        let el = item;
        console.log(el);
        el.querySelector(".windowTitleBar").addEventListener("mousedown", mousedown)

        function mousedown(e) {
            window.addEventListener("mousemove", mousemove);
            window.addEventListener("mouseup", mouseup)
            let prevX = e.clientX;
            let prevY = e.clientY;

            function mousemove(e) {
                let newX = prevX - e.clientX;
                let newY = prevY - e.clientY;
                const rect = el.getBoundingClientRect();

                const normalization = (x, y, elem, container) => {
                    if (x <= 0) x = 0;
                    if (x >= container.offsetWidth - elem.offsetWidth / 2) x = container.offsetWidth - elem.offsetWidth / 2;
                    if (y <= 0) y = 0;
                    if (y >= container.offsetHeight - elem.offsetHeight / 2) y = container.offsetHeight - elem.offsetHeight / 2;
                    return {x, y};
                };

                var normalized = normalization(rect.left - newX, rect.top - newY, el, desktop)
                el.style.left = `${normalized.x}px`;
                el.style.top = `${normalized.y}px`;
                prevX = e.clientX;
                prevY = e.clientY;
            }

            function mouseup(e) {
                window.removeEventListener("mousemove", mousemove);
                window.removeEventListener("mouseup", mouseup)
            }
        }
    }

    makeCrosserAlive(windowCrosser) {
        windowCrosser.addEventListener("click", event => {
            let windows = event.target.parentNode.parentNode.parentNode;
            if (windows.classList.contains("window")) {
                // windows.style.display = "none";
                document.body.removeChild(windows);
                // this.removeWindowFromTaskBar(windows);
                Taskbar.removeItem(windows);
                return;
            } else {
                console.log("use class 'windows' in your window and it will be closed");
            }
        })
    }

    makeMaximizerAlive(maximizer) {
        maximizer.addEventListener("click", event => {
            let windows = event.target.parentNode.parentNode.parentNode;
            // let initialDimensions =
            if (windows.classList.contains("window")) {
                let dimensions = document.querySelector(".desktop").getBoundingClientRect();
                console.log(dimensions)
                windows.style.top = dimensions.y;
                windows.style.left = dimensions.x;
                windows.style.width = dimensions.width + "px";
                windows.style.height = dimensions.height + "px";

            } else {
                console.log("use class 'windows' in your window and it will be closed");
            }
        })
    }

    makeMinimizerAlive(minimizer) {
        minimizer.addEventListener("click", event => {
            let windows = event.target.parentNode.parentNode.parentNode;
            setTimeout(() => {
                windows.classList.add("minimized");
            }, 200)
        })

    }
}