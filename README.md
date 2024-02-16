# Tic-Tac-Toe-using-HTML-CSS-JS
In this project I have implemented Closures, IIFE(Immediately Invoked Function Expression), Factories, Callbacks, DOM Manipulation, And event handling.
My main purpose here is code maintainance, code reusability, encapsulation, avoiding global encapsulations.
# Lets discuss them in little depth

#Immediately invoked function expression 
I have made two module patterns using IIFE, they are 'Game' and 'gameBoard' so what they do is gameboard manages 
overall baord activites and has 'render', 'clear' and 'getBoard' functions
with this functions we can manipulate the board within the module and we return these functions for closures.

similar with the 'Game' module it is also an IIFE, 

let Game=(()=>{
.
.
.
})();

we have 'resetGameOver', 'start', 'evnetHandler', 'reset' functions which serves their specific purpose and are being returned 
for closure property,

provides features like:

# Encapsulation,
# Avoid gloabal scope pollutions
# Immediate execution of code

# Object factory
After that i have created a factory that returns the player properties: 'name', 'mark' and 'score' 
This method is more efficient than object constructors;

let createPlayer = (name, mark, score) => {
    return {
        name,
        mark,
        score
    }
}

#Event Handling
for event handling we have three different buttons and 9 boxes in board where an user can click
three buttons are 'start', 'restart', 'reset' which handles different events

and for 9 boxes in array i have added an event handling when a user clicks either of a box
we take mark from the user object and push it into the gameBoardArray and render it in page with DOM.

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
}
in this code snippet, the logic is, we get the index of clicked box and render the mark checking if the clicked box is empty and if game is over or not


Main logic of this game is I made the game board as an array

#    let gameBoardArray = ['', '', '', '', '', '', '', '', '']

which is empty at initial 
then from above event handling rendering part is done 
now what left is we check if any player has won or not;
if conditions are met game is over and score is updated in the array of object to respsective player:

win condition is, we destructure the winning combination index into a, b and c and check if any player has won.


# Feedback and suggestion
I am open for different suggestions and room for growth, I wrote this code by solving one small problem at a time so codes could be twisted and some maybe
unnecessary. i just kept adding and modifying as requirement.
Thanks for reading!

