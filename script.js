// holds the game decided color sequence
let userClickedPattern = [];

// holds the users decided color based on mouse input
let gamePattern = [];

// Keeps track of how many levels have been passed, helps our for loops for color validation as well
let level = 0;

// ensures mouse and keyboard input are only being recorded at the proper times which keeps many bugs out of the system
let game_is_on = false;

// basic four button colors in our program
let buttonColors = ["red", "blue", "green", "yellow"];

// Starts our entire game by cascading various function calls
function play_game()
{
    hide_restart();
    $(document).on("keypress", function ()
    {
        if (game_is_on === false)
            nextSequence();
        game_is_on = true;

    });


}

// In the program, we have an h3 that tells the user to enter any key to restart. This h3, however, should only
// be made visible when the player loses in the game. So, we need to be able to hide and show this h3 when needed.
// hides the h3
function hide_restart()
{
    $("#game-over").hide();
    $("body").removeClass("game-over");
}

// shows the hidden game over h3
function show_restart()
{
    $("#game-over").show();
    $("body").addClass("game-over");
}

// When the player loses, there are many variables that need to be reset in order for the game to run properly,
// this function handles the task of starting a new slate if the player wishes to continue playing.
function game_over()
{
    // sets game to false to disallow mouse input recording
    game_is_on = false;
    // Changes the level message to game over to signify a loss
    $("#level-title").text("... Game Over ...");
    show_restart();
    // resets level
    level = 0;
    // resets the correct pattern and the user pattern
    gamePattern = [];
    userClickedPattern = [];
    // creates an event listener that will trigger the start of a new game if the user desires to continue playing
    $(document).on("keypress", function ()
    {
        play_game();
    });

}

function check_answer()
{
    // boolean to allow us to test if every single color is correct
    let test = true;
        // we use the .length to ensure a properly ranged for loop every time, especially since the size of both the
        // user and computer colors will be changing every time.
        for (let i = 0; i < userClickedPattern.length; i++) {
            // simple if statement to ensure each color is correct and in proper order
            if (userClickedPattern[i] !== gamePattern[i]) {
                test = false;
                game_over();
                break;
            }
            // if the user has passed each color successfully, we call for the program to select the next color
            if (test === true && i === level - 1)
                nextSequence();
        }

}

// Updates the level of the scoreboard
function update_scoreboard()
{
    $("#level-title").text("Level: " + level);
}

// Allows the user to receive confirmation that the computer has processed their click
function animate_pressed_btn(color)
{
    $("#" + color).addClass("pressed");
    setTimeout(function ()
    {
        $("#" + color).removeClass("pressed");
    }, 100);
}

// plays passed sound file
function playSound(sound)
{
    let a = new Audio("sounds/" + sound + ".mp3");
    a.play();
}

// Randomly selects the next button color for the sequence and adds that color into th game color array
function nextSequence()
{
    let randColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randColor);

    // animation to allow the user to see which color the computer has selected, a flickering animation
    $("#" + randColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randColor);
    level++;
    update_scoreboard();
    userClickedPattern = [];

}


play_game();

    // Creates event listener for our user clicks to store which color they are choosing. Based on the user's input
    // the correct audio file is played, the selected color is added to user color array, and their selection is
    // checked against the official computer color sequence
    $("div,button").on("click", function () {
        if(game_is_on === true) {
            let btn_color = this.id;
            if (btn_color)
                userClickedPattern.push(btn_color);
            playSound(btn_color);
            animate_pressed_btn(btn_color);
            check_answer();
        }
    });








