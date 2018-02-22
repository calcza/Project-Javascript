/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Dom : Document Object Model;
/* Structured represetation of an HTML document;
The DOM is used to connect webpages to scripts like JavaScript;

*/

var scores, roundScore, activePlayer, dice, gamePlaying, goalSet, dicevalue;

init();

var a = 1;
var y = 1;
var z = 1;
var x = 1;
var diceNo = []
var combo = 10;
var combo2 = 7;

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    goalSet = 100;
    dicevalue = 1; //how many dice
    document.getElementById("panel").value = 1;
    diceNo = [] //if more than one dice will be put into array
    a = 1;
    y = 1;
    z = 1;
    x = 1;
    combo = 10;
    combo2 = 7;

    document.querySelector('.dice').style.display = 'none';
    diceDisplay();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//==================================
// document.querySelector('#score-0').textContent = dice;
// querySelector = to manipulate value and element of our webpage, can be use to read webpage
//document.querySelector('#current-' + activePlayer).textContent = dice;
// textContent = read it as normal text
// # for id in html format and . for class in html format

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
// innerHTML = read html txt, em = itallic text
//==================================

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        if ( dicevalue > 1 ){
            diceRolls();
        } else {
            document.querySelector('.dice').style.left = "50%";
            document.querySelector('.dice').style.top = "220px";
            document.querySelector('.dice').style.height = "100px";
            //random number
            dice = Math.floor(Math.random() * 6) + 1;
            // display the result
            var diceDom = document.querySelector('.dice');
            diceDom.style.display = 'block';
            diceDom.src = 'dice-' + dice + '.png';
            if (dice !== 1 ) {
                roundScore  += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                //update the round score IF the rolled number was NOt a 1
                if(dice === 6){
                    a++;
                    if (a === 3) {
                        gameOver();
                        a = 1;
                    }
                } else {
                    a = 1;
                }
            } else {
                gameOver();
                // setTimeout(nextPlayer, 0000);
                a = 1;
            }
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //Add current score to global source
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= goalSet) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display ='none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.limiter').addEventListener('click', function() {
    var limit = document.querySelector('.scoreLimiter').value;
    var letters = /^[A-Za-z]+$/; //alphabets 24 character a-z
    if ( isNaN(limit) ) {
        alert("Input Numeric Only");
        document.querySelector('.scoreLimiter').value = '';
    } else {
        goalSet = limit;
        document.querySelector('.centertext').textContent = 'First to ' + limit + ' wins';
        document.querySelector('.scoreLimiter').value = '';

    }
});

document.querySelector('.dices').addEventListener('click', function(){
    //document.getElementById("panel").style.display = "block";
    var elem = document.querySelector('.slider');
    elem.classList.toggle('show');
    if (elem.style.visibility === "hidden") {
        elem.style.visibility = "visible";
    } else {
        elem.style.visibility = "hidden";
    }
});

document.querySelector('.rules').addEventListener('click', function(){
    var popup = document.querySelector('.popuptext');
    popup.classList.toggle('show');
});

document.querySelector('.slider').addEventListener('mousemove', function(){
    var elem = document.getElementById("panel");
    var defaultElem = elem.defaultValue;
    var currentElem = elem.value;
    dicevalue = currentElem;
    diceDisplay();
    if (diceNo.length > dicevalue) {
        var minus = diceNo.length - dicevalue;
        for (var i = 0; i <= minus; i++) {
            diceNo.pop();
        }
    }

});

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    /*
    if (activePlayer === 0 ) {
        activeplayer = 1;
    } else {
        activePlayer = 0;
    }
    */
    roundScore = 0;
    document.querySelector('.btn-roll').disabled = false;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //remove active  class from player
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.active').style.backgroundColor = '#FFFFFF'
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.active').style.backgroundColor = '#F7F7F7'
    document.querySelector('.wrapper').classList.remove('gameOver');

    document.querySelector('.dice').style.display = 'none';
    diceDisplay();
}

function diceRolls() {
    combo = dicevalue * 6;//ensure no same amount ever created with combo and combo2
    combo2 = dicevalue * 5; //ensure no same amount ever created with combo and combo2
    a = 1;
    y = 1;
    z = 1; //counter for a + y
    x = 1;
    for (var i = 0; i <= dicevalue - 1; ++i) {
        diceNo[i] = Math.floor(Math.random() * 6) + 1;
        console.log("Total dice: " + dicevalue + " dice no. " + i + " rolled: "+ diceNo[i])
        var order = 'dicey' + i;
        var diceDis = []
        diceDis[i] = document.getElementById(order);
        diceDis[i].style.display = 'block';
        diceDis[i].style.height = "70px";
        if ( i == 0 ) { //adjust the dices position
            if ( i == 0 && dicevalue == 1){
                diceDis[i].style.height = "100px";
            } else if (i == 0 && dicevalue == 2){
                diceDis[i].style.height = "85px";
                diceDis[i].style.top = "240px";
                diceDis[i].style.left = "45%";
            } else if (i == 0 && dicevalue > 2){
                diceDis[i].style.height = "70px";
                diceDis[i].style.top = "210px";
                diceDis[i].style.left = "45%";
            }
        } else if ( i == 1 ) {
            if ( i == 1 && dicevalue == 2) {
                diceDis[i].style.height = "85px";
                diceDis[i].style.top = "240px";
                diceDis[i].style.left = "55%";
            } else if (i == 1 && dicevalue > 2){
                diceDis[i].style.height = "70px";
                diceDis[i].style.top = "210px";
                diceDis[i].style.left = "55%";
            }
        } else if ( i == 2 && dicevalue >= 3){
            diceDis[i].style.height = "70px";
            diceDis[i].style.top = "290px";
            diceDis[i].style.left = "50%";
            if ( dicevalue == 4) {
                diceDis[i].style.left = "45%";
            }
        }
        diceDis[i].src = 'dice-' + diceNo[i] + '.png';
        checkDice(i);
    }
}

document.querySelector('.btn-new').addEventListener('click', init);

function gameOver(){
    document.querySelector('.wrapper').classList.add('gameOver');
    document.querySelector('.active').style.backgroundColor = 'rgba(255,0,0,0.3)';
    document.querySelector('.btn-roll').disabled = true;
    setTimeout(nextPlayer, 1000);
}

function diceDisplay(){
    document.querySelector('.dice').style.display = 'block';
    for (var i = 0; i <= 4; ++i){
        var order = 'dicey' + i;
        var diceDom = document.getElementById(order);
        diceDom.style.display = 'none';
    }
}

function checkDice(i){
    var diceOrder = [] //order of the dice to use with combo, combo2
    if ( i % 2 == 0){
        combo2 = diceNo[i]; //store even dice
        console.log("Combo 2: " + combo2);
    } else if (i % 2 == 1){
        combo = diceNo[i]; //store odd dice
        console.log("Combo : " + combo);
    }
    if (diceNo[i] == 1 || diceNo[i] == 6) {
        if (diceNo[i] == 1) {
            a++;
            z++;
        } else if (diceNo[i] === 6) {
            y++;
            z++;
        }
    } else if (i % 2 === 0 && combo2 !== diceNo[i] && i !== 0) {
        x++; //check for same value for odd dices e.g. dice 1 and dice 3 is the same value or not
        console.log("Loop through here 1");
    } else if (i % 2 == 1 && combo == diceNo[i] && i !== 1) {
        x++; //check for same value for even dices (incase for 4 or more dices)
        console.log("Loop through here 2");
    } else if (i % 2 == 1 && combo2 == diceNo[i] && dicevalue == 2) {
        x++; //for two dices play
        console.log("Loop through here 3");
    } else if (dicevalue == 3 && combo2 == diceNo[0] && combo2 == combo){
        x++;
        console.log("Loop through here 4");
    }
    diceCheck(i);
    console.log("------END COMBO-------")
    console.log("Combo : " + combo);
    console.log("Combo 2: " + combo2);
    console.log("---------------------")
    // if ( i % 2 == 0){
    //     combo2 = diceNo[i]; //store even dice
    //     console.log(combo2);
    // } else if (i % 2 == 1){
    //     combo = diceNo[i]; //store odd dice
    //     console.log(combo);
    // }
}

function diceCheck(i){
    var OneLoop = true; //protecting against multiple loop
    if (dicevalue % 2 == 0 && OneLoop == true) {
        var b = [3,3,3,2] //Counter against var a,y,z,x
        if (dicevalue > 2) {
            b = [4,4,4,3]
        }
        if ( a <= b[0] && y <= b[1] && z <= b[2] && x !== b[3] && (x + z !== 5)) {
            roundScore += diceNo[i];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            console.log("A value: " + a);
            console.log("Y value: " + y);
            console.log("Z value: " + z);
            console.log("X value: " + x);
            OneLoop = false; //protecting against multiple loop
            gameOver();
        }
    } else if (dicevalue % 2 == 1 && OneLoop == true) {
        var b = [3,3,4,2] //Counter against var a,y,z,x
        if (dicevalue > 2) {
            b = [4,4,4,2]
        }
        if ( a !== b[0] && y !== b[1] && z !== b[2] && x !== b[3] && (x + z !== 5) && (a + y !== 5)) {
            roundScore += diceNo[i];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            console.log("A value: " + a);
            console.log("Y value: " + y);
            console.log("Z value: " + z);
            console.log("X value: " + x);
            OneLoop = false; //protecting against multiple loop
            gameOver();
        }
    } else {
        OneLoop = false;
        gameOver();
    }
}
