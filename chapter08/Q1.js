//elements that form a sentence
let adjectives = ["pretty", "", "", "strong", "fast", "tall", "fat", "skinny"];
let sustantives = ["The rabbit", "John", "The dog", "The cat", "The firefighter", "The matematician", "The ladybug", "Emma"];
let verbs = ["plays", "runs", "sings", "jumps", "fights", "flies", "tries", "screams", "digs"];
let adverbs = ["", "so hard", "joyfully", "pretty quickly", "euphoric", "intensively"];

//choses one random element from a list
function randomChoice(array) {
    return array[Math.floor(Math.random()*array.length)];
}

//prints a random sentence
function randomSentence() {
    let sustantive = randomChoice(sustantives).split(" ");
    let sentence = sustantive[0] + " ";
    if (sustantive.length == 2) {
        let adjective = randomChoice(adjectives);
        sentence += adjective + (adjective ? " " : "");
        sentence += sustantive[1] + " ";
    }
    sentence += randomChoice(verbs);
    sentence += " " + randomChoice(adverbs);
    console.log(sentence);
}

function randomSentenceEveryMinute() {
    setInterval(randomSentenceInter, 1000*60);
}

randomSentenceEveryMinute();
