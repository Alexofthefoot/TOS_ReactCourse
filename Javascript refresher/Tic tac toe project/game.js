// "Each little piece of functionality should be able to fit in the game, player or gameboard objects."

const GAME_OBJECT = (function () {
    let isFinished = false;

    return { isFinished }
}) ();

const PLAYER = (function () {
    let playerName;
    let playerSymbol;
    const getName = () => {return playerName}
    const setName = (name) => {playerName = name}
    const getSymbol = () => {return playerSymbol}
    const setSymbol = (symbol) => {playerSymbol = symbol}

    return {getName, setName, getSymbol, setSymbol}
})();

const UIController = (function () {
    const initButtons = () => {
                let buttons = document.querySelectorAll('button');
                buttons.forEach( button => {
                    if (button.id != 'submit_button') { //ignore the form submission button
                        button.addEventListener('click', buttonPress);
                    }
                
                })}

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
            console.log("O is ", symbolO,"X is", symbolX)
            if (symbolX) {
                PLAYER.setSymbol('X');
            }
            else {PLAYER.setSymbol('O');}
            console.log("Player is now named ", PLAYER.getName() , "with a symbol of ", PLAYER.getSymbol())
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
                console.log("Button clicked:", event.target);
            }
            else {
                console.log("you cant do that!");
            }} 

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

    initButtons()
    initForm()
    return { buttonPress }
})();




// function createGameBoard() {
//     let board = ["","","","","","","","",""];
//     const getBoard = () => board;
// }

// function createPlayer(name, symbol) {
//     const getSymbol = () => symbol;
//     const getName = () => name; 
//     const greeting = () => 'hello, my name is' + name;
//     return { getSymbol, getName, greeting };
// }


// const p1 = createPlayer('Alex', 'x');
// p1.greeting();  
// let p2 = createPlayer('Brett', 'o');
// console.log(p1.getName() ,"plays with an ", p1.getSymbol())