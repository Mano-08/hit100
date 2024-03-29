window.alert(
  "First player to score 100 wins. Player 1 can press key 'Q' to roll a dice while Player 2 can press key 'P' for the same."
);

let player1s_turn = true;
let player1s_score = 0;
let player2s_score = 0;
const player1_play_button = document.getElementById("player1_play");
const player2_play_button = document.getElementById("player2_play");
const player1_score_ele = document.getElementById("player1_score");
const player2_score_ele = document.getElementById("player2_score");
const play_again_ele = document.getElementById("play_again");
play_again_ele.style.display = "none";

player1_score_ele.innerText = player1s_score;
player2_score_ele.innerText = player2s_score;

const dice_output = document.getElementById("dice_output");
const announcement_ele = document.getElementById("announcement");

function post_win_handler() {
  player2_play_button.style.display = "none";
  player1_play_button.style.display = "none";
  play_again_ele.style.display = "block";
}

function handlePlayAgain() {
  player1s_score = 0;
  player2s_score = 0;
  dice_output.innerText = "";
  announcement_ele.innerHTML = "";
  player1_score_ele.innerText = player1s_score;
  player2_score_ele.innerText = player2s_score;
  player2_play_button.style.display = "block";
  player1_play_button.style.display = "block";
  play_again_ele.style.display = "none";
}

function handlePlay(player) {

  if (player1s_score === 100 || player2s_score === 100) {
    return;
  }
  
  announcement_ele.innerHTML = "";

  if (player === "player1") {
    if (!player1s_turn) {
      announcement_ele.innerHTML =
        "<span id='warning'>!! Player 2's  turn</span>";
      return;
    }

    const dice_roll_value = Math.ceil(Math.random() * 6);
    dice_output.innerText = dice_roll_value;
    player1s_turn = false;
    if (player1s_score + dice_roll_value > 100) {
      return;
    } else if (player1s_score + dice_roll_value == 100) {
      announcement_ele.innerHTML =
        "<span id='celebration'>Player 1 WON!</span>";
      post_win_handler();
    }
    player1s_score += dice_roll_value;
    player1_score_ele.innerText = player1s_score;
  } else {
    if (player1s_turn) {
      announcement_ele.innerHTML =
        "<span id='warning'>!! Player 1's  turn</span>";
      return;
    }

    const dice_roll_value = Math.ceil(Math.random() * 6);
    dice_output.innerText = dice_roll_value;
    player1s_turn = true;
    if (player2s_score + dice_roll_value > 100) {
      return;
    } else if (player2s_score + dice_roll_value == 100) {
      announcement_ele.innerHTML =
        "<span id='celebration'>Player 2 WON!</span>";

      post_win_handler();
    }
    player2s_score += dice_roll_value;
    player2_score_ele.innerText = player2s_score;
  }
}

function handleKeyDown(e) {
  if (e.keyCode === 81) {
    handlePlay("player1");
  } else if (e.keyCode === 80) {
    handlePlay("player2");
  }
}

player1_play_button.addEventListener("click", () => handlePlay("player1"));
player2_play_button.addEventListener("click", () => handlePlay("player2"));
document.addEventListener("keydown", (e) => handleKeyDown(e));
play_again_ele.addEventListener("click", () => handlePlayAgain());
