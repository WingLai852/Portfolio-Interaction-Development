const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    color: 'blue',
    dx: 0,
    dy: 0
};


function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Check for collisions with canvas borders
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
    } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
    }
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
    } else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function draw() {
    clearCanvas();
    drawBall();
    updateBallPosition();
    requestAnimationFrame(draw);
}

window.addEventListener('deviceorientation', (event) => {
    ball.dx = event.gamma * 0.1;  // Left to right tilt
    ball.dy = event.beta * 0.1;   // Front to back tilt
});

draw();
