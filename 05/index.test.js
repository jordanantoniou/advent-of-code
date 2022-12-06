const { readFileSync } = require('fs');

const rearrangeCrates9001 = (rearrangements, stackMapping) => {
    rearrangements.forEach(rearrangement => {

        const [cratesToMove, fromStack, toStack] = rearrangement.match(/\d+/g);

        const tempStack = [];

        for (let i = 1; i <= cratesToMove; i++) {
            const poppedCrate = stackMapping[fromStack].pop();

            if (poppedCrate) tempStack.push(poppedCrate);
        }

        for (let i = 1; i <= cratesToMove; i++) {
            stackMapping[toStack].push(tempStack.pop());
        }
    });

    let message = '';

    Object.values(stackMapping).forEach(stack => {
        if (stack.length > 0) message += stack.pop();
    });

    return message;
};

const rearrangeCrates9000 = (rearrangements, stackMapping) => {
    rearrangements.forEach(rearrangement => {

        const [cratesToMove, fromStack, toStack] = rearrangement.match(/\d+/g);

        for (let i = 1; i <= cratesToMove; i++) {
            const poppedCrate = stackMapping[fromStack].pop();

            if (poppedCrate) stackMapping[toStack].push(poppedCrate);
        }
    });

    let message = '';

    Object.values(stackMapping).forEach(stack => {
        if (stack.length > 0) message += stack.pop();
    });

    return message;
};

const readRearrangements = () => {
    const items = readFileSync('./05/rearrangement.txt', 'utf-8');

    return items.split("\n");
};

describe('AOC Day 5', () => {

    let rearrangements;
    let stackMapping;

    beforeEach(() => {
        rearrangements = readRearrangements();

        const S1 = ['B', 'Z', 'T'];
        const S2 = ['V', 'H', 'T', 'D', 'N'];
        const S3 = ['B', 'F', 'M', 'D'];
        const S4 = ['T', 'J', 'G', 'W', 'V', 'Q', 'L'];
        const S5 = ['W', 'D', 'G', 'P', 'V', 'F', 'Q', 'M'];
        const S6 = ['V', 'Z', 'Q', 'G', 'H', 'F', 'S'];
        const S7 = ['Z', 'S', 'N', 'R', 'L', 'T', 'C', 'W'];
        const S8 = ['Z', 'H', 'W', 'D', 'J', 'N', 'R', 'M'];
        const S9 = ['M', 'Q', 'L', 'F', 'D', 'S'];

        stackMapping = {
            1: S1,
            2: S2,
            3: S3,
            4: S4,
            5: S5,
            6: S6,
            7: S7,
            8: S8,
            9: S9,
        };
    });

    test('Part 1', () => {
        const message = rearrangeCrates9000(rearrangements, stackMapping);
        console.log(message);
    });

    test('Part 2', () => {
        const message = rearrangeCrates9001(rearrangements, stackMapping);
        console.log(message);
    });
})