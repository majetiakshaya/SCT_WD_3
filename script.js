const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const human = "X";
const computer = "O";

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", playerMove);
});

restartBtn.addEventListener("click", restartGame);

function playerMove() {

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = human;
    this.textContent = human;

    if(checkWinner(human)){
        statusText.textContent = "🎉 You Win!";
        gameActive = false;
        return;
    }

    if(board.every(cell => cell !== "")){
        statusText.textContent = "🤝 Match Draw!";
        gameActive = false;
        return;
    }

    statusText.textContent = "Computer's Turn...";

    setTimeout(computerMove,500);
}

function computerMove(){

    let emptyCells = [];

    board.forEach((value,index)=>{
        if(value===""){
            emptyCells.push(index);
        }
    });

    if(emptyCells.length===0) return;

    let randomIndex = emptyCells[Math.floor(Math.random()*emptyCells.length)];

    board[randomIndex]=computer;

    cells[randomIndex].textContent=computer;

    if(checkWinner(computer)){
        statusText.textContent="💻 Computer Wins!";
        gameActive=false;
        return;
    }

    if(board.every(cell=>cell!="")){
        statusText.textContent="🤝 Match Draw!";
        gameActive=false;
        return;
    }

    statusText.textContent="Your Turn";
}

function checkWinner(player){

    return winPatterns.some(pattern=>{
        return pattern.every(index=>board[index]===player);
    });

}

function restartGame(){

    board=["","","","","","","","",""];

    gameActive=true;

    statusText.textContent="Your Turn";

    cells.forEach(cell=>{
        cell.textContent="";
    });

}