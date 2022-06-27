// 对于上下文菜单
let normalizePosition = (mouseX, mouseY, parent, children) => {
    // ? 计算鼠标相对于容器元素的位置（范围）
    let {
        left: scopeOffsetX,
        top: scopeOffsetY,
    } = parent.getBoundingClientRect();

    scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
    scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

    const scopeX = mouseX - scopeOffsetX;
    const scopeY = mouseY - scopeOffsetY;

    // ? 检查元素是否超出边界
    const outOfBoundsOnX =
        scopeX + children.clientWidth * .75 > parent.clientWidth;

    const outOfBoundsOnY =
        scopeY + children.clientHeight * .75 > parent.clientHeight;

    let normalizedX = mouseX;
    let normalizedY = mouseY;

    // ? normalize on X
    if (outOfBoundsOnX) {
        normalizedX =
            scopeOffsetX + parent.clientWidth - children.clientWidth * .75;
    }

    // ? normalize on Y
    if (outOfBoundsOnY) {
        normalizedY =
            scopeOffsetY + parent.clientHeight - children.clientHeight * .75;
    }

    return { normalizedX, normalizedY };
};
const desktop = document.querySelector(".desktop");
const menu = document.getElementById("context-menu");
desktop.addEventListener("contextmenu", (event) => {
    document.body.click();

    const {clientX: mouseX, clientY: mouseY} = event;

    const {normalizedX, normalizedY} = normalizePosition(mouseX, mouseY, desktop, menu);

    menu.classList.remove("visible");

    menu.style.top = `${normalizedY}px`;
    menu.style.left = `${normalizedX}px`;

    setTimeout(() => {
        menu.classList.add("visible");
    });
});

document.body.addEventListener("click", (e) => {
    // ? 如果用户在菜单外单击，请关闭菜单
    menu.classList.remove("visible");
});
window.oncontextmenu = (e) => {
    e.preventDefault();
}

// 用于更换壁纸
let wi = 0;
const wIds = [18, 28, 29, 30, 31, 32, 33, 34, 35]; //这些墙纸适合浅色主题
function changeWallpaper() {
    wi >= 8 ? wi = 0 : wi++;
    document.body.style.backgroundImage = `url(src/wallpaper/img${wIds[wi]}.webp)`;
}
setInterval(() => {
    changeWallpaper();
}, 30e3);

const PreImg = document.querySelector(".imagesToBePreloaded");
for (let i = 0; i < wIds.length; i++) {
    PreImg.innerHTML += `<img src="src/wallpaper/img${wIds[i]}.webp" width="1" height="1" border="0">\n`
}

// 修复问题#35
window.onscroll = _ => {
    scrollTo(0,0)
}
