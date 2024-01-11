const gameBoard = (function() {
    const blankBoardState =    [["","",""],
                                ["","",""],
                                ["","",""]];

    let currentBoardState =    [["","",""],
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
            if (currentBoardState[i][0] != "" && currentBoardState[i].every(mark => mark === mark[0])) {
                gameEvents.invoke(GAME_WON_EVENT, currentBoardState[i][0]);
                return;
            }
            let verticalMatches = 0;
            //check vertical
            for (let k = 0; k < 3; k++) {
                if (currentBoardState[i][0] != "" && currentBoardState[i][k] === currentBoardState[i][0]) {
                    verticalMatches++;
                }
                else {
                    break;
                }
            }
            if (verticalMatches === 3) {
                gameEvents.invoke(GAME_WON_EVENT, currentBoardState[i][0]);
                return;
            }
        }
        
        //check top-left to bottom-right diagonal
        if (currentBoardState[0][0] != "" && currentBoardState[0][0] === currentBoardState[1][1] && currentBoardState[1][1] === currentBoardState[2][2]) {
            gameEvents.invoke(GAME_WON_EVENT, currentBoardState[1][1]);
            return;
        }
        // check top-right to bottom-left diagonal
        if (currentBoardState[0][2] != "" && currentBoardState[0][2] === currentBoardState[1][1] && currentBoardState[1][1] === currentBoardState[2][0]) {
            gameEvents.invoke(GAME_WON_EVENT, currentBoardState[1][1]);
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
            gameEvents.invoke(DRAW_EVENT, null);
            return;
        }
    }

    const resetBoardState =  function() {
        currentBoardState = blankBoardState;
    }

    const getBoardState = function() {
        return currentBoardState;
    }

    gameEvents.subscribe(PLAYER_ACTION_EVENT, setMark);
    return {getBoardState};
})();
