const { readFileSync } = require('fs');


const priorityValues = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26,
    'A': 27, 'B': 28, 'C': 29, 'D': 30, 'E': 31, 'F': 32, 'G': 33, 'H': 34, 'I': 35, 'J': 36, 'K': 37, 'L': 38, 'M': 39, 'N': 40, 'O': 41, 'P': 42, 'Q': 43, 'R': 44, 'S': 45, 'T': 46, 'U': 47, 'V': 48, 'W': 49, 'X': 50, 'Y': 51, 'Z': 52,
}

const calculateGroupPrioritySum = (items) => {

    const groupedRucksacks = items.reduce((group, item, idx) => {
        if (((idx + 1) % 3) == 0) group.push([item, items[idx - 1], items[idx - 2]]);

        return group;
    }, []);

    return groupedRucksacks.reduce((priorityAcc, groupedRucksack) => {
        const firstRucksack = groupedRucksack[0];
        const secondRucksack = groupedRucksack[1];
        const thirdRucksack = groupedRucksack[2];

        for (let i = 0; i < firstRucksack.length; i++) {
            const j = firstRucksack[i];

            if(secondRucksack.includes(j) && thirdRucksack.includes(j)) return priorityAcc + priorityValues[j];
        };

        return priorityAcc;
    }, 0);
};

const calculatePrioritySum = (items) => {

    return items.reduce((priorityAcc, item) => {

        const firstRucksack = item.substring(0, item.length / 2);
        const secondRucksack = item.substring(item.length / 2);

        for (let i = 0; i < firstRucksack.length; i++) {
            const j = firstRucksack[i];

            if (secondRucksack.includes(j)) return priorityAcc + priorityValues[j];
        };

        return priorityAcc;

    }, 0);
};

const readItemsIntoArray = () => {

    const items = readFileSync('./03/items.txt', 'utf-8');

    return items.split("\n");
}

describe('AOC Day 3', () => {

    let items;
    let prioritySum;
    let groupPrioritySum;

    beforeEach(() => {
        items = readItemsIntoArray();
        prioritySum = calculatePrioritySum(items);
        groupPrioritySum = calculateGroupPrioritySum(items);
    });

    test('Part 1', () => {
        console.log(prioritySum);
    });

    test('Part 2', () => {
        console.log(groupPrioritySum);
    })
})