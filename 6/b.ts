const string = await Deno.readTextFile("./input.txt");

const maxNumber = 14
let finded = 0;

for (let i = maxNumber - 1; i < string.length; ++i) {
    const set = new Set(string.slice(i - (maxNumber - 1), i + 1));
    if (set.size === maxNumber) {
        finded = i;
        break;
    }
}

console.log(finded + 1);