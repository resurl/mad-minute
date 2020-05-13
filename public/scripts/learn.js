import * as Generator from './generator.js'
const urlPath = window.location.pathname;
const num = parseInt(urlPath.charAt(urlPath.length-1));
const flashcard = document.getElementById('flashcard');
const flipButton = document.getElementById('flip');
let maxFactor = 12;
let cards = Generator.practice(12,num);
let showingAnswer = false;
let randInt = Math.floor((Math.random() * maxFactor));
flashcard.innerHTML = flashcard.innerHTML = `${num} x ${cards.questions[randInt]} = ?`;

flipButton.addEventListener('click', () => {
    showingAnswer = !showingAnswer;
    if (showingAnswer) {
        flashcard.innerHTML = `${cards.answers[randInt]}`;
        flipButton.innerHTML = `Show Question`;
    } else {
        flashcard.innerHTML = `${num} x ${cards.questions[randInt]} = ?`;
        flipButton.innerHTML = `Show Answer`;
    }
})

document.getElementById('next').addEventListener('click', () => {
    randInt = Math.floor((Math.random() * maxFactor));
    flashcard.innerHTML = `${num} x ${cards.questions[randInt]} = ?`;
    flipButton.innerHTML = `Show Answer`;
    showingAnswer = false;
})