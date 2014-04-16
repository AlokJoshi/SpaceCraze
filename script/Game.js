
//skapar allt som ja vill använd amig av för spelare och fiender
var GameProperties = {
    canvas : "",
    ship : null,
    rendering: false,
    pressedKeys : [],


    init:function(){

        var canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'gameCanvas');
        var gameContainer = document.getElementById('gameContainer')
        GameProperties.canvas =  canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameContainer.appendChild(canvas);

        GameProperties.canvas.fillStyle = 'white'
        GameProperties.ship = new Ship();
        StartGame();


        window.addEventListener('keydown', function(e) {
            GameProperties.pressedKeys[e.keyCode] = true;
        });


    }
}

function Game(){

}

// Game objects
function Ship() {
    this.speed = 5;
    this.x = 600;
    this.y = 500;
    this.width = 50;
    this.height = 50;

}
function RegularEnemy() {
    speed = 256;
    x = 0;
    y = 0;
}

Ship.prototype.render = function() {
    GameProperties.canvas.clearRect(0,0,window.innerWidth,window.innerHeight);
    GameProperties.canvas.fillRect(this.x,this.y,this.width, this.height);

    this.moving();
}


function gameLoop() {

    if (GameProperties.rendering) {
        GameProperties.ship.render();
        aniSmooth(gameLoop);
    }
}
function StartGame() {
    GameProperties.rendering = true;
    gameLoop();

}
//tagen från paul irish
var aniSmooth = window.requestAnimationFrame      ||
        window.webkitRequestAnimationFrame        ||
        window.mozRequestAnimationFrame           ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
};

Ship.prototype.moving = function() {
    if(GameProperties.pressedKeys[37]) {

        GameProperties.ship.x -= this.speed;
    }
}

window.onload = GameProperties.init();


