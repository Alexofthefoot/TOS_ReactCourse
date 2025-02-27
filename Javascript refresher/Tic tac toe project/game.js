// "Each little piece of functionality should be able to fit in the game, player or gameboard objects."

const GAME_OBJECT = (function () {
    let computerSymbol;
    let isPlayersTurn = true;
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const getSymbol = () => computerSymbol;
    const setSymbol = (symbol) => { computerSymbol = symbol }
    const alterBoard = (pos, symbol) => { board[pos] = symbol; }
    const takeTurn = () => {
        let turn = strategize();
        alterBoard(turn, computerSymbol)
        UIController.computerTurn(turn, computerSymbol);
        console.log(board)
        if (isGameFinished()) {
            //reset board
            board = ["", "", "", "", "", "", "", "", ""];
            // reset css
            UIController.finishGame(); 
        }
    }
    const strategize = () => {
        // TODO: put in an actual strategy
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "") {
                console.log("computer plays position", i);
                return i; 
            }
        }
    }
    let isGameFinished = () => {
        // TODO put in more than one win condition lol
        if (board[0] == board[1] && board[1] == board[2] && board[2] != ""){
            console.log(board[0], board[1], board[2])
            console.log("returning true")
            return true;
        }
        console.log("returning false")
        return false;
    }
    return { isGameFinished, isPlayersTurn, getBoard, getSymbol, setSymbol, alterBoard, takeTurn }
})();

const PLAYER = (function () {
    let playerName;
    let playerSymbol;
    const getName = () => playerName;
    const setName = (name) => { playerName = name }
    const getSymbol = () => playerSymbol;
    const setSymbol = (symbol) => { playerSymbol = symbol }

    return { getName, setName, getSymbol, setSymbol }
})();

const UIController = (function () {
    const initButtons = () => {
        let buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.id != 'submit_button') { //ignore the form submission button
                button.addEventListener('click', buttonPress, button.id);
            }
        })
    }

    const initForm = () => {
        let form = document.getElementById('player_info');
        form.addEventListener('submit', formSubmit);
    }

    const formSubmit = (event) => {
        event.preventDefault();
        const name = document.getElementById("playerName");
        const symbolX = document.getElementById("optionX").checked;
        const symbolO = document.getElementById("optionO").checked;
        // verify user inputs
        if ((symbolX || symbolO) && name != null) {
            PLAYER.setName(name.value);
            console.log("O is ", symbolO, "X is", symbolX)
            if (symbolX) {
                PLAYER.setSymbol('X');
                GAME_OBJECT.setSymbol('O');
            }
            else {
                PLAYER.setSymbol('O');
                GAME_OBJECT.setSymbol('X');
            }
            console.log("Player is now named ", PLAYER.getName(), "with a symbol of ", PLAYER.getSymbol())
            hideForm();
            revealBoard();
        }
        else {
            let warning = document.getElementById('user_message')
            warning.style.display = 'inline';

        }
    }

    const buttonPress = (event) => {    //private, but accessible by the buttons themselves?
        if (event.target.innerHTML == '') {
            event.target.innerHTML = PLAYER.getSymbol();
            GAME_OBJECT.alterBoard(event.target.id, PLAYER.getSymbol())
            // tell computer to take turn
            GAME_OBJECT.takeTurn();
        }
        else {
            console.log("you cant do that!");
        }
    }

    const computerTurn = (pos) => {
        let button = document.getElementById(pos);
        button.innerHTML = GAME_OBJECT.getSymbol();
    }

    const hideForm = () => {
        const formContainer = document.getElementById('form_container');
        formContainer.style.display = 'none';

    }
    const revealBoard = () => {
        const board = document.getElementById('game_container');
        board.style.display = 'flex';
        const h3 = document.getElementById('user_instruction');
        h3.innerHTML = "Click a button to start";
    }
    const finishGame = () => {
        const header = document.getElementById('user_instruction');
        header.innerHTML = "Game over! Play again?"
        const formContainer = document.getElementById('form_container');
        formContainer.style.display = 'flex;';
        const board = document.getElementById('game_container');
        board.style.display = 'none';
        
    }

    initButtons()
    initForm()
    return { buttonPress, finishGame, computerTurn }
})();

