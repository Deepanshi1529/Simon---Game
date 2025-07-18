
let buttonColours =["red","blue","green","yellow"];
let gamePattern =[];
let userClickedPattern=[];

let level = 0;
let started = false;

$(document).keydown(function(){

    if(!started){
       
       $("#level-title").html("Level "+ level);
       nextSequence();
       started =true;

    }
});

$(".btn").click(function(){
           
        let useChosenColour = $(this).attr("id");
        
        userClickedPattern.push(useChosenColour);

        checkAnswer(userClickedPattern.length-1);

        playSound(useChosenColour);
        animatePress(useChosenColour);
    });

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
          
           console.log("success");
    
       if(gamePattern.length === userClickedPattern.length){

        setTimeout(function(){ nextSequence();},1000); }

        
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");},200
        );

        $("#level-title").html("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver(){

    level = 0;
    gamePattern =[];
    started =false;

}

function nextSequence(){

    userClickedPattern =[];

    level++;

    $("#level-title").html("Level "+ level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

     

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

    
}

function playSound(name){

    let audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();

   
}

function animatePress(currentColour){

     $("#" + currentColour).addClass("pressed");

     setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");},100);
}


