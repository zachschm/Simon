

let gamePattern = [];


let buttonColors = ["red", "blue", "green", "yellow"];
function nextSequence()
{
    let randColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randColor);

    $("#" + randColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio("sounds/" + randColor + ".mp3");
    audio.play();
}

/*
for (let i = 0; i < 4; i++)
{
    console.log(buttonColors[i]);
}
 */


for (let i = 0; i < gamePattern.length; i++)
{
    console.log(gamePattern[i]);
}

nextSequence();