const load = function (url) {
    const t = url.split(".");
    let s;
    switch (t[t.length - 1]) {
        case "js":
            s = document.createElement("script");
            s.src = url;
            document.head.appendChild(s);
            break;
        case "css":
            s = document.createElement("link");
            s.rel = "stylesheet";
            s.type = "text/css";
            s.href = url;
            document.head.appendChild(s);
            break;

        default:
            break;
    }
};

const tutorialResources = [
    "src/js/lib/jquery.js",
    "src/js/lib/jquery.scrollTo.min.js",
    "src/js/lib/kinetic.js",
    "src/js/lib/enjoyhint.js",
    "src/css/lib/enjoyhint.css",
];

let resourceReady = false;

function startTutorials() {
    let i = 0;
    const interval = setInterval(() => {
        if (i < tutorialResources.length) {
            load(tutorialResources[i]);
            i++
        } else {
            notify("src/icons/settings.svg", "Settings", "win-ices教程", "帮助您使用win-ices的简单指南", "开始教程", `initialTutorial();notificationClose("#n${nId}")`);
            resourceReady = true
            clearInterval(interval);
        }
    }, 50);
}

/**
 * 教程
 */
function initialTutorial() {
    if (resourceReady) {
        const initialTutorial = new EnjoyHint({
            btnNextText: '下一步',
            btnSkipText: '跳过',
        });

        const initialSteps = [
            {
                "next #starticon": "这是打开“开始”菜单的“开始”按钮",
                "showSkip": false,
            },
            {
                "next .action-center-button": "这是为了打开行动中心",
                "showSkip": false,
            },
            {
                "next .desktop": "右键单击桌面上的上下文菜单",
                "showNext": false,
                "skipButton": {text: "完成"},
            },
        ];

        initialTutorial.set(initialSteps);
        initialTutorial.run()
    }
}

let acTNotCompleted = keyNotCompleted = firstBoot;

document.querySelector('.action-center-button').onclick = _ => {
    document.querySelector('#acCheck').click();

    function getOnEnd() {
        return function () {
            acTNotCompleted = false;
        };
    }

    if (resourceReady && acTNotCompleted) {
        const acTutorial = new EnjoyHint({
            onEnd: getOnEnd(),
            onSkip: getOnEnd(),
        });

        const acSteps = [
            {
                "next .action-center": "这是你的行动中心",
                "timeout": 500,
            },
            {
                "next .brightness": "您可以在此处调整亮度",
                "showNext": false,
                "skipButton": {text: "完成"},
            }
        ];
        acTutorial.set(acSteps);
        acTutorial.run();
    }
}