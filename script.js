// Declaring game variables
var scores, roundScore, activePlayer, prevDiceRoll, gamePlaying;

// Initilizing the game 
init();

document.querySelector('.btn-roll').addEventListener('click', function () {

  if (gamePlaying) {

    // Create two random numbers for the dices
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // Display the results
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
    
    // Checking if the player rolls a 6 two times in a row
    if(dice1 === 6 && prevDiceRoll === 6) {
      
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer(); 
    } else if (dice1 !== 1 && dice2 !== 1) {
       
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        
        nextPlayer();
    }

    prevDiceRoll = dice1;

  }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {

    scores[activePlayer] += roundScore;

     
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Checking if the winning score is the predefined of 100 or if an user has set a specific goal 
    // Saving the final score input in a variable 
    var input = document.getElementById('winningScore').value;
    var winningScore;

    // Undefined, 0, null or "" are coerced to false, anything else is coerced to true
    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Checking if the player won the game
    if (scores[activePlayer] >= winningScore) {
 

      // Changing the name of the player to 'Winner!'
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

      // Hiding the dices
      document.getElementById('dice1').style.display = 'none';
      document.getElementById('dice2').style.display = 'none';

     
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

       
      gamePlaying = false;
      

    } else {

      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);


function init() {

  gamePlaying = true;

  scores = [0, 0];

  activePlayer = 0;

  roundScore = 0;

  // Hiding the dices right from the beggining of the game
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Removing the 'winner status' from the winning player
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  // Removing the 'active status' from the winning player 
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // Make sure that the 'active status' from 'Player 2' is removed and given to 'Player 1'  
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

// Function to giving the turn to the next player
function nextPlayer() {

  // It's the next player's turn if the dice number is 1 (using the ternary operator)
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  // Setting the roundScore back to 0
  roundScore = 0;

  // Setting the current score back to 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Adding the active class to the player who has the turn now
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // Hiding the dice after the active player changes 
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

}