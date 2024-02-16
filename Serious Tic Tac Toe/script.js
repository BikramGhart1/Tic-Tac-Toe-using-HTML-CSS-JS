//module that manages the game board in overall
let gameBoard = (() => {
    let gameBoardArray = ['', '', '', '', '', '', '', '', '']

    let gameboardinnerHtml = document.getElementById('game-board');
    //render function that renders the 9 boxes in the board
    const render = (() => {

        let boardHTML = ``;

        gameBoardArray.forEach((markBox, index) => {
            boardHTML += `<div class='box-class' id='box-${index}'>${markBox}</div>`;
            gameboardinnerHtml.innerHTML = boardHTML;

            let boxes = document.querySelectorAll('.box-class');
            boxes.forEach((box) => {
                box.addEventListener('click', Game.eventHandler);

            })


        })
    })

    //make board empty
    let clearBoard = (() => {
        gameBoardArray = ['', '', '', '', '', '', '', '', ''];
        gameboardinnerHtml.innerHTML = '';
        if (Game) {
            Game.resetIndex();

        }


    })

    //so that we can access the gameboard from outside the scope
    const getGameboard = () => gameBoardArray;

    return {
        render,
        clearBoard,
        getGameboard
    }
})();

//player object creator factory
let createPlayer = (name, mark, score) => {
    return {
        name,
        mark,
        score
    }
}

//Game module where all controls reside
let Game = (() => {
    let players = [];
    let playerIndex = 0;
    notGameOver = true;

    //I made this because i couldnt access the notGameOver variable from restartfunction which lies beyond its scope
    //Is there any better way for accessing it?
    let resetGameOver = () => {
        notGameOver = true;

    }

    //start function that renders and creates the players object arrays
    let start = () => {
        let player1 = document.getElementById('player1');
        let player2 = document.getElementById('player2');
        //create the players
        players = [
            createPlayer(player1.value, 'X', 0),
            createPlayer(player2.value, 'O', 0)
        ]

        document.getElementById('playerMoves').innerHTML = ` 
        <p>Player Infos:</p>
        <p>${players[0].name}: ${players[0].mark}</p>
<p>${players[1].name}: ${players[1].mark}</p>`
    }
    //event handler for the click in the 9 boxes 
    let eventHandler = (event) => {


        let index = parseInt(event.target.id.split("-")[1]);
        //accessing the 9 boxes 
        let insideBoxContenet = document.getElementById(`box-${index}`);

        //check if 9 boxes are empty and game is not over
        if (insideBoxContenet.innerText === '' && notGameOver) {

            //acess the board and put mark when clicked also push the marks into the gameboardArray
            let board = gameBoard.getGameboard();

            insideBoxContenet.innerHTML = `${players[playerIndex].mark}`;
            board[index] = players[playerIndex].mark;
            playerIndex = togglePlayerIndex(playerIndex);

            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            //loop through the winning combinations
            for (let pattern of winPatterns) {

                //destructing the winning index into a,b and c
                const [a, b, c] = pattern;

                //checking the win conditions and if board is empty
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {


                    let winnerPlayerIndex = togglePlayerIndex(playerIndex);
                    players[winnerPlayerIndex].score += 1;


                    //I will use this for lose or win states 
                    // document.getElementById('messege').innerHTML = `Bikram always wins`;
                    document.getElementById('messege').innerHTML = `<p>Winner - ${players[winnerPlayerIndex].name}  :   ${players[playerIndex].name} - loser</p>`
                    let resultDisp = document.getElementById('result');
                    resultDisp.innerHTML = `<p>Score: ${players[winnerPlayerIndex].name} - ${players[winnerPlayerIndex].score} : ${players[playerIndex].score} - ${players[playerIndex].name}</p>`
                    // setTimeout(() => {
                    //     gameBoard.clearBoard();
                    //     gameBoard.render();

                    // }, 10000)
                    notGameOver = false;

                }
                if (!board.includes('') && notGameOver) {
                    document.getElementById('messege').innerHTML = "<p>tie!</p>";
                    notGameOver = false;
                }
            }
        }

    }

    //toggle the player index for changing the marks 'X' or'O'
    let togglePlayerIndex = (playerIndex) => {
        return 1 - playerIndex;
    }

    //i added this part beacause index will keep toggling even after the restarting the game
    let resetIndex = () => {
        playerIndex = 0;
    }
    // reset function to reset scores, names, and board
    let reset = () => {
        players.forEach((player) => {
            player.score = 0;
        })
        gameBoard.clearBoard();
        resetGameOver();
        document.getElementById('messege').innerHTML = '';
        document.getElementById('result').innerHTML = '';

        player1.value = ''
        player2.value = ''
    }
    // let scoreTracker=()=>{
    //     let playerScore=[0,0]
    // }
    return {
        start,
        eventHandler,
        resetIndex,
        resetGameOver,
        reset

    }

})();

//start button
document.getElementById('start-button').addEventListener('click', () => {
    gameBoard.render();
    Game.start();


})

//Restart button 
document.getElementById('restart-button').addEventListener('click', () => {
    gameBoard.clearBoard();
    gameBoard.render();
    Game.resetGameOver();
    document.getElementById('messege').innerHTML = '';
})

document.getElementById('resetAll').addEventListener('click', () => {
    Game.reset();
})
