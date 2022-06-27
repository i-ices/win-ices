//获取Cookie
function getCookie(name) {
    const result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)");
    return result ? result.pop() : ""
}

//设置Cookie
function setCookie(name, value) {
    document.cookie = name + "=" + value + "; expires=" + new Date(2147483647 * 1000).toUTCString();
}

const firstBoot = getCookie("firstBoot") === "0" ? false : true;

// 访问所需元素
let powerOnBox = document.querySelector(".powerOnBox");
let powerOnBtn = document.getElementById("powerOnBtn");

// 出于开发目的关闭引导过程
function skipBoot() {
    powerOnBox.remove();
    document.querySelector(".desktop").style.display = "block";
    document.querySelector(".taskbar").style.display = "grid";
    document.querySelector(".start").style.display = "block";
    document.body.style.background = "#fff url(src/wallpaper/img18.webp) center center/cover no-repeat";
}

// skipBoot();
if (window.location.hash == "#dev") {
    skipBoot()
} else {
    powerOnBtn.addEventListener("click", _ => {
        setTimeout(_ => {
            fullScreen();
            boot();
        }, 1e3)
    })
}

function boot() {
    // 单击电源按钮后引导操作系统
    powerOnBox.remove();
    document.querySelector(".boot").style.display = "flex";
    // 陈列开机3秒钟，播放启动windows的视频
    setTimeout(() => {
        document.querySelector(".boot").remove();
        // 播放视频
        document.querySelector(".boot-animation").style.display = "flex";
        document.getElementById("startupAudio").play();

        // 播放视频后删除视频div
        document.getElementById("startupAudio").addEventListener("ended", event => {
            document.querySelector(".boot-animation").remove();
            passwordPhase();
        })

        // 现在显示桌面
        document.body.style.background = "url(src/wallpaper/img18.webp) center center/cover no-repeat";
        document.querySelector(".desktop").style.display = "block";
        document.querySelector(".taskbar").style.display = "grid";
        document.querySelector(".start").style.display = "block";
    }, 3000)
}

// 如果用户单击或按下键盘上的任何键，锁屏应消失，密码屏应出现
function passwordPhase() {
    if (firstBoot) {
        setTimeout(notify, 1e3, "src/icons/settings.svg", "设置", "欢迎使用win-ices", "恭喜您已成功启动win-ices")
        setTimeout(notify, 10e3, "src/icons/edge.svg", "Microsoft Edge", "所有新浏览器都在这里", "您的Edge浏览器已为win-ices更新\n请试用。")
        startTutorials();
        setCookie("firstBoot", "0");
    }
    if (getCookie("cookiesAccepted") == "") {
        notify("src/icons/settings.svg", "设置", "Windows 11使用Cookie", "为了改善用户体验，此Windows 11使用Cookie", "接受", `setCookie('cookiesAccepted','1');notificationClose('#n${nId}')`);
    }
}

// 用于全屏显示文档的函数
function fullScreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

{
    console.log('%c win-ices', 'background: #222; color: #bada55', 'https://ices.fun');
    console.log('%c \n            _             _               \n' +
        '           (_)           (_)              \n' +
        '  __      ___ _ __ ______ _  ___ ___  ___ \n' +
        '  \\ \\ /\\ / / | \'_ \\______| |/ __/ _ \\/ __|\n' +
        '   \\ V  V /| | | | |     | | (_|  __/\\__ \\\n' +
        '    \\_/\\_/ |_|_| |_|     |_|\\___\\___||___/\n' +
        '  \n', 'color: #ff00ff;font-weight: 900;')
}
