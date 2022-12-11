const file = await Deno.readTextFile("./input.txt");

const rucksacks: string[] = file
    .split("\r\n")

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const compartments: string[] = []

const maxCount = 3
const currentItems = []
let currentCount = 0

for (const rucksack of rucksacks) {
    if (currentCount < maxCount - 1) {
        currentItems.push(rucksack)
        currentCount++
        continue
    }

    for (let i = 0; i < rucksack.length; ++i) {
        const c = rucksack[i]
        if (currentItems.every(el => el.includes(c))) {
            compartments.push(c)
            break
        }
    }

    currentCount = 0
    currentItems.length = 0
}

const calculatedPriority = compartments.reduce((acc, item) => acc + priority.indexOf(item) + 1, 0)
console.log(calculatedPriority)
