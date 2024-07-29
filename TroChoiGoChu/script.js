const wordsEnglish = ["apple", "banana", "cherry", "date", "time"];
const wordsVietnamese = ["táo", "chuối", "cam", "chả lụa", "cơm cháy"];
let currentWords = wordsEnglish;
let currentWord = '';
let score = 0;
let correctWords = 0;
let timeLimit = 30;
let timer;
let theme = 'neon';
let startTime;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('reset-btn').addEventListener('click', resetGame);
document.getElementById('input').addEventListener('input', checkInput);
document.getElementById('theme').addEventListener('change', changeTheme);
document.getElementById('language').addEventListener('change', changeLanguage);
document.getElementById('time').addEventListener('change', changeTime);

function startGame() {
    score = 0;
    correctWords = 0;
    startTime = new Date();
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('wpm').textContent = `WPM: 0`;
    document.getElementById('timer').textContent = `Time: ${timeLimit}s`;
    document.getElementById('input').value = '';
    startTimer();
    nextWord();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    correctWords = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('wpm').textContent = `WPM: 0`;
    document.getElementById('word').textContent = 'Start';
    document.getElementById('input').value = '';
    document.getElementById('timer').textContent = `Time: ${timeLimit}s`;
}

function startTimer() {
    let time = timeLimit;
    timer = setInterval(() => {
        if (time > 0) {
            time--;
            document.getElementById('timer').textContent = `Time: ${time}s`;
            updateWPM();
        } else {
            clearInterval(timer);
            alert(`Time's up! Your score is ${score}`);
            playTimeUpSound();
        }
    }, 1000);
}

function nextWord() {
    const randomIndex = Math.floor(Math.random() * currentWords.length);
    currentWord = currentWords[randomIndex];
    document.getElementById('word').textContent = currentWord;
}

function checkInput() {
    const input = document.getElementById('input').value;
    if (input === currentWord) {
        score++;
        correctWords++;
        document.getElementById('score').textContent = `Score: ${score}`;
        nextWord();
        document.getElementById('input').value = '';
        playSound('correct');
    } else if (input.length >= currentWord.length) {
        score--;
        document.getElementById('score').textContent = `Score: ${score}`;
        document.getElementById('input').value = '';
        playSound('wrong');
    }
    updateWPM();
}

function changeTheme() {
    theme = document.getElementById('theme').value;
    document.body.className = theme;
}

function changeLanguage() {
    const language = document.getElementById('language').value;
    currentWords = language === 'english' ? wordsEnglish : wordsVietnamese;
}

function changeTime() {
    timeLimit = parseInt(document.getElementById('time').value, 10);
    document.getElementById('timer').textContent = `Time: ${timeLimit}s`;
}

function playSound(type) {
    const audio = new Audio(`./assets/audio/${type}.mp3`);
    audio.play();
}

function playTimeUpSound() {
    const audio = new Audio('timeup.mp3');
    audio.play();
}

function updateWPM() {
    const currentTime = new Date();
    const timeElapsed = (currentTime - startTime) / 60000;
    const wpm = correctWords / timeElapsed;
    document.getElementById('wpm').textContent = `WPM: ${Math.round(wpm)}`;
}
