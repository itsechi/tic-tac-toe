const gameboardContainer = document.getElementById("gameboard");


  // create the gameboard
const Gameboard = (() => {
  const gameboardArr = [];

  (() => {
    for (let i = 1; i <= 9; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("data-cell", `${i}`);
      gameboardContainer.appendChild(cell);
      gameboardArr.push(cell);
    }
  })();

  return { gameboardArr };
})();


// player factory 
const Player = (sign) => {
  
  const playerSign = sign;
  let activePlayer = false;
  function mark(element) {
    element.classList.add(playerSign);
    element.textContent = playerSign;
  }
  return { activePlayer, mark };
};



const Game = (() => {
  // create players
  const playerX = Player("X");
  const playerO = Player("O");
  
  // function to switch turns
  function switchTurns(player) {
    player.activePlayer = !player.activePlayer;
  }
  switchTurns(playerX);

  // click the cells
  gameboardContainer.addEventListener("click", (e) => {
    // mark only if a cell is empty
    if (e.target.classList.contains("X") || e.target.classList.contains("O")) {
      return;
    }

    // mark cell
    if (e.target.classList.contains("cell")) {
      const markCell = e.target;
      if (playerX.activePlayer) {
        playerX.mark(markCell);
        switchTurns(playerX);
        switchTurns(playerO);
      } else if (playerO.activePlayer) {
        playerO.mark(markCell);
        switchTurns(playerO);
        switchTurns(playerX);
      }
      console.log(markCell);
    }
  });
})();