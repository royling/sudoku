randNums = (max, min = 0, size = 1) ->
  range = [min..max]
  [size..1].reduce ((result) ->
    result.concat range.splice ~~(Math.random() * range.length), 1), []

genValidSudoku = ->
  [a, b, c, d, e, f, g, h, i] = randNums 9, 1, 9
  [
    [i, g, h, c, a, b, f, d, e]
    [c, a, b, f, d, e, i, g, h]
    [f, d, e, i, g, h, c, a, b]
    [g, h, i, a, b, c, d, e, f]
    [a, b, c, d, e, f, g, h, i]
    [d, e, f, g, h, i, a, b, c]
    [h, i, g, b, c, a, e, f, d]
    [b, c, a, e, f, d, h, i, g]
    [e, f, d, h, i, g, b, c, a]
  ]

mask = (sudoku, idx) -> sudoku[~~(idx / 9)][idx % 9] = 0

LEVELS = easy: 31, medium: 41, hard: 51

createGame = (sudoku, level = 'easy') ->
  level = LEVELS[level] + (randNums 9)[0]
  mask sudoku, idx for idx in (randNums 80, 0, level)
  sudoku

console.log createGame genValidSudoku()
