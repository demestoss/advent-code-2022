const file = await Deno.readTextFile("./input.txt");

const caloriesLists = file
    .split("\r\n\r\n")
    .map((x) => x.split("\r\n").map(y => parseInt(y)));

const topThreeMax = [0, 0, 0]

for (const caloriesList of caloriesLists) {
    const totalCalories = caloriesList.reduce((a, b) => a + b, 0);

    for (let i = 0; i < topThreeMax.length; i++) {
        if (totalCalories > topThreeMax[i]) {
            topThreeMax[i] = totalCalories;
            break;
        }
    }

    topThreeMax.sort((a, b) => a - b);
}

console.log(topThreeMax, topThreeMax.reduce((a, b) => a + b, 0));