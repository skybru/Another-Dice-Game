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

const resetRadioOptions = () => {
    scoreInputs.forEach(input => {
        input.disabled = true;
        input.checked = false;
    });

    scoreSpans.forEach(span => {
        span.textContent = "";
    });
};

const updateScore = (value, id) => {
    score += parseInt(value);
    totalScore.textContent = score;
    scoreHistory.innerHTML += `<li>${id} : ${value}</li>`;
};

const getHighestDuplicates = (numbers) => {
    const counter = {};
    numbers.forEach((item) => {
        counter[item] = (counter[item] || 0) + 1;
    });

    let highestRepetition = 0;

    numbers.forEach((item) => {
        const count = counter[item];
        if (count >= 3 && count > highestRepetition) {
            highestRepetition = count;
        }
        if (count >= 4 && count > highestRepetition) {
            highestRepetition = count;
        }
    });

    const sumAllDice = numbers.reduce((a, b) => a + b, 0);

    if (highestRepetition >= 4) {
        updateRadioOption(1, sumAllDice);
    }
    if (highestRepetition >= 3) {
        updateRadioOption(0, sumAllDice);
    }

    updateRadioOption(5, 0);
};

const detectFullHouse = (numbers) => {
    const counter = {};
    numbers.forEach((item) => {
        counter[item] = (counter[item] || 0) + 1;
    });

    const hasThreeOfAKind = Object.values(counter).includes(3);
    const hasPair = Object.values(counter).includes(2);

    if (hasThreeOfAKind && hasPair) {
        updateRadioOption(2, 25);
    }

    updateRadioOption(5, 0);
};

const checkForStraights = (numbers) => {
    let counter = [];

    numbers.sort((a, b) => a - b);

    for (let i = numbers.length - 1; i > 0; i--) {
        const val = numbers[i] - numbers[i - 1];
        counter.push(val);
    }

    if (counter.every(item => item === 1)) {
        updateRadioOption(4, 40);
        updateRadioOption(3, 30);
    } else if (counter.slice(0, 2).every(item => item === 1) || 
    counter.slice(1, 3).every(item => item === 1)) {
        updateRadioOption(3, 30);
    };

    updateRadioOption(5, 0);
};

const resetGame = () => {
    listOfAllDice.forEach(item => {
        item.textContent = "0";
    });
    score = 0;
    rolls = 0;
    round = 1;
    totalScore.textContent = score;
    scoreHistory.innerHTML = "";
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
    resetRadioOptions();
};

rollDiceBtn.addEventListener("click", () => {
    if (rolls >= 3) {
        alert("Alredy rolled three times for this round. Choose a score!")
        return;
    }
    resetRadioOptions(scoreInputs);
    rolls++;
    //maybe refactor into a call function?
    listOfAllDice.forEach((die, index) => {
        diceValuesArr[index] = Math.floor(Math.random() * 6) + 1;
        die.textContent = diceValuesArr[index];
    });
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
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

keepScoreBtn.addEventListener("click", () => {

    let valueSelected;
    let radioId;

    scoreInputs.forEach(item => {
        if (item.checked) {
            valueSelected = item.value;
            radioId = item.id;
        }
    });

    if (valueSelected) {
        rolls = 0;
        round++;
        updateStats();
        resetRadioOptions();
        updateScore(valueSelected, radioId);
        if (round > 6) {
            setTimeout(() => {
                alert("Game Over! Your final Score: " + score)
                resetGame();
            }, 500);
        }
    } else {
        alert("Please, select a score option!")
    }

});