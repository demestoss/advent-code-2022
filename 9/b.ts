const file = await Deno.readTextFile("./input.txt");

const moves = file.split("\r\n").map((line) => ({
    direction: line[0],
    distance: parseInt(line.slice(2)),
}))

type Direction = 'U' | 'D' | 'R' | 'L';

class Player {
    x = 25
    y = 25

    constructor(private readonly id: string) {}

    get position() {
        return `${this.x},${this.y}`
    }

    moveInDirection(direction: Direction) {
        switch (direction) {
            case "U":
                this.y++
                break
            case "D":
                this.y--
                break
            case "R":
                this.x++
                break
            case "L":
                this.x--
                break
        }
    }

    moveRelative(player: Player): boolean {
        const dx = Math.abs(player.x - this.x)
        const dy = Math.abs(player.y - this.y)

        if (dx < 2 && dy < 2) {
            return false
        }

        if (dx > 1 && dy === 0) {
            this.x += player.x > this.x ? 1 : -1
        } else if (dy > 1 && dx === 0) {
            this.y += player.y > this.y ? 1 : -1
        } else {
            this.x += player.x > this.x ? 1 : -1
            this.y += player.y > this.y ? 1 : -1
        }

        return true
    }
}

class Snake {
    #head: Player = new Player('H')
    readonly players: Player[]

    constructor(numberOfPlayers: number) {
        this.players = new Array(numberOfPlayers).fill(0).map((_, i) => new Player(`${i + 1}`))
    }

    get tail() {
        return this.players[this.players.length - 1]
    }

    move(direction: Direction): boolean {
        this.#head.moveInDirection(direction)

        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i]
            const prevPlayer = this.players[i - 1] || this.#head

            const moved = player.moveRelative(prevPlayer)

            if (!moved) {
                return false
            }
        }

        return true
    }
}

const numberOfPlayers = 9
const spake = new Snake(numberOfPlayers)

const set = new Set<string>([spake.tail.position]);

for (const move of moves) {
    for (let i = 0; i < move.distance; i++) {
        const moved = spake.move(move.direction)

        if (moved) {
            set.add(spake.tail.position);
        }
    }
}

console.log(set.size);
