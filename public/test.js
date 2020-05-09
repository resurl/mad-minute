import generate from "./generator.js"

const urlPathname = window.location.pathname;
const num = parseInt(urlPathname.charAt(urlPathname.length-1));
const submitButton = document.getElementById('submit');
const answerBox = document.getElementById('answer');
const questionText = document.getElementById('question');
let running = false;
let refreshInterval = 0;
let delta = 0;
let numQuestions = 48;
let maxFactor = 12;
let quizState = {
    bank: [],
    position: 0,
    correct: 0
}

// if timer isn't already running, start tracking time
document.getElementById('start').addEventListener('click', () => {
    if (running) return;
    startTimer();
})

document.getElementById('end').addEventListener('click', () => {
    if (!running && delta == 0 ) return;
    endTimer();
})

answerBox.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode=='13') 
        submitButton.click();
})

submitButton.addEventListener('click', () => {
    if (!answerBox.value) return;
    parseAnswer(answerBox.value);
})

// sets state of timer to running and begins timer
// TODO: format time to 00:00
function startTimer() {
    running = true;
    quizState.position = 0;
    let beginning = Date.now();
    refreshInterval = setInterval(() => {
        delta = Date.now() - beginning;
        let time = `${Math.floor(delta/100000)}:${Math.floor(delta/10000) % 6}${Math.floor(delta/1000) % 10}`
        document.getElementById('timer').innerHTML = time;
    }, 100);
    startQuiz();
}

function endTimer() {
    clearInterval(refreshInterval);
    running = false;
    quizState.position = 0;
    quizState.correct = 0;
    delta = 0;
    document.getElementById('timer').innerHTML = '0:00';
}

function startQuiz() {
    if(num > maxFactor)
        maxFactor = num;
    quizState.bank = generate(maxFactor, numQuestions, num);
    questionText.innerHTML = `${num} x ${quizState.bank.questions[0]} =`;
}

function parseAnswer(string) {
    if (string == quizState.bank.answers[quizState.position]) {
        quizState.correct++;
        console.log('correct!')
    }
    quizState.position++;
    answerBox.value = '';
    questionText.innerHTML = `${num} x ${quizState.bank.questions[quizState.position]} =`
}