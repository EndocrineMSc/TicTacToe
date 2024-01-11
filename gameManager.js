//front facing game manager
const gameManager = (function() {
    const player1 = new Player("Player", "X");
    const player2 = new Player("Computer", "O");
    let playerWithTurn = player1;

    const changePlayerTurn = function() {
        playerWithTurn = playerWithTurn == player1 ? player2 : player1;

        if (playerWithTurn == player2) {
            let indeces = getComputerMarkIndeces();
            if (indeces) {
                playerAction(indeces);  
            }
        }
    }

    const playerAction = function(data) {
        let indeces = Array.isArray(data) ? data : [data.target.dataset.row, data.target.dataset.column];
        playerWithTurn.action(playerWithTurn.marker, indeces);
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

    const renderWinStat = function() {
        //
    }
    gameEvents.subscribe(MARK_PLACED_EVENT, changePlayerTurn);
    return {playerAction, getComputerMarkIndeces};
})();

