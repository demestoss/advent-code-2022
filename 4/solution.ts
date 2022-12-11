const file = await Deno.readTextFile("./input.txt");

const pairs = file
    .split("\r\n")
    .map((x) => x.split(",").map(y => y.split('-').map(z => parseInt(z, 10))))

let overlaps = 0

for (const pair of pairs) {
    const [a, b] = pair;
    const [x, y] = a;
    const [u, v] = b;

    if ((x < u && y < u) || (v > y && u > y) || (x > v && y > v) || (u > y && u > x)) {
        continue;
    }

    overlaps++;
}

console.log(overlaps);