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
// TODO: handle end of test
function startTimer() {
    running = true;
    quizState.correct = 0;
    quizState.position = 0;
    let beginning = Date.now();
    refreshInterval = setInterval(() => {
        delta = Date.now() - beginning;
        // or if questions have all been completed
        if (delta > 100000) {
            document.getElementById('timer').innerHTML = 'Time\'s up!';
            clearInterval(refreshInterval);
            setTimeout(endTimer, 3000);
            return;
        }
        let time = `${Math.floor(delta/100000)}:${Math.floor(delta/10000) % 6}${Math.floor(delta/1000) % 10}`;
        document.getElementById('timer').innerHTML = time;
    }, 100);
    startQuiz();
}

function endTimer() {
    console.log('ending timer');
    if (refreshInterval)
        clearInterval(refreshInterval);
    running = false;
    document.getElementById('timer').innerHTML = '0:00';
    handleQuizEnd();
    quizState.position = 0;
    quizState.correct = 0;
    delta = 0;
}

function startQuiz() {
    if(num > maxFactor)
        maxFactor = num;
    quizState.bank = generate(maxFactor, numQuestions, num);
    questionText.innerHTML = `${num} x ${quizState.bank.questions[0]} =`;
}

function parseAnswer(string) {
    if (string == quizState.bank.answers[quizState.position])
        quizState.correct++;
    quizState.position++;
    answerBox.value = '';
    if (quizState.position > numQuestions)
        endTimer();
    questionText.innerHTML = `${num} x ${quizState.bank.questions[quizState.position]} =`;
}

function handleQuizEnd() {
    console.log(`you answered ${quizState.correct} out of ${numQuestions} questions`)
}