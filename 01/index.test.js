const { readFileSync } = require('fs');


const sortCaloriesPerElfAscending = (filename) => {

    const allCalories = readFileSync(filename, 'utf-8');

    return allCalories
        .split("\n\n")
        .map(calories => calories.split("\n"))
        .map(calories => calories.map(Number).reduce((acc, value) => {

            return acc + value
        }), 0)
        .sort((a, b) => b - a);
}

const caloriesFile = './01/calories.txt';

describe('AOC Day 1', () => {

    let caloriesAsc;

    beforeEach(() => {
        caloriesAsc = sortCaloriesPerElfAscending(caloriesFile);
    });

    test('Part 1', () => {
        console.log(caloriesAsc[0]);
    });

    test('Part 2', () =>{
        console.log(caloriesAsc[0] + caloriesAsc[1] + caloriesAsc[2]);
    })
})