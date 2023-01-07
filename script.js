const words = [
   'A','B','C','D'
]

const blockSize = 25; //we will move by 25 at a time
const rows = 25; //number of rows
const columns = 30; //number of columns

var board;
var context;

//position of snake head at the beginning at (5,5)
var SnakeX = 5*blockSize;
var SnakeY = 5*blockSize;

//snake body is an array
var snakeBody = [];

//move in x direction and y direction
var velocityX = 0;
var velocityY = 0;


//position of food
var foodX;
var foodY;

var gameOver = false;

window.onload = function()
{

    board = document.getElementById("board"); //get the canvas =>board
    board.height = rows * blockSize; //height of playing board
    board.width = columns * blockSize; //width of playing board
    context = board.getContext("2d");
    placeFoodRandom();
    document.addEventListener("keyup",changeSnakeDirection);
    setInterval(update,100);
}

var i =0;
function update()
{
    if(gameOver)
    {
        return;
    }

    context.fillStyle = "#002147"; //set fill color to black
    context.fillRect(0,0,board.width,board.height); //draw the board from 0,0 to width and height

    //draw the food in green color
    context.fillStyle = "white";
    context.font = "40px Arial "
    context.fillText(words[i],foodX,foodY,blockSize,blockSize);

    //if the snake eat the food we push the food into its body array
    if(SnakeX == foodX && SnakeY == foodY)
    {
        snakeBody.push([foodX,foodY]);
        placeFoodRandom();
        i++;
    }

    //make the body follow the head
    for(let i = snakeBody.length-1 ; i>0 ;i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length)
    {
        snakeBody[0] = [SnakeX , SnakeY];
    }

    //change position of head while moving
    SnakeX += velocityX * blockSize;
    SnakeY += velocityY * blockSize;
    context.fillStyle = "yellow";
    context.fillRect(SnakeX,SnakeY,blockSize,blockSize);
    
    for(let i = 0 ;i<snakeBody.length ;i++)
    {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }

    //gameover conditions
    if(SnakeX < 0 || SnakeX > columns*blockSize || SnakeY < 0 || SnakeY > rows*blockSize )
    {
        gameOver = true;
        alert("Gameover!")
    }
    for(let i=0 ;i<snakeBody.length ;i++)
    {
        if(SnakeX == snakeBody[i][0] && SnakeY == snakeBody[i][1])
        {
            gameOver = true;
            alert("Gameover!")
        }
    }
    if(i>words.length)
    {
        gameOver=true;
        alert("Congratulations! You Win")
    }
    

}

function placeFoodRandom()
{
    //Math.random return number between 0 and 1 and multibly by number of columns=30 
    //to return number bewtween 0 and 30
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) *blockSize;
}

function changeSnakeDirection(e)
{
    if(e.code == "ArrowUp" && velocityY != 1)
    {
        velocityX = 0;
        velocityY = -1;

    }
    else if(e.code == "ArrowDown" && velocityY != -1)
    {
        velocityX = 0;
        velocityY = 1;
    }
    if(e.code == "ArrowLeft" && velocityX != 1)
    {
        velocityX = -1;
        velocityY = 0;
        
    }
    if(e.code == "ArrowRight" && velocityX != -1)
    {
        velocityX = 1;
        velocityY = 0;
    }
}