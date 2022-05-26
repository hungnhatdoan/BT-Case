let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');
let init;
let isGameOver = false;
let level = 1;
window.onload = () => {
    gameLoop()
}

function gameLoop() {
    init = setInterval(show, 1000 / (10 * level));
}

function show() {
    update()
    draw()
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    eatApple()
    checkHitWall()
    checkHitSnakeBody()
    updateLevel()
}

function eatApple() {
    if (snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = { x: apple.x, y: apple.y }
        apple = new Apple();
    }
}

function checkHitWall() {
    let headTail = snake.tail[snake.tail.length - 1]

    if (headTail.x == -snake.size) {
        headTail.x = canvas.width - snake.size
    } else if (headTail.x == canvas.width) {
        headTail.x = 0
    } else if (headTail.y == -snake.size) {
        headTail.y = canvas.height - snake.size
    } else if (headTail.y == canvas.height) {
        headTail.y = 0
    }
}

function checkHitSnakeBody() {
    let headTail = snake.tail[snake.tail.length - 1]
    for (let i = 0; i < snake.tail.length - 2; i++) {
        if (snake.tail[i].x == headTail.x && snake.tail[i].y == headTail.y) {
            isGameOver = true;
        }
    }
}

function updateLevel() {
    if ((snake.tail.length - 1) > 10 * level && (snake.tail.length - 1) % 10 == 0) {
        level++;
    }
}

function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black")
    createRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < snake.tail.length; i++) {
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size - 5, "white")
    }

    ctx.font = "20px Arial"
    ctx.fillStyle = "#00FF42"
    ctx.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 18)

    ctx.fillText("Level: " + level, canvas.width - 300, 18)
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
    if (isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        createRect(0, 0, canvas.width, canvas.height, "black")
        ctx.font = "20px Arial"
        ctx.fillStyle = "#00FF32"
        ctx.fillText("GameOver:- High Socre: " + (snake.tail.length - 1), canvas.width / 4, canvas.height / 2)
        clearInterval(init);
    }
}

function createRect(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 65 && snake.rotateX != 1) {
            snake.rotateX = -1
            snake.rotateY = 0
        } else if (event.keyCode == 87 && snake.rotateY != 1) {
            snake.rotateX = 0
            snake.rotateY = -1
        } else if (event.keyCode == 68 && snake.rotateX != -1) {
            snake.rotateX = 1
            snake.rotateY = 0
        } else if (event.keyCode == 83 && snake.rotateY != -1) {
            snake.rotateX = 0
            snake.rotateY = 1
        }
    }, 2)

})
const snake = new Snake(20, 20, 20);
let apple = new Apple();
console.log(canvas.width, canvas.height)