let cards = document.querySelectorAll('.card');
let numberOfCardsDisplay = document.querySelector(".numero-posicoes");
let playButton = document.querySelector(".play-button");
let pauseButton = document.querySelector(".pause-button");
let restartButton = document.querySelector(".restart-button");
let display = document.querySelector('.display-time');
let displayName = document.querySelector(".nome-posicao-atual");
let displayInterval;
let originalSeconds;
let currentSeconds;
let currentName;
let numberOfCards = cards.length;

numberOfCardsDisplay.textContent = numberOfCards + " posições";

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

    if (displayName.textContent == "Nome") {
        changeButton();
        displayName.textContent = "Selecione um exercício!"
    } else {
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
    changeButton();
}

function changeButton() {
    playButton.style.display = (playButton.style.display === "block") ? "none" : "block";
    pauseButton.style.display = (pauseButton.style.display === "none") ? "block" : "none";
}

cards.forEach(card => {
    card.addEventListener('click', clickCard);
});

// Verifica se o navegador suporta a API de Bloqueio de Tela
if ('wakeLock' in navigator) {
    // Solicita o bloqueio de tela
    let wakeLock = null;

    async function requestWakeLock() {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Bloqueio de tela ativado com sucesso!');
        } catch (err) {
            console.error('Falha ao solicitar o bloqueio de tela:', err.message);
        }
    }

    // Chama a função para solicitar o bloqueio de tela quando necessário
    requestWakeLock();
}

playButton.addEventListener('click', function () { start(currentSeconds, currentName); });
pauseButton.addEventListener('click', pauseTime);
restartButton.addEventListener('click', restartTime);