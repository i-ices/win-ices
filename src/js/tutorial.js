const load = function (url) {
    const t = url.split(".");
    switch (t[t.length - 1]) {
        case "js":
            let s = document.createElement("script");
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
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/kineticjs/5.2.0/kinetic.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/enjoyhint/4.0.1/enjoyhint.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/enjoyhint/4.0.1/enjoyhint.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.3/jquery.scrollTo.min.js"
];

    i = 0, resourceReady = false;

function startTutorials() {
    const interval = setInterval(() => {
        if (i < tutorialResources.length) {
            load(tutorialResources[i]);
            i++
        } else {
            notify("src/icons/settings.svg", "Settings", "Windows 11 Tutorial", "A simple Guide to help you to use Windows 11", "Start Tutorial", `initialTutorial();notificationClose("#n${nId}")`)
            resourceReady = true
            clearInterval(interval);
        }
    }, 2e3);
}

function initialTutorial() {
    if (resourceReady) {
        const initialTutorial = new EnjoyHint({});

        const initialSteps = [
            {
                "next #starticon": "This is start button to open Start Menu",
                "showSkip": false
            },
            {
                "next .action-center-button": "This is to open Action Center",
                "showSkip": false
            },
            {
                "next .desktop": "Right click on desktop for Context Menu",
                "showSkip": false
            },
            {
                "next #keyboardOpener": "Click this to access keyboard. Helpful to simulate holding \"Win\" key",
                "showNext": false,
                "skipButton": {text: "Finish"}
            }
        ];

        initialTutorial.set(initialSteps);
        initialTutorial.run()
    }
}

let acTNotCompleted = keyNotCompleted = true;

document.querySelector('.action-center-button').onclick = _ => {
    acCheck.click();
    if (resourceReady && acTNotCompleted) {
        const acTutorial = new EnjoyHint({});

        const acSteps = [
            {
                "next .action-center": "This is your ActionCenter",
                "timeout": 500
            },
            {
                "next .brightness": "you can adjust brightness here",
                "showNext": false,
                "skipButton": {text: "Finish"}
            }
        ];

        acTutorial.set(acSteps);
        acTutorial.run();

        acTNotCompleted = false;
    }
}