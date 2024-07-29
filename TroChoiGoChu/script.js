const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const toggleMusicBtn = document.getElementById('toggleMusicBtn');
const themeSelect = document.getElementById('theme');
const timerSelect = document.getElementById('timer');
const languageSelect = document.getElementById('language');
const wordsElem = document.getElementById('words');
const inputBox = document.getElementById('inputBox');
const timeElem = document.getElementById('time');
const wpmElem = document.getElementById('wpm');
const scoreElem = document.getElementById('score');
const backgroundMusic = document.getElementById('backgroundMusic');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const timeUpSound = document.getElementById('timeUpSound');

const words = {
    english: [
        "the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog",
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
        "to", "be", "or", "not", "to", "be", "that", "is", "the", "question",
        "all", "that", "glitters", "is", "not", "gold",
        "a", "journey", "of", "a", "thousand", "miles", "begins", "with", "a", "single", "step"
    ],
    vietnamese: [
        "chào", "bạn", "thế", "nào", "hôm", "nay", "tôi", "yêu", "bạn", "như", "thế", "nào",
        "sáng", "tạo", "học", "hành", "và", "cải", "tiến", "là", "những", "giá", "trị", "quan", "trọng",
        "trời", "xanh", "và", "hoa", "cúc", "vàng", "làm", "cho", "cuộc", "sống", "rực", "rỡ"
    ]
};

let currentWords = [];
let currentIndex = 0;
let time = 0;
let score = 0;
let interval;
let isMusicPlaying = true;

window.addEventListener('load', () => {
    backgroundMusic.play();
    languageSelect.addEventListener('change', () => {
        resetGame();
    });
});

function startGame() {
    resetGame();
    const selectedLanguage = languageSelect.value;
    currentWords = shuffleArray(words[selectedLanguage]);
    displayWords();
    time = parseInt(timerSelect.value);
    inputBox.disabled = false;
    inputBox.focus();
    interval = setInterval(updateTime, 1000);
    notifyUser("");
}

function updateTime() {
    time--;
    timeElem.textContent = time;
    if (time === 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(interval);
    inputBox.disabled = true;
    timeUpSound.play();
    notifyUser("Time's up! Game Over.");
    calculateWPM();
}

function resetGame() {
    inputBox.value = "";
    score = 0;
    scoreElem.textContent = score;
    timeElem.textContent = 0;
    wpmElem.textContent = 0;
    currentIndex = 0;
    displayWords();
    notifyUser("");
}

function calculateWPM() {
    const wordsTyped = currentIndex;
    const wpm = Math.round((wordsTyped / parseInt(timerSelect.value)) * 60);
    wpmElem.textContent = wpm;
}

function displayWords() {
    wordsElem.innerHTML = currentWords.map((word, index) => {
        return `<span id="word-${index}" class="word">${word}</span>`;
    }).join(" ");
    highlightCurrentWord();
}

function highlightCurrentWord() {
    document.querySelectorAll('.word').forEach((wordElem, index) => {
        wordElem.classList.remove('current-word');
        if (index === currentIndex) {
            wordElem.classList.add('current-word');
        }
    });
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

inputBox.addEventListener('input', () => {
    const typedText = inputBox.value.trim();
    const currentWord = currentWords[currentIndex];
    if (typedText === currentWord) {
        document.getElementById(`word-${currentIndex}`).classList.add('correct');
        currentIndex++;
        inputBox.value = "";
        score++;
        correctSound.play();
    } else if (!currentWord.startsWith(typedText)) {
        score--;
        wrongSound.play();
    }
    scoreElem.textContent = score;
    highlightCurrentWord();
    if (currentIndex === currentWords.length) {
        endGame();
    }
});

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

toggleMusicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        toggleMusicBtn.textContent = "Play Music";
    } else {
        backgroundMusic.play();
        backgroundMusic.volume = 0.5;
        toggleMusicBtn.textContent = "Mute Music";
    }
    isMusicPlaying = !isMusicPlaying;
});

themeSelect.addEventListener('change', (e) => {
    document.body.className = e.target.value;
});

function notifyUser(message) {
    if (message) {
        alert(message); // This will show a browser alert
    }
}
