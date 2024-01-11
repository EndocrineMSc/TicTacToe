const domRenderer = (function() {
    const boardContainer = document.getElementById("board-container");
    const resetButton = document.getElementById("reset-button");
    const winBannerContainer = document.getElementById("win-banner-container");
    let winBanner = winBannerContainer.firstElementChild;
    let gameCells = [];
    
    const _init = function() {
        _createBoard();
        _bindEvents();
        _hideWinBanner();
    }

    const _createBoard = function() {
        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.column = k;
                boardContainer.appendChild(cell);
            }
        }
        gameCells = Array.from(boardContainer.getElementsByTagName("div"))
        _addClickListeners(false);
    }

    const _bindEvents = function() {
        gameEvents.subscribe(MARK_PLACED_EVENT, _renderBoard);
        gameEvents.subscribe(LOCK_EVENT, _removeClickListeners);
        resetButton.addEventListener("click", () => gameEvents.invoke(RESTART_EVENT));
        gameEvents.subscribe(RESTART_EVENT, _hideWinBanner);
        gameEvents.subscribe(GAME_OVER_EVENT, _setWinBanner);
    }

    const _renderBoard = function(boardState) {
        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                let cell = _getCellByIndeces(i,k);
                let content = boardState[i][k];
                cell.innerHTML = content;
            }
        }
        gameEvents.invoke(TURN_FINISHED_EVENT);
    }

    const _hideWinBanner = function() {
        winBannerContainer.setAttribute("hidden", "true");
    }

    const _setWinBanner = function(marker) {
        winBannerContainer.removeAttribute("hidden");
        switch (marker) {
            case "O":
                winBanner.textContent = "PC won!"
                break;
            case "X":
                winBanner.textContent = "You won!"
                break;
            case "draw":
                winBanner.textContent = "Draw!"         
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

    const _addClickListeners = function() {
        gameCells.forEach(cell => {
            cell.addEventListener("click", gameManager.handlePlayerActions);
        });
    }

    const _removeClickListeners = function() {
        gameCells.forEach(cell => {
            cell.removeEventListener("click", gameManager.handlePlayerActions);
        });
    }
    _init();
})();
