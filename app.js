//get from html
const board=document.getElementById("boardGame");
const playBtn=document.getElementById("startGame");
const scoreDisplay=document.getElementById("score");

// variabels
const boardSize=20;
let snake=[{x:20,y:20}];
let direction={x:0 , y:1};
let nextDirection={x:0 , y:1};
let food={x:0 , y:0};
let gameInterval;
let score=0;


//Main 

//تابع تولید غذای مار
function generatFood() {
    let newFood;
    do{
        newFood=
        {
            x:Math.floor(Math.random()*boardSize) , 
            y:Math.floor(Math.random()*boardSize)
        };
    }
    while(snake.some((segment) =>
                    segment.x === newFood.x &&
                    segment.y===newFood.y))
    {
        food=newFood;

    }
}


//تابع تخته بازی 
function drawBoard(){
    board.innerHTML="";

    for (let y = 0; y <boardSize ; y++) 
        {
        for (let x = 0; x <boardSize ;x++)
            {
            const cell=document.createElement("div");
            cell.classList.add("cell");
            if(snake.some(segment =>
                segment.x === x && segment.y === y
            ))
            {
                cell.classList.add("snake");
            }
            if(food.x === x && food.y === y)
            {
                cell.classList.add("food");
            }
            board.appendChild(cell);
            }
        }
        
    }

function updateGame(){
    direction=nextDirection;
    const headSnake={
        x:snake[0].x + direction.x ,
        y:snake[0].y + direction.y
    }
    if(
        headSnake.x < 0 ||
        headSnake.y < 0 ||
        headSnake.x >= boardSize ||
        headSnake.y >= boardSize ||
        snake.some(segment => segment.x === headSnake.x 
            && segment.y === headSnake.y)
    ){
        clearInterval(gameInterval);
        alert(`Game Over - score : ${score}`);
        return;
    }
    snake.unshift(headSnake);
    if(headSnake.x === food.x && headSnake.y === food.y)
    {
        score++;
        scoreDisplay.textContent=score;
        generatFood();  }
        else{
            snake.pop();
        }
        drawBoard();
    }

document.addEventListener("keydown" ,(event) => {
    switch(event.key){
        case "ArrowUp" :
            if(direction.y === 0 ) nextDirection ={x:0 , y:-1};
            break;

        case "ArrowDown":
            if(direction.y === 0) nextDirection = {x:0 , y:1};
            break;

        case "ArrowLeft":
            if(direction.x === 0 ) nextDirection= {x:-1 , y:0};
            break;

        case "ArrowRight":
            if(direction.x === 0 ) nextDirection= {x:1 , y:0};
            break;
    }
});

function start(){
    clearInterval(gameInterval);
    snake=[{x:10 , y:10}];
    direction={x:1 , y:0};
    nextDirection={x:1 , y:0};
    score=0;
    scoreDisplay.textContent=score;
    generatFood();
    drawBoard();
    gameInterval=setInterval(()=> {updateGame()},200);
}


playBtn.addEventListener("click" , start);
start();