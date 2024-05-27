let video;
let handpose;
let predictions = [];
let balls = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    handpose = ml5.handpose(video, modelReady);
    handpose.on('predict', results => {
        predictions = results;
    });
    video.hide();

    // Create some balls
    for (let i = 0; i < 10; i++) {
        balls.push(new Ball(random(width), random(height), random(20, 50)));
    }
}

function modelReady() {
    console.log('Handpose model ready');
}

function draw() {
    image(video, 0, 0, width, height);

    // Draw all the balls
    for (let ball of balls) {
        ball.update();
        ball.display();
    }

    // Check for finger positions and interact with balls
    for (let i = 0; i < predictions.length; i++) {
        let prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j++) {
            let keypoint = prediction.landmarks[j];
            fill(0, 255, 0);
            noStroke();
            ellipse(keypoint[0], keypoint[1], 10, 10);
            for (let ball of balls) {
                ball.checkCollision(keypoint);
            }
        }
    }
}

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.r || this.x > width - this.r) {
            this.vx *= -1;
        }
        if (this.y < this.r || this.y > height - this.r) {
            this.vy *= -1;
        }
    }

    display() {
        fill(255, 0, 0);
        noStroke();
        ellipse(this.x, this.y, this.r * 2);
    }

    checkCollision(point) {
        let d = dist(this.x, this.y, point[0], point[1]);
        if (d < this.r + 10) {
            this.vx = (this.x - point[0]) * 0.1;
            this.vy = (this.y - point[1]) * 0.1;
        }
    }
}
