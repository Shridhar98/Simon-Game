
var gamePattern = [];

var userClickedPattern = [];

var flag = false;
var level = 0;

var buttonColors = ["red" , "blue" , "green" , "yellow"];

$(document).keypress(function(){
    if(!flag ){
        $("#level-title").text("Level" + level);
        nextSequence();
        flag = true;
    }    
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
 
})

function checkAnswer(currentlevel){

    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            } , 1000);
        }
    }
    else{
        playSound("wrong");
        
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        } , 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }

}

function startover(){
    level = 0;
    gamePattern = [];
    flag = false;
}

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level" + level);


    var randomNumber = Math.floor(Math.random() * 4)  ;
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}


function playSound(name){
    var audio  = new Audio("sounds/" +  name + ".mp3");
    audio.play();
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    } , 100)
}
