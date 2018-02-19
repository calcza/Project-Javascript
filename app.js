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
var diceNo = []

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    goalSet = 100;
    dicevalue = 1; //how many dice
    diceNo = [] //if more than one dice will be put into array

    document.querySelector('.dice').style.display = 'none';

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

//var x = document.querySelector('#score=0').textContent;
// this line uses to read and store in variable x


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        if ( dicevalue > 1 ){
            diceRule();
        } else {
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
    if (diceNo.length > dicevalue) {
        var minus = diceNo.length - dicevalue;
        for (var i = 0; i <= minus; i++) {
            diceNo.pop();
        }
    }
    // if (defaultElem < currentElem){
    //     function(currentElem) {
    //     document.querySelector('.dice').style.display = 'none';
    //
    //     }
    // }
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

}

function diceRule() {
    var OneLoop = true;
    for (var i = 0; i <= dicevalue - 1; ++i) {
        diceNo[i] = Math.floor(Math.random() * 6) + 1;
        console.log("Total dice: " + dicevalue + " dice no. " + i + " rolled: "+ diceNo[i])
        if (diceNo.length <= 2 && OneLoop == true) {
            if (diceNo[i] == 1 || diceNo[i] == 6) {
                if (diceNo[i] == 1) {
                    a++;
                    console.log("A value: " + a)
                } else if (diceNo[i] === 6) {
                    y++;
                    console.log("Y value: " + y)
                }
            }
            if ( a != 3 || y != 3 || a != 2, y != 2 ) {
                roundScore += diceNo[i];
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                console.log("Score: " + roundScore)
            } else {
                console.log("A value: " + a)
                console.log("Y value: " + y)
                a = 1;
                y = 1;
                OneLoop = false;
                setTimeout(nextPlayer, 0000);
                console.log("player " + activePlayer);
                console.log("nextPlayer")
            }
        } else {
            console.log("A value: " + a)
            console.log("Y value: " + y)
            a = 1;
            y = 1;
            OneLoop = false;
            setTimeout(nextPlayer, 0000);
            console.log("player " + activePlayer);
            console.log("nextPlayer")
        }
    }
}

document.querySelector('.btn-new').addEventListener('click', init);

function diceCheck(){

}

function gameOver(){
    document.querySelector('.wrapper').classList.add('gameOver');
    document.querySelector('.active').style.backgroundColor = 'rgba(255,0,0,0.3)';
    document.querySelector('.btn-roll').disabled = true;
    setTimeout(nextPlayer, 1000);

}

// if (dicevalue = 1) {
//     //update the round score IF the rolled number was NOt a 1
//     if (dice !== 1 ) {
//         roundScore  += dice;
//         document.querySelector('#current-' + activePlayer).textContent = roundScore;
//         if(dice === 6){
//             a++;
//             if (a === 3) {
//                 setTimeout(nextPlayer, 0000);
//                 a = 1;
//             }
//         } else {
//             a = 1;
//         }
//     } else {
//         setTimeout(nextPlayer, 0000);
//         a = 1;
//     }
// }
