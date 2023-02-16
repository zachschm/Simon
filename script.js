
let userClickedPattern = [];

let gamePattern = [];

let level = 0;

let game_is_on = false;


/*
function process_click()
{
    $("div,button").on("click", function ()
    {
        let btn_color = this.id;
        if (btn_color)
            userClickedPattern.push(btn_color);
        playSound(btn_color);
        animate_pressed_btn(btn_color);
        check_answer();
    });

}
*/


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

function hide_restart()
{
    $("#game-over").hide();
}

function show_restart()
{
    $("#game-over").show();
}

function game_over()
{
    game_is_on = false;
    $("#level-title").text("... Game Over ...");
    show_restart();
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(document).on("keypress", function ()
    {
        play_game();
    });

}

function check_answer()
{
    let test = true;
        for (let i = 0; i < userClickedPattern.length; i++) {
            if (userClickedPattern[i] !== gamePattern[i]) {
                test = false;
                game_over();
                break;
            }
            if (test === true && i === level - 1)
                nextSequence();
        }

}


function update_scoreboard()
{
    $("#level-title").text("Level: " + level);
}

function animate_pressed_btn(color)
{
    $("#" + color).addClass("pressed");
    setTimeout(function ()
    {
        $("#" + color).removeClass("pressed");
    }, 100);
}

let buttonColors = ["red", "blue", "green", "yellow"];

function playSound(sound)
{
    let a = new Audio("sounds/" + sound + ".mp3");
    a.play();
}

function nextSequence()
{
    let randColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randColor);

    $("#" + randColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randColor);
    level++;
    update_scoreboard();
    userClickedPattern = [];

}


play_game();

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
/*
for (let i = 0; i < 4; i++)
{
    console.log(buttonColors[i]);
}
 */







