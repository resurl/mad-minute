import * as Generator from './generator.js'
const urlPath = window.location.pathname;
const num = parseInt(urlPath.split('/').pop());
const flashcard = document.getElementById('flashcard');
const flipButton = document.getElementById('flip');
const nextButton = document.getElementById('next');
let clicked = false;
let maxFactor = 12;
let cards = Generator.practice(maxFactor,num);
let showingAnswer = false;
let randInt = Math.floor((Math.random() * maxFactor));
flashcard.innerHTML = flashcard.innerHTML = `${num} x ${cards.questions[randInt]} = ?`;

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode == '32') // spacebar
        flipButton.click();
    else if (e.keyCode == '13') // enter key
        nextButton.click();
})

flipButton.addEventListener('click', () => {
    if (clicked == false) {
        clicked = true;
        showingAnswer = !showingAnswer;
        if (showingAnswer) {
            flashcard.innerHTML = `${cards.answers[randInt]}`;
            flipButton.innerHTML = `Show Question`;
        } else {
            flashcard.innerHTML = `${num} x ${cards.questions[randInt]} = ?`;
            flipButton.innerHTML = `Show Answer`;
        }
        setTimeout(() => {
            clicked = false;
        }, 100);
    }   
})

nextButton.addEventListener('click', () => {
    if (clicked == false) {
        clicked = true;
        randInt = Math.floor((Math.random() * maxFactor));
        flashcard.innerHTML = `${num} x ${cards.questions[randInt]} = ?`;
        flipButton.innerHTML = `Show Answer`;
        showingAnswer = false;
        setTimeout(() => {
            clicked = false;
        }, 100);
    }
})