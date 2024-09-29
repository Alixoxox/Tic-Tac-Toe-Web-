const patterns = [
  [0, 1, 2],
  [0, 4, 8],
  [2, 5, 8],
  [0, 3, 6],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [2, 4, 6],
];

const boxes = document.querySelectorAll(".btn");
const reset_btn = document.querySelector("#reset");
let win_pg = document.querySelector("#winner_pg");
let play = document.querySelector("#play");
let turnO = true;
game_start_music()
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      place_item_music();
      box.innerText = "O";
      turnO = false;
    } else {
      place_item_music();
      turnO = true;
      box.innerText = "X";
    }
    box.disabled = true;
    checkwinner();
  });
});

const reset = () => {
  reset_btn.addEventListener("click", () => {
    boxes.forEach((box) => {
      box.disabled = false; // Enable all the boxes
      box.innerText = ""; // Clear the content of each box
    });
    document.querySelector(".winner_data").classList.add("hidden");
    turnO = true;
    game_start_music()
  });
};
const disable_box = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const show_results = (result, player) => {
  if (player===null){
    win_pg.innerText = `${result}`;
  }else{
    win_pg.innerText = `${result} ${player}`;
  }
  document.querySelector(".winner_data").classList.remove("hidden");
};


// sound functions
function play_win_music(){
  let audio=new Audio("victory.mp3");
  audio.play();
}
function place_item_music(){
  let audio=new Audio("place_on_board.mp3");
  audio.play();
}
function game_start_music(){
  let audio=new Audio("game_start.mp3");
  audio.play();
}
function game_over_music(){
  let audio = new Audio("game_over.mp3");
  audio.play();
}


const checkwinner = () => {
  let isdraw = true;
  let win = null;
  //check winner
  for (let pattern of patterns) {
    let pval1 = boxes[pattern[0]].innerText;
    let pval2 = boxes[pattern[1]].innerText;
    let pval3 = boxes[pattern[2]].innerText;
    if (pval1 != "" && pval2 != "" && pval3 != "") {
      if (pval1 === pval2 && pval2 === pval3) {
        console.log("You win", pval1);
        win = true;
        disable_box();
        show_results(
          "Winner!! \nCongratulation's The Winner is : \n Player",
          pval1);
          play_win_music();
        break;
      }
    }
  }

  if (!win) {
    for (let box of boxes) {
      if (box.innerText === "") {
        isdraw = false; // There is still an empty box, so it's not a draw
        break;
      }
    }

    if (isdraw) {
      game_over_music();
      console.log("It's a draw");
      disable_box();
      show_results("Ohh no!! \nIts a draw\nBetter Luck Next Time", null);
    }
  }
};

reset();
