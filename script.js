'use strict';
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

let names = prompt('Meno hráčov');
names = names.split(' ');
name0.textContent = names[0];
name1.textContent = names[1];

let randomRollValue = 0;
let activePlayer = 0;
let currentScore = 0;
let holdScore = 0;

score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

const newGame = () => {
  currentScore = 0;
  holdScore = 0;

  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add('hidden');
  if (player0.classList.contains('player--active')) return;
  switchPlayers();
};

const switchPlayers = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

const rollDice = () => {
  randomRollValue = Math.trunc(Math.random() * 6) + 1;

  dice.classList.remove('hidden');
  dice.src = `dice-${randomRollValue}.png`;

  if (randomRollValue === 1) {
    switchPlayers();
    holdScore =
      1 * document.querySelector(`#score--${activePlayer}`).textContent;

    return (currentScore = 0);
  }

  currentScore += randomRollValue;
  document.querySelector(
    `#current--${activePlayer}`
  ).textContent = currentScore;
};

const holdPoints = () => {
  holdScore +=
    1 * document.querySelector(`#current--${activePlayer}`).textContent;
  document.querySelector(`#score--${activePlayer}`).textContent = holdScore;
  currentScore = 0;
  if (holdScore >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
  }
  switchPlayers();
  holdScore = 1 * document.querySelector(`#score--${activePlayer}`).textContent;
};

rollDiceBtn.addEventListener('click', () => {
  rollDice();
});

holdBtn.addEventListener('click', () => {
  holdPoints();
});

newGameBtn.addEventListener('click', () => {
  newGame();
});
