const gameBoard = (function() {
    const currentBoardState =  [["","",""],
                                ["","",""],
                                ["","",""]];

    const setMark = function(data) {
        let indeces = data.indeces;
        let cell = currentBoardState[indeces[0]][indeces[1]];
        if (cell === "") {
            currentBoardState[indeces[0]][indeces[1]] = data.marker;
            checkWinState();
            gameEvents.invoke(MARK_PLACED_EVENT, currentBoardState);           
        }
    }

    const checkWinState = function() {
        //check horizontal and vertical
        for (let i = 0; i < 3; i++) {
            //check horizontal
            if (currentBoardState[i][0] != "" && currentBoardState[i].every(mark => mark === currentBoardState[i][0])) {
                gameEvents.invoke(GAME_OVER_EVENT, currentBoardState[i][0]);
                return;
            }
            let verticalMatches = 0;
            //check vertical
            for (let k = 0; k < 3; k++) {
                if (currentBoardState[k][i] != "" && currentBoardState[k][i] === currentBoardState[0][i]) {
                    verticalMatches++;
                }
                else {
                    break;
                }

                if (verticalMatches === 3) {
                    gameEvents.invoke(GAME_OVER_EVENT, currentBoardState[k][i]);
                    return;
                }
            }
        }
        
        //check top-left to bottom-right diagonal
        if (currentBoardState[0][0] != "" && currentBoardState[0][0] === currentBoardState[1][1] && currentBoardState[1][1] === currentBoardState[2][2]) {
            gameEvents.invoke(GAME_OVER_EVENT, currentBoardState[1][1]);
            return;
        }
        // check top-right to bottom-left diagonal
        if (currentBoardState[0][2] != "" && currentBoardState[0][2] === currentBoardState[1][1] && currentBoardState[1][1] === currentBoardState[2][0]) {
            gameEvents.invoke(GAME_OVER_EVENT, currentBoardState[1][1]);
            return;
        }
        // check for draw
        let isDraw = true;
        currentBoardState.forEach(horizontalArray => {
            horizontalArray.forEach(position => {
                if (position == "") {
                    isDraw = false;
                    return;
                }
            });
            if (!isDraw) {
                return;
            }
        });
        if (isDraw) {
            gameEvents.invoke(GAME_OVER_EVENT, "draw");
            return;
        }
    }

    const resetBoardState =  function() {
        for (let i = 0; i < 3; i++) {
            for (let k = 0; k <3; k++) {
                currentBoardState[i][k] = "";
            }
        }
        gameEvents.invoke(MARK_PLACED_EVENT, currentBoardState);
    }

    const getBoardState = function() {
        return currentBoardState;
    }

    gameEvents.subscribe(PLAYER_ACTION_EVENT, setMark);
    gameEvents.subscribe(RESTART_EVENT, resetBoardState);
    return {getBoardState};
})();
