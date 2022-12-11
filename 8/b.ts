const file = await Deno.readTextFile("./input.txt");

const rows = file.split("\r\n");

let maxScore = 0

for (let row = 1; row < rows.length - 1; row++) {
    for (let col = 1; col < rows[row].length - 1; col++) {
        const score = calculateScore(row, col, rows)
        if (score > maxScore) {
            maxScore = score
        }
    }
}

console.log(maxScore)

function calculateScore(row: number, col: number, rows: string[]): boolean {
    const left = checkLeft(row, col, rows)
    const right = checkRight(row, col, rows)
    const up = checkUp(row, col, rows)
    const down = checkDown(row, col, rows)

    return left * right * up * down
}

function checkLeft(row: number, col: number, rows: string[]): boolean {
    const currentRow = rows[row]
    const value = currentRow[col]
    let score = 0
    for (let i = col - 1; i >= 0; i--) {
        score++;
        if (value <= currentRow[i]) {
            break
        }
    }
    return score
}

function checkRight(row: number, col: number, rows: string[]): boolean {
    const currentRow = rows[row]
    const value = currentRow[col]
    let score = 0
    for (let i = col + 1; i < currentRow.length; i++) {
        score++;
        if (value <= currentRow[i]) {
            break
        }
    }
    return score
}

function checkUp(row: number, col: number, rows: string[]): boolean {
    const value = rows[row][col]
    let score = 0
    for (let i = row - 1; i >= 0; i--) {
        score++;
        if (value <= rows[i][col]) {
            break
        }
    }
    return score
}

function checkDown(row: number, col: number, rows: string[]): boolean {
    const value = rows[row][col]
    let score = 0
    for (let i = row + 1; i < rows.length; i++) {
        score++;
        if (value <= rows[i][col]) {
            break
        }
    }
    return score
}