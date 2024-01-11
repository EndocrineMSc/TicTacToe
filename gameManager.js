//front facing game manager
const gameManager = (function() {
    const player1 = new Player("Player", "X");
    const player2 = new Player("Computer", "O");
    let isGameOver = false;

    const handlePlayerActions = function(eventData) {
        _performPlayerAction(eventData);
        let indeces = getComputerMarkIndeces();
        if (indeces) { _performPlayerAction(indeces); }    
    }

    const _performPlayerAction = function(data) {
        if (!isGameOver) {
            let player = Array.isArray(data) ? player2 : player1;
            let indeces = Array.isArray(data) ? data : [data.target.dataset.row, data.target.dataset.column];
            player.action(player.marker, indeces);
        }
    }

    const getComputerMarkIndeces = function() {
        let boardState = gameBoard.getBoardState();
        let emptyCells = [];

        for (let i = 0; i < boardState.length; i++) {
            let row = boardState[i];
            for (let k = 0; k < row.length; k++) {
                if (row[k] === "") {
                    emptyCells.push([i,k]);
                }
            }
        }

        let randomCellIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomCellIndex];
    }

    const _setGameOverState = function(endState) {
        isGameOver = true;
    }

    const _restart = function() {
        isGameOver = false;
    }

    gameEvents.subscribe(GAME_OVER_EVENT, _setGameOverState);
    gameEvents.subscribe(RESTART_EVENT, _restart);

    return {handlePlayerActions};
})();

