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

    for (let i = 0; i < count; i++) {
        stacks[to].push(stacks[from].pop())
    }
}

const topValues = stacks.reduce((acc, stack) => acc + stack.peek(), '')

console.log(topValues)