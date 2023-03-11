"use script";

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");
const currentScoreEl = document.querySelector(".current-score");
const current0El = document.querySelector(".current--0");
const current1El = document.querySelector(".current--1");
const player0 = document.querySelector(".player-active");
const player1 = document.querySelector(".player-1-bg-color");
const wonEl = document.querySelector(".won");
const closeBtn = document.querySelector(".close-btn");
const gameInstEl = document.querySelector(".game-instructions");
const overlay = document.querySelector(".overlay");
const clickHere = document.querySelector(".click-here");
const playerScore0 = document.querySelector(".player-score-0");
const playerScore1 = document.querySelector(".player-score-1");

let activePlayer, currentScore, playing, scores;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  scores = [0, 0];
  player0.style.backgroundColor = "#ffdeeb";
  player1.style.backgroundColor = "#faa2c1";
  diceEl.classList.add("hidden");
  overlay.classList.remove("hidden");
  clickHere.classList.remove("hidden");
  playerScore0.textContent = 0;
  playerScore1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
};
init();
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`.current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    player0.style.backgroundColor = "#ffdeeb";
    player1.style.backgroundColor = "#faa2c1";
  } else {
    player0.style.backgroundColor = "#faa2c1";
    player1.style.backgroundColor = "#ffdeeb";
  }
};
btnRoll.addEventListener("click", function () {
  if (playing) {
    diceEl.classList.remove("hidden");
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore = dice + currentScore;
      document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`scores--${activePlayer}`).textContent =
      scores[activePlayer];
    document.querySelector(`.current--${activePlayer}`).textContent = 0;
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(`.player-${activePlayer}`).style.backgroundColor =
        "#2f2f2f";
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

closeBtn.addEventListener("click", function () {
  gameInstEl.classList.add("hidden");
  overlay.classList.add("hidden");
  clickHere.classList.add("hidden");
});

clickHere.addEventListener("click", function () {
  gameInstEl.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnNew.addEventListener("click", init);
