const { readFileSync } = require('fs');

const createDirectory = (name, parent) => {
    return {
        name,
        parent,
        isDirectory: true,
        children: []
    }
};

const createFile = (name, size) => {
    return {
        name,
        size,
        isFile: true
    }
};

let sizes = [];

const calculateSize = (node) => {
    if (node.isDirectory) {
        const size = node.children.map(child => calculateSize(child)).reduce((a, b) => a + b, 0);

        sizes.push(size);

        return size;
    } else {
        return node.size;
    };
};


const createFileStructure = (commands) => {

    const root = createDirectory('/');
    let currentDirectory = root;

    commands.forEach(command => {
        if (command.startsWith('$ cd ')) {
            const directory = command.split('$ cd ')[1];

            if (directory === '/') {
                currentDirectory = root;
            } else if (directory === '..') {
                currentDirectory = currentDirectory.parent || root;
            } else {
                currentDirectory = currentDirectory.children.find(child => child.name === directory);
            }

        };

        if (command.startsWith('dir ')) {
            const name = command.split('dir ')[1];
            const parent = currentDirectory;
            const directory = createDirectory(name, parent);

            currentDirectory.children.push(directory);
        };

        if ((/^\d/).test(command)) {
            const [size] = command.match(/^\d+/g);
            const name = command.split(`${size} `)[1];

            const file = createFile(name, Number(size));

            currentDirectory.children.push(file);
        }
    });

    return root;
};

const readCommandsToArray = () => {
    const items = readFileSync('./07/commands.txt', 'utf-8');

    return items.split("\n");
};

describe('AOC Day 7', () => {

    let commands;
    let fileStructure;

    beforeEach(() => {
        directorySizes = [];
        commands = readCommandsToArray();
        fileStructure = createFileStructure(commands);
    });

    test('Part 1', () => {
        calculateSize(fileStructure);
        const size = sizes.filter(size => size < 100000).reduce((a, b) => a + b, 0);
        console.log(size);
    });

    test('Part 2', () => {
        const diskSize = 70000000;
        const freeSpace = 30000000;

        const size = calculateSize(fileStructure);

        const unusedSpace = diskSize - size;

        const sortedSizes = sizes.sort((a, b) => a - b);

        for (const size of sortedSizes) {
             if (size + unusedSpace >= freeSpace) {
                console.log(size);
                break;
             }
        }
    });
})