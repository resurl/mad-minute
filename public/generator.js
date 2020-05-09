/**
 * initializes questions array
 * ensures each number exists in a random place in the array at least once
 * @param {Number} numFactors - the number of factors
 * @param {Number} size - size of array / # of questions
 */
function initQArray(numFactors, size) {
    let randArrIndex = Math.floor(Math.random()*(size + 1)); // index between 0 and 47
    let ar = new Array(size);
    for (let i = 1; i < numFactors + 1; i++) {
        while(ar[randArrIndex])
            randArrIndex = Math.floor(Math.random()*(size + 1));
        ar[randArrIndex] = i;
    }
    return ar;
}

function generateQuestions(num, size) {
    let arr = [...initQArray(num,size)];
    for (let i = 0; i < arr.length; i++)
        if (!arr[i] || arr[i] === 0)
            arr[i] = Math.floor(Math.random()*(num) + 1)
    return arr;
}

/**
 * generates corresponding answers to given factor array
 * @param {Number} num - number to be tested
 * @param {Array} arr - generated question array
 */
function generateAnswers(num, arr) {
    let ary = new Array(arr.length);
    for (let i = 0; i < arr.length; i++)
        ary[i] = arr[i] * num
    return ary;
}

/**
 * Generates an object containing question and answer arrays for multiplication
 * of a specific number
 * @param {Number} maxFactor - the highest number to be multiplied against
 * @param {Number} size - how many questions
 * @param {Number} num - the number being multiplied with
 */
export default function generate(maxFactor, size, num) {
    let questions = generateQuestions(maxFactor, size)
    let answers = generateAnswers(num,questions);
    let bank = {
        "questions":questions,
        "answers":answers
    }
    return bank;
}
