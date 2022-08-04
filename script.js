const gameboardContainer = document.getElementById('gameboard');

const Gameboard = (() => {
  // create the gameboard
  (() => {
    for (let i = 1; i <= 9; i++) {
      const cell = document.createElement('div');
      cell.setAttribute('class', 'cell');
      cell.setAttribute('data-cell', `${i}`);
      gameboardContainer.appendChild(cell);
    }
  })();
  // click the cells
  gameboardContainer.addEventListener('click', (e) => {
    const markCell = e.target;
    console.log(markCell);
    markCell.classList.add('x');
    markCell.textContent = "X"
  })
})();

