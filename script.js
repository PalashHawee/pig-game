'use strict';
const score0El = document.querySelector('#score--0');
//Selecting for changing the background color of Active Player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//Works as same as querySelector except wiritng the "#" sign this time
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//function for resetting the game
const init = () => {
  //Starting Conditions
  score0El.textContent = 0;
  score1El.textContent = 0;

  //Defining variable for storing current Score
  currentScore = 0;
  //Defining array for holding the state of two players
  scores = [0, 0];
  //Suppose Active Player is 0 initially
  activePlayer = 0;

  //Setting status for playing till game wins
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//Switching Player Function
const swithPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice Funcrtionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice according to the dice images
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // format= dice-1.png (src property for image source)
    //Check for rolled 1:
    if (dice !== 1) {
      //Add dice to current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      // Set the current Player Score 0 before moving to next player
      //Switch to Next player
      swithPlayer();
    }
  }
});

//Adding Functionality for holding button
btnHold.addEventListener('click', () => {
  if (playing) {
    //1. Add Current Score to Active Player's score
    scores[activePlayer] += currentScore;
    //score[1]=score[1]+currentScore

    //Display the total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score >=100
    if (scores[activePlayer] >= 50) {
      playing = false;

      //Adding hidden class again to hide the display of dice when wins
      diceEl.classList.add('hidden');

      //Player wins the Game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      swithPlayer();
    }
  }
});

//Refreshing the game
btnNew.addEventListener('click', init);
