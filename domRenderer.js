const domRenderer = (function() {
    const boardContainer = document.getElementById("board-container");
    
    const _init = function() {
        _createBoard();
        _bindEvents();
    }

    const _createBoard = function() {
        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.column = k;
                cell.addEventListener("click", gameManager.playerAction);
                boardContainer.appendChild(cell);
            }
        }
    }

    const _bindEvents = function() {
        gameEvents.subscribe(MARK_PLACED_EVENT, _renderBoard);
    }

    const _renderBoard = function(boardState) {
        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                let cell = _getCellByIndeces(i,k);
                let content = boardState[i][k];
                cell.innerHTML = content;
            }
        }
    }

    const _getCellByIndeces = function(rowIndex, columnIndex) {
        let returnCell;
        Array.from(boardContainer.getElementsByTagName("div")).forEach(cell => {
            if (cell.dataset.row == rowIndex && cell.dataset.column == columnIndex) {
                returnCell = cell; 
            }
        });
        return returnCell;
    }

    _init();
})();
