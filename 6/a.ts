const string = await Deno.readTextFile("./input-s.txt");

let finded = 0;

for (let i = 3; i < string.length; ++i) {
    const set = new Set(string.slice(i - 3, i + 1));
    console.log(set, string.slice(i - 3, i + 1));
    if (set.size === 4) {
        finded = i;
        break;
    }
}

console.log(finded + 1);