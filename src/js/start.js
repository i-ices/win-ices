// 用于开始和搜索
document.addEventListener("click", (e) => {
    if (e.target.offsetParent != document.querySelector(".start") && e.target != document.querySelector('#starticon')) {
        // ? 如果用户在菜单外单击，请关闭菜单
        document.querySelector(".start").classList.remove("show-start");
    }

    if (e.target.offsetParent != document.querySelector(".action-center")) {
        if (e.target != document.querySelector('#wifi') && e.target != document.querySelector("body > div.taskbar > div.right > div.action-center-button > img:nth-child(3)") && e.target != document.querySelector("body > div.taskbar > div.right > div.action-center-button > img:nth-child(4)")) {
            if (!document.getElementById('acCheck').checked) {
                document.querySelector("#acCheck").click();
            }
        }
    }
});

document.querySelector("#starticon").addEventListener('click', function (e) {
    e.preventDefault();
    setTimeout(function () {
        if (document.querySelector('.start').classList.contains('show-start')) {
            document.querySelector(".start").classList.remove("show-start");
        } else {
            document.querySelector(".start").classList.toggle("show-start");
        }
    }, 50);
})

// 用于日期时间
let dt = new Date().toLocaleString().split(" ");
document.querySelector(".time-date > span:nth-child(2)").innerText = dt[0];
document.querySelector(".time-date > span:nth-child(1)").innerText = dt[1];
setInterval(() => {
    document.querySelector(".time-date > span:nth-child(1)").innerText = new Date().toLocaleString().split(" ")[1];
}, 1e3)

// 控制中心点击
document.querySelectorAll('body > div.action-center > div.buttons > figure').forEach(item => item.addEventListener('click', function () {
    let dom = this.querySelectorAll('img');
    [...dom].forEach(item => {
        if (item.classList.contains('active-figure-div')) {
            item.classList.remove('active-figure-div');
        } else {
            item.classList.add('active-figure-div');
        }
    })
}))

// 电池节电图标
let bIcon1 = document.querySelector(".taskbar .right .action-center-button > img:nth-child(3)")
let bIcon2 = document.querySelector(".ac-bottom > div.battery > img");
document.querySelector(".action-center figure:nth-child(4) > img").onclick = () => {
    if (bIcon1.src.includes("Full")) {
        bIcon1.src = bIcon2.src = bIcon1.src.replace("Full", "Saver")
    } else bIcon1.src = bIcon2.src = bIcon1.src.replace("Saver", "Full")
}

// 对于行动中心
let bSlider = document.querySelector(".brightness input");
bSlider.oninput = () => {
    let x = bSlider.valueAsNumber;
    silderBackground(bSlider, x);
    x = x < 20 ? 80 : 100 - x;
    document.querySelector(".brightness-overlay").style.background = `rgb(0 0 0 / ${x}%)`
}
let vSlider = document.querySelector(".volume input");
vSlider.oninput = () => {
    silderBackground(vSlider, vSlider.value)
}

function silderBackground(elem, x) {
    elem.style.setProperty("--track-color", `linear-gradient(90deg, #005fba ${x}%, #888888 ${x}%)`)
}

document.getElementById('acCheck').onclick = _ => {
    if (document.getElementById('acCheck').checked) {
        document.querySelector(".action-center").style.setProperty("transform", "translateY(660px)");
    } else if (document.getElementById('acCheck').checked == false) {
        document.querySelector(".action-center").style.setProperty("transform", "translateY(0)");
    }
}

// 对于电池/**需要时可额外使用* */
(function () {
    let batteryLevel = document.querySelector("body > div.action-center > div.ac-bottom > div.battery > span");

    let success = function (battery) {
        if (battery) {
            function setStatus() {
                console.log("Set status");
                batteryLevel.innerHTML = Math.round(battery.level * 100) + "%";
            }

            // 设置初始状态
            setStatus();

            // 设置事件
            battery.addEventListener("levelchange", setStatus, false);
        } else {
            throw new Error('Battery API not supported on your device/computer');
        }
    };

    let noGood = function (error) {
        console.log(error.message)
    };

    navigator.getBattery() //returns a promise
        .then(success)
        .catch(noGood);
})();
