const file = await Deno.readTextFile("./input.txt");

const games = file
    .split("\r\n")
    .map((x) => x.split(" "));

const shapePointsMap = {
    'A': 1,
    'B': 2,
    'C': 3,
}

const resultMap = {
    'X': 0,
    'Y': 3,
    'Z': 6,
}

const players = ['A', 'B', 'C'];

let totalPoints = 0

function calculatePlayer(p1: string, p2: string) {
    const playerIndex = players.indexOf(p1)
    switch (p2) {
        case 'X':
            return players[playerIndex === 0 ? 2 : playerIndex - 1]
        case 'Y':
            return p1
        case 'Z':
            return players[playerIndex === 2 ? 0 : playerIndex + 1]
    }
}

for (const game of games) {
    const [p1, p2] = game;

    const player = calculatePlayer(p1, p2)

    totalPoints += (shapePointsMap[player] + resultMap[p2])
}

console.log(totalPoints)