const file = await Deno.readTextFile("./input.txt");

const moves = file.split("\r\n").map((line) => ({
    direction: line[0],
    distance: parseInt(line.slice(2)),
}))

type Direction = 'U' | 'D' | 'R' | 'L';

interface Player {
    x: number;
    y: number;
}

const h = {
    x: 0,
    y: 0
}
const t = {
    x: 0,
    y: 0
}
const set = new Set<string>([`${t.x},${t.y}`]);

for (const move of moves) {
    for (let i = 0; i < move.distance; i++) {
        moveHead(h, move.direction);
        const shouldMove = shouldTailMove(h, t);
        if (shouldMove) {
            moveTail(t, move.direction, h);
            set.add(`${t.x},${t.y}`);
        }
    }
}

console.log(set.size);

function moveHead(h: Player, direction: Direction) {
    switch (direction) {
        case "U":
            h.y++
            break
        case "D":
            h.y--
            break
        case "R":
            h.x++
            break
        case "L":
            h.x--
            break
    }
}

function shouldTailMove(h: Player, t: Player) {
    const dx = Math.abs(h.x - t.x)
    const dy = Math.abs(h.y - t.y)
    return dx > 1 || dy > 1
}

function moveTail(t: Player, direction: Direction, h: Player) {
    switch (direction) {
        case "U":
            t.y = h.y - 1
            t.x = h.x
            break
        case "D":
            t.y = h.y + 1
            t.x = h.x
            break
        case "R":
            t.x = h.x - 1
            t.y = h.y
            break
        case "L":
            t.x = h.x + 1
            t.y = h.y
            break
    }
}