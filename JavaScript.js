// ==========================================
// JOGO DA MEMÓRIA
// ==========================================


// Emojis que serão usados no jogo

const emojis = [
    "🐱",
    "🐶",
    "🐰",
    "🦄",
    "🍓",
    "🧁",
    "🌸",
    "💖"
];


// Elementos da página

const board =
    document.getElementById("board");

const scoreElement =
    document.getElementById("score");

const attemptsElement =
    document.getElementById("attempts");

const timeElement =
    document.getElementById("time");

const restartButton =
    document.getElementById("restart");

const winScreen =
    document.getElementById("winScreen");

const playAgain =
    document.getElementById("playAgain");

const finalScore =
    document.getElementById("finalScore");

const finalAttempts =
    document.getElementById("finalAttempts");

const finalTime =
    document.getElementById("finalTime");


// ==========================================
// VARIÁVEIS
// ==========================================

let cards = [];

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let matches = 0;

let score = 0;

let attempts = 0;

let time = 60;

let timer = null;


// ==========================================
// INICIAR JOGO
// ==========================================

function startGame() {

    // Limpa o tabuleiro

    board.innerHTML = "";


    // Reseta os valores

    firstCard = null;

    secondCard = null;

    lockBoard = false;

    matches = 0;

    score = 0;

    attempts = 0;

    time = 60;


    // Atualiza a tela

    updateInfo();


    // Fecha a tela de vitória

    winScreen.classList.add("hidden");


    // Cria os pares

    cards = [
        ...emojis,
        ...emojis
    ];


    // Embaralha

    shuffle(cards);


    // Cria as cartas

    cards.forEach(
        emoji => {

            createCard(emoji);

        }
    );


    // Inicia o relógio

    startTimer();

}


// ==========================================
// CRIAR CARTA
// ==========================================

function createCard(emoji) {

    const card =
        document.createElement("button");


    card.className = "card";


    card.dataset.emoji =
        emoji;


    card.innerHTML = `

        <div class="card-back"></div>

        <div class="card-front">
            ${emoji}
        </div>

    `;


    card.addEventListener(
        "click",
        flipCard
    );


    board.appendChild(card);

}


// ==========================================
// VIRAR CARTA
// ==========================================

function flipCard() {

    // Não permite clicar duas vezes
    // na mesma carta

    if (
        lockBoard ||
        this === firstCard ||
        this.classList.contains("matched")
    ) {

        return;

    }


    // Vira a carta

    this.classList.add("flipped");


    // Primeira carta

    if (!firstCard) {

        firstCard = this;

        return;

    }


    // Segunda carta

    secondCard = this;


    // Aumenta tentativa

    attempts++;


    updateInfo();


    // Verifica o par

    checkMatch();

}


// ==========================================
// VERIFICAR PAR
// ==========================================

function checkMatch() {

    const isMatch =
        firstCard.dataset.emoji ===
        secondCard.dataset.emoji;


    if (isMatch) {

        matchCards();

    } else {

        unflipCards();

    }

}


// ==========================================
// PAR CORRETO
// ==========================================

function matchCards() {

    firstCard.classList.add(
        "matched"
    );

    secondCard.classList.add(
        "matched"
    );


    matches++;


    // Pontos

    score += 100;


    updateInfo();


    // Reseta seleção

    resetCards();


    // Verifica se ganhou

    if (
        matches === emojis.length
    ) {

        winGame();

    }

}


// ==========================================
// CARTAS ERRADAS
// ==========================================

function unflipCards() {

    lockBoard = true;


    setTimeout(
        () => {

            firstCard.classList.remove(
                "flipped"
            );

            secondCard.classList.remove(
                "flipped"
            );


            resetCards();

        },
        800
    );

}


// ==========================================
// RESETAR CARTAS
// ==========================================

function resetCards() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


// ==========================================
// EMBARALHAR
// ==========================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    clearInterval(timer);


    timer =
        setInterval(
            () => {

                time--;


                updateInfo();


                if (time <= 0) {

                    clearInterval(timer);

                    gameOver();

                }

            },
            1000
        );

}


// ==========================================
// FIM DO TEMPO
// ==========================================

function gameOver() {

    lockBoard = true;


    finalScore.textContent =
        score;

    finalAttempts.textContent =
        attempts;

    finalTime.textContent =
        "0";


    winScreen.classList.remove(
        "hidden"
    );


    winScreen.querySelector("h2")
        .textContent =
        "⏰ Tempo acabou!";


    winScreen.querySelector("p")
        .textContent =
        "Tente novamente para encontrar todos os pares! 💕";

}


// ==========================================
// VITÓRIA
// ==========================================

function winGame() {

    clearInterval(timer);


    // Bônus pelo tempo

    const timeBonus =
        time * 5;


    score +=
        timeBonus;


    updateInfo();


    finalScore.textContent =
        score;

    finalAttempts.textContent =
        attempts;

    finalTime.textContent =
        60 - time;


    winScreen.classList.remove(
        "hidden"
    );


    winScreen.querySelector("h2")
        .textContent =
        "🏆 Parabéns!";


    winScreen.querySelector("p")
        .textContent =
        "Você encontrou todos os pares! 💖";

}


// ==========================================
// ATUALIZAR INFORMAÇÕES
// ==========================================

function updateInfo() {

    scoreElement.textContent =
        score;


    attemptsElement.textContent =
        attempts;


    timeElement.textContent =
        time;

}


// ==========================================
// BOTÕES
// ==========================================

restartButton.addEventListener(
    "click",
    startGame
);


playAgain.addEventListener(
    "click",
    startGame
);


// ==========================================
// COMEÇAR AUTOMATICAMENTE
// ==========================================

startGame();