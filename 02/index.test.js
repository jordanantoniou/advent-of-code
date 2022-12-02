const { readFileSync } = require('fs');

// A, X = Rock = 1
// B, Y = Paper = 2
// C, Z = Scissor = 3
// Loss = 0, Draw = 3, Win = 6

const rpsValues = {
    'A': 1, 'X': 1,
    'B': 2, 'Y': 2,
    'C': 3, 'Z': 3
};

const rpsRules = {
    'AZ': 0, 'BX': 0, 'CY': 0,
    'AX': 3, 'BY': 3, 'CZ': 3,
    'AY': 6, 'BZ': 6, 'CX': 6
};

// X = Lose
// Y = Draw
// Z = Win

const rpsNewRules = {
    'X': 0,
    'Y': 3,
    'Z': 6
};

const rpsNewValues = {
    'AZ': 'Y', 'BX': 'X', 'CY': 'Z',
    'AX': 'Z', 'BY': 'Y', 'CZ': 'X',
    'AY': 'X', 'BZ': 'Z', 'CX': 'Y'
};

const readRPSIntoArray = () => {

    const rps = readFileSync('./02/rps.txt', 'utf-8');

    const rpsArr = rps.replaceAll(" ", "").split("\n");

    return rpsArr;
};

const calculateRPSTotalScore = (rpsArr) => {

    return rpsArr.reduce((score, currentRPS) => {

        const rpsValue = rpsValues[currentRPS.charAt(1)];

        const resultValue = rpsRules[currentRPS];

        return score + rpsValue + resultValue;
    }, 0);
};

const calculateRPSTotalScoreNewRules = (rpsArr) => {

    return rpsArr.reduce((score, currentRPS) => {
        const rpsResult = rpsNewRules[currentRPS.charAt(1)];

        const rpsValue = rpsValues[rpsNewValues[currentRPS]];

        return score + rpsValue + rpsResult;
    }, 0);
}

describe('AOC Day 2', () => {

    let rpsArr;
    let totalScore;
    let newRulesTotalScore;

    beforeEach(() => {
        rpsArr = readRPSIntoArray();
        totalScore = calculateRPSTotalScore(rpsArr);
        newRulesTotalScore = calculateRPSTotalScoreNewRules(rpsArr)
    });

    test('Part 1', () => {
        console.log(totalScore);
    });

    test('Part 2', () => {
        console.log(newRulesTotalScore);
    })
})