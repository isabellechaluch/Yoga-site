let playButton = document.querySelector(".play-button");
let pauseButton = document.querySelector(".pause-button");
let restartButton = document.querySelector(".restart-button");
let display = document.querySelector('.display-time');
let displayName = document.querySelector(".nome-posicao-atual");
let displayInterval;
let originalSeconds;
let currentSeconds;
let currentName;

function clickCard() {
    let nomePosicao = this.querySelector('h2').textContent;
    let secondsPosicao = this.querySelector("p").textContent;
    let seconds = parseInt(secondsPosicao, 10);

    originalSeconds = seconds;
    currentSeconds = seconds;
    currentName = nomePosicao;

    start(currentSeconds, currentName);
}

function start(sec, name) {
    clearInterval(displayInterval); // Certifique-se de limpar qualquer intervalo existente
    changeButton();

    let startAudio = document.getElementById("start-audio");
    startAudio.play();

    displayInterval = setInterval(function () {
        sec--; // Reduz o tempo total segundo a segundo
        currentSeconds = sec;
        if (sec <= 0) {
            let alarmAudio = document.getElementById("alarm-audio");
            alarmAudio.play(); // Reproduz o áudio
            clearInterval(displayInterval);
            changeButton();
        }
        display.textContent = sec;
        displayName.textContent = name;
    }, 1000);
}

function pauseTime() {
    clearInterval(displayInterval);
    changeButton();
}

function restartTime() {
    clearInterval(displayInterval);
    currentSeconds = originalSeconds;
    display.textContent = currentSeconds;
    start(currentSeconds, currentName);
}

function changeButton() {
    playButton.style.display = (playButton.style.display === "block") ? "none" : "block";
    pauseButton.style.display = (pauseButton.style.display === "none") ? "block" : "none";
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', clickCard);
});
playButton.addEventListener('click', function () { start(currentSeconds, currentName); });
pauseButton.addEventListener('click', pauseTime);
restartButton.addEventListener('click', restartTime);