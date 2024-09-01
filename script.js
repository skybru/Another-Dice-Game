const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("input[name='score-options']");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScore = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesBtn = document.getElementById("rules-btn");
const rulesContainer = document.querySelector(".rules-container");

let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let round = 1;

const updateStats = () => {
    roundElement.textContent = round;
    rollsElement.textContent = rolls;
};

const updateRadioOption = (index, score) => {
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = score;
    scoreSpans[index].textContent += `, score = ${score}`;
};

const getHighestDuplicates = (numbers) => {

    
};

rollDiceBtn.addEventListener("click", () => {
    if (rolls >= 3) {
        alert("Alredy rolled three times for this round. Choose a score!")
        return;
    }

    rolls++;
    listOfAllDice.forEach((die, index) => {
        diceValuesArr[index] = Math.floor(Math.random() * 6) + 1;
        die.textContent = diceValuesArr[index];
    });
    updateStats();
    //Array.from(listOfAllDice).sort((a, b) => a - b); misinterpreted the quest
});

rulesBtn.addEventListener("click", () => {
    //to be refactored without else
    if (!isModalShowing) {
        isModalShowing = true;
        rulesContainer.style.display = "block";
        rulesBtn.textContent = "Hide rules";
    } else {
        isModalShowing = false;
        rulesContainer.style.display = "none";
        rulesBtn.textContent = "Show rules";
    }
});