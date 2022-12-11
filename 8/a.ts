const file = await Deno.readTextFile("./input.txt");

const rows = file.split("\r\n");

const edgeCount = ((rows.length - 2) + rows[0].length) * 2
let visibleCount = 0

for (let row = 1; row < rows.length - 1; row++) {
    for (let col = 1; col < rows[row].length - 1; col++) {
        const visible = isVisible(row, col, rows)
        if (visible) {
            visibleCount++
        }
    }
}

console.log(edgeCount + visibleCount)

function isVisible(row: number, col: number, rows: string[]): boolean {
    const left = checkLeft(row, col, rows)
    const right = checkRight(row, col, rows)
    const up = checkUp(row, col, rows)
    const down = checkDown(row, col, rows)

    return left || right || up || down
}

function checkLeft(row: number, col: number, rows: string[]): boolean {
    const currentRow = rows[row]
    const value = currentRow[col]
    for (let i = col - 1; i >= 0; i--) {
        if (value <= currentRow[i]) {
            return false
        }
    }
    return true
}

function checkRight(row: number, col: number, rows: string[]): boolean {
    const currentRow = rows[row]
    const value = currentRow[col]
    for (let i = col + 1; i < currentRow.length; i++) {
        if (value <= currentRow[i]) {
            return false
        }
    }
    return true
}

function checkUp(row: number, col: number, rows: string[]): boolean {
    const value = rows[row][col]
    for (let i = row - 1; i >= 0; i--) {
        if (value <= rows[i][col]) {
            return false
        }
    }
    return true
}

function checkDown(row: number, col: number, rows: string[]): boolean {
    const value = rows[row][col]
    for (let i = row + 1; i < rows.length; i++) {
        if (value <= rows[i][col]) {
            return false
        }
    }
    return true
}