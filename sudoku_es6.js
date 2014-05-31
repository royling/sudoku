function sequence(min, max) {
    return Array.apply(null, Array(max - min + 1)).map((x, y) => y + min);
}

function randNums(max, min = 0, size = 1) {
    let range = sequence(min, max);
    return sequence(1, size).reverse().reduce(result => {
        let randInt = ~~(Math.random() * range.length);
        return result.concat(range.splice(randInt, 1));
    }, []);
}

function genValidSudoku() {
    let [a, b, c, d, e, f, g, h, i] = randNums(9, 1, 9);
    return [
        [i, g, h, c, a, b, f, d, e],
        [c, a, b, f, d, e, i, g, h],
        [f, d, e, i, g, h, c, a, b],
        [g, h, i, a, b, c, d, e, f],
        [a, b, c, d, e, f, g, h, i],
        [d, e, f, g, h, i, a, b, c],
        [h, i, g, b, c, a, e, f, d],
        [b, c, a, e, f, d, h, i, g],
        [e, f, d, h, i, g, b, c, a]
    ];
}

const LEVELS = { easy: 31, medium: 41, hard: 51 };

function createGame(sudoku, level = 'easy') {
    level = LEVELS[level] + randNums(9)[0];
    randNums(80, 0, level).forEach(idx => {
        sudoku[~~(idx / 9)][idx % 9] = 0;
    });
    return sudoku;
}

console.log(createGame(genValidSudoku()));
