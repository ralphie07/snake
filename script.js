const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = '';
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
};

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
}

function draw() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'lime' : 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Snake movement
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'UP') snakeY -= box;
    if (direction === 'DOWN') snakeY += box;
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'RIGHT') snakeX += box;

    // Check if the snake has eaten the food
    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop();
    }

    // Add new head to the snake
    const newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over!');
        document.location.reload();
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Start the game
const game = setInterval(draw, 100);
console.log("Hello, World!");
document.write("Hello, World!");
