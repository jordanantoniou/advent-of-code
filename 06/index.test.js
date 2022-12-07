const { readFileSync } = require('fs');

const calculateMarkerPosition = (signal, charSize) => {

    const signalArr = [...signal];

    let marker;

    signalArr.some((char, idx) => {
        const groupedChars = signalArr.slice(idx, idx + charSize);
        const noDuplicates = new Set(groupedChars).size === charSize;

        if (noDuplicates) {
            marker = idx + charSize;
        };
    
        return noDuplicates;
    });

    return marker;
};

const readSignal = () => {
    return readFileSync('./06/signal.txt', 'utf-8');
};

describe('AOC Day 6', () => {

    let signal;

    beforeEach(() => {
        signal = readSignal();
    });

    test('Part 1', () => {
        const marker = calculateMarkerPosition(signal, 4);
        console.log(marker);
    });

    test('Part 2', () => {
        const marker = calculateMarkerPosition(signal, 14);
        console.log(marker);
    });
})