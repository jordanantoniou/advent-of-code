const { readFileSync } = require('fs');

const createArrayFromRange = (range) => {
    const [min, max] = range.split('-');

    let rangeArr = [];

    for (let i = parseInt(min); i <= max; i++) {
        rangeArr.push(i);
    }

    return rangeArr;
}

const calculatePartialContainedPairs = (assignments) => {
    return assignments.reduce((containedAcc, assignment) => {

        const [range1, range2] = assignment.split(',');

        const rangeArr1 = createArrayFromRange(range1);
        const rangeArr2 = createArrayFromRange(range2);

        if (rangeArr1.some(r1 => rangeArr2.includes(r1))) return containedAcc + 1;

        if(rangeArr2.some(r2 => rangeArr1.includes(r2))) return containedAcc + 1;

        return containedAcc;
    }, 0)
}

const calculateFullyContainedPairs = (assignments) => {
    return assignments.reduce((containedAcc, assignment) => {

        const [range1, range2] = assignment.split(',');

        const rangeArr1 = createArrayFromRange(range1);
        const rangeArr2 = createArrayFromRange(range2);

        if (rangeArr1.every(r1 => rangeArr2.includes(r1))) return containedAcc + 1;

        if(rangeArr2.every(r2 => rangeArr1.includes(r2))) return containedAcc + 1;

        return containedAcc;
    }, 0)
}

const readAssignmentsToArray = () => {

    const assignments = readFileSync('./04/assignments.txt', 'utf-8');

    return assignments.split("\n");
}

describe('AOC Day 4', () => {

    let assignments;
    let fullyContainedPairs;
    let partialContainedPairs;

    beforeEach(() => {
        assignments = readAssignmentsToArray();
        fullyContainedPairs = calculateFullyContainedPairs(assignments);
        partialContainedPairs = calculatePartialContainedPairs(assignments);
    });

    test('Part 1', () => {
        console.log(fullyContainedPairs);
    });

    test('Part 2', () => {
        console.log(partialContainedPairs);
    });
})