let game = {
    // canvas : document.querySelector('body canvas'),
    // ctx : this.canvas.getContext('2d'),
    canvas: null,
    ctx: null,
    fps: 60,
    framesCounter: 0,
    intervalID: 0,
    score: 0,


    init: function (ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;

        var tempBackground = new Background(ctx);
        this.background = tempBackground;
        var tempBird = new Bird(ctx)
        this.bird = tempBird;
        // var tmpObstacle = new Obstacle(this);
        // this.obstacle = tmpObstacle;

        this.obstacles = [];


        //TEST OUTPUT MODULE
        var parent = document.querySelector('body');
        var startButton = document.querySelector('#reset-button');
        var h2Elem = document.createElement('h2');
        parent.insertBefore(h2Elem, startButton);

        // var parent = document.querySelector('body');
        // var startButton = document.querySelector('#start-button');
        // var buttonElem = document.createElement('button');
        // document.createElement('button').setAttribute("id", "jump-button");
        // parent.insertBefore(buttonElem, startButton);

        document.getElementById("jump-button").onclick = function () {
            this.bird.jump();
        }.bind(this);


        // document.querySelector('body h2').innerHTML=`(game)this: ${this} (game)this.ctx:${this.ctx}`;
        // this.ctx.fillRect(300, 300, 100, 100);
        //======================================================

    },

    renderer: function () {
        this.intervalID = setInterval(function () {

            this.framesCounter++;
            this.score++;

            if (this.framesounter > 1000) {
                this.framesCounter = 0;
            }

            if (this.framesCounter % 150 === 0) {
                this.generateObstacle();
                // debugger
            }

            this.bird.clear();
            this.background.draw();
            this.bird.update();
            this.bird.draw();
            // this.obstacle.move();
            // this.obstacle.draw();
            this.obstacles.forEach(function (obstacle) { obstacle.move(); });
            this.obstacles.forEach(function (obstacle) { obstacle.draw(); });

            this.clearObstacles();

            if (this.isCollision()) {
                this.gameOver();
            };

            document.querySelector('body h2').innerHTML = `SCORE: ${this.score}`;

        }.bind(this), 1000 / this.fps)
    },

    clearObstacles: function () {
        this.obstacles = this.obstacles.filter(function (obstacle) {
            return obstacle.x >= -100;
        });
    },

    generateObstacle: function () {
        this.obstacles.push(new Obstacle(this));
    },

    stop: function () {
        clearInterval(this.intervalID);
    },

    gameOver: function () {
        this.stop();
    },

    isCollision: function () {

        return this.obstacles.some(function (obstacle) {

            return (
                ((this.bird.x + this.bird.w) > obstacle.x &&
                    this.bird.x < (obstacle.x + obstacle.w) &&
                    (this.bird.y + this.bird.h) > obstacle.y &&
                    this.bird.y < (obstacle.y + obstacle.h) ||
                    (this.bird.x + this.bird.w) > obstacle.x &&
                    this.bird.x < (obstacle.x + obstacle.w) &&
                    (this.bird.y + this.bird.h) > obstacle.yTop &&
                    this.bird.y < (obstacle.yTop + obstacle.hTop) ||
                    this.bird.y < 0 || this.bird.y > this.canvas.height)
            );

        }.bind(this));
    },

    reset: function () {
        
        var parent = document.querySelector('body');
        var resetButton = document.querySelector('#reset-button');
        var h2Elem = document.querySelector('h2');
        parent.removeChild(h2Elem, resetButton);

        
        this.framesCounter = 0;
        this.obstacles = [];
        this.score = 0;
        
        this.stop();
        let canvas = document.querySelector('body canvas');
        let ctx = document.querySelector('body canvas').getContext('2d');
        this.init(ctx, canvas);
        this.renderer();

    },

}