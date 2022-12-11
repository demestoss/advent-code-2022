import { parseStacks } from "./utils.ts";

const file = await Deno.readTextFile("./input.txt");

const [stacksStr, movesStr] = file
    .split("\r\n\r\n")

const moves = movesStr.split("\r\n")
const stacks = parseStacks(stacksStr)

for (const move of moves) {
    const split = move.split(' ')
    const count = Number(split[1]),
        from = Number(split[3]) - 1,
        to = Number(split[5]) - 1

    const peeked = []
    for (let i = 0; i < count; i++) {
        peeked.push(stacks[from].pop())
    }
    stacks[to].populate(peeked.reverse())
}

const topValues = stacks.reduce((acc, stack) => acc + stack.peek(), '')

console.log(topValues)
