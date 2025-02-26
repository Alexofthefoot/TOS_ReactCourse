// "Each little piece of functionality should be able to fit in the game, player or gameboard objects."

const GAME_OBJECT = (function () {
    let isFinished = false;

    return { isFinished }
}) ();

const PLAYER = (function () {
    let playerName;
    let playerSymbol;
    const getName = () => {playerName}
    const setName = (name) => {playerName = name}
    const getSymbol = () => {playerSymbol}
    const setSymbol = (symbol) => {playerSymbol = symbol}

    return {getName, setName, getSymbol, setSymbol}
})();

const UIController = (function () {
    const initButtons = () => {
                let buttons = document.querySelectorAll('button');
                buttons.forEach( button => {
                button.addEventListener('click', buttonPress);
                })}    //private, is called inside the controller

    const initForm = () => {
        let form = document.getElementById(player_info);
        form.onsubmit = function(event) {
            PLAYER.setName(form.name);
            console.log(PLAYER.getName())
            // PLAYER.setSymbol();
            event.preventDefault();
          };
    }

    const buttonPress = (event) => {    //private, but accessible by the buttons themselves?
        if (event.target.innerHTML == '') {
                event.target.innerHTML = PLAYER.getSymbol();
                console.log("Button clicked:", event.target);
            }
            else {
                console.log("you cant do that!");
            }} 

            
    const revealBoard = () => {
        let board = document.getElementById('game_container')
        board.style.display = inline;
    }

    initButtons()
    initForm()
    return {}
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