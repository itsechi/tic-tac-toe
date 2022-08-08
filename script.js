'use strict';
const gameboardContainer = document.getElementById('gameboard');

// create the gameboard
const Gameboard = (() => {
  const gameboardArr = [];

  const createBoard = () => {
    for (let i = 1; i <= 9; i++) {
      const cell = document.createElement('div');
      cell.setAttribute('class', 'cell');
      cell.setAttribute('data-cell', `${i}`);
      gameboardContainer.appendChild(cell);
      gameboardArr.push(cell);
    }
  };
  createBoard();
  return { gameboardArr, createBoard };
})();

// player factory
const Player = sign => {
  const playerSign = sign;
  let activePlayer = false;
  function mark(element) {
    element.classList.add(playerSign);
    element.textContent = playerSign;
  }
  return { activePlayer, mark };
};

const Game = (() => {
  const playerX = Player('X');
  const playerO = Player('O');
  const overlay = document.getElementById('overlay');
  const endGameModal = document.getElementById('endGameModal');
  const endGameMessage = document.getElementById('endGameMessage');
  const endGameBtn = document.getElementById('endGameBtn');
  const slider = document.querySelector('.slider');
  const playerXActiveSlider = document.querySelector('.player-X');
  const playerOActiveSlider = document.querySelector('.player-O');
  const vsPlayerBtn = document.getElementById('vsPlayer');
  const vsComputerBtn = document.getElementById('vsComputer');
  const startGameModal = document.getElementById('startGameModal');
  let gamemode;
  let won;

  vsPlayerBtn.addEventListener('click', () => {
    startGame('player');
  });

  vsComputerBtn.addEventListener('click', () => {
    startGame('bot');
  });

  function startGame(name) {
    startGameModal.classList.add('hidden');
    gamemode = name;
  }

  // function to switch turns
  function switchTurns(player) {
    player.activePlayer = !player.activePlayer;
  }
  switchTurns(playerX);

  // make the slider move and change colors
  function changeActiveSlider() {
    slider.classList.toggle('O');
    playerXActiveSlider.classList.toggle('active');
    playerOActiveSlider.classList.toggle('active');
  }

  // click the cells
  gameboardContainer.addEventListener('click', e => {
    // mark only if a cell is empty
    if (e.target.classList.contains('X') || e.target.classList.contains('O')) {
      return;
    }

    // mark cell
    if (e.target.classList.contains('cell')) {
      const markCell = e.target;

      if (playerX.activePlayer) {
        playerX.mark(markCell);
        switchTurns(playerX);
        switchTurns(playerO);
        changeActiveSlider();
        checkWin('X');
        if (gamemode === 'bot' && !won) {
          setTimeout(botPlay, 300);
        }
      } else if (playerO.activePlayer) {
        playerO.mark(markCell);
        switchTurns(playerO);
        switchTurns(playerX);
        changeActiveSlider();
        checkWin('O');
      }

      // bot function
      function botPlay() {
        const cells = gameboardContainer.querySelectorAll('.cell');
        let emptyCells = [];
        cells.forEach(cell => {
          if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
            emptyCells.push(cell);
          }
        });
        console.log(emptyCells);
        const randomCell = Math.floor(Math.random() * emptyCells.length);
        const markCellBot = emptyCells[randomCell];
        playerO.mark(markCellBot);
        switchTurns(playerO);
        switchTurns(playerX);
        changeActiveSlider();
        checkWin('O');
      }
    }
  });

  function checkWin(sign) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    won = winningCombinations.some(combination => {
      return combination.every(i => {
        return Gameboard.gameboardArr[i].classList.contains(sign);
      });
    });
    if (won) {
      overlay.classList.toggle('hidden');
      endGameModal.classList.toggle('hidden');
      endGameMessage.textContent = `Player ${sign} has won!`;
    }
    const draw = Gameboard.gameboardArr.every(cell => cell.textContent != '');
    if (draw && !won) {
      overlay.classList.toggle('hidden');
      endGameModal.classList.toggle('hidden');
      endGameMessage.textContent = `It's a tie!`;
    }
    return { won };
  }

  endGameBtn.addEventListener('click', restartGame);
  function restartGame() {
    Gameboard.gameboardArr.forEach(cell => {
      cell.classList.remove('X');
      cell.classList.remove('O');
      cell.textContent = '';
    });
    overlay.classList.toggle('hidden');
    endGameModal.classList.toggle('hidden');
    slider.classList.remove('O');
    playerXActiveSlider.classList.add('active');
    playerOActiveSlider.classList.remove('active');
    playerX.activePlayer = true;
    playerO.activePlayer = false;
  }
})();
