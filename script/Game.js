//skapar allt som ja vill använd amig av för spelare och fiender
var GameProperties = {
    canvas : "",
    weaponCanvas : "",
    ship : null,
    RegularBlast : null,
    rendering: false,
    pressedKeys : [],
    Blasts : [],
    currentBlast: 0,

    init:function(){

        var canvas = document.createElement("canvas");

        canvas.setAttribute('id', 'gameCanvas');

        var gameContainer = document.getElementById('gameContainer');
        GameProperties.canvas =  canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        gameContainer.appendChild(canvas);


        GameProperties.canvas.fillStyle = 'white';

        GameProperties.ship = new Ship();
        StartGame();

        var ifkeydown = 0;
        window.addEventListener('keydown', function(e) {

            ifkeydown++;

            if(ifkeydown==3) {

                GameProperties.ship.speed = 10;

            }
            if(ifkeydown==8) {

                GameProperties.ship.speed = 20;

            }
            GameProperties.pressedKeys[e.keyCode] = true;

        });
        window.addEventListener('keyup', function(e) {
            ifkeydown = 0;

            GameProperties.pressedKeys[e.keyCode] = false;
            GameProperties.ship.speed = 5;
        });
    }
}

function Game(){

}
// Game object
function Ship() {
    this.speed = 5;
    this.x = 600;
    this.y = 500;
    this.width = 50;
    this.height = 50;
}

function BlastControl() {
    console.log('2');
    var blastInterval = setInterval(function(){
        Blast(1);
        weaponProperties.shipx = GameProperties.ship.x;
        weaponProperties.shipy = GameProperties.ship.y;

    }, 1000);
}

//rendering av object
Ship.prototype.render = function() {
    GameProperties.canvas.clearRect(0,0,window.innerWidth,window.innerHeight);
    GameProperties.canvas.fillRect(this.x,this.y,this.width, this.height);
    this.moving();
}
//weapon Object
function gameLoop() {

    if (GameProperties.rendering) {
        GameProperties.ship.render();

        EnemyProperties.RegularEnemy.render();
        aniSmooth(gameLoop);
    }
}
function StartGame() {
    GameProperties.rendering = true;
    gameLoop();
    spawnEnemyControl();
}
//Tagen från paul irish
var aniSmooth = window.requestAnimationFrame      ||
        window.webkitRequestAnimationFrame        ||
        window.mozRequestAnimationFrame           ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
};

Ship.prototype.moving = function() {

    if (GameProperties.pressedKeys[37]) {

        GameProperties.ship.x -= this.speed;

    }
    if (GameProperties.pressedKeys[39]) {

        GameProperties.ship.x += this.speed;

    }
    if (GameProperties.pressedKeys[38]) {

        GameProperties.ship.y -= this.speed;

    }
    if (GameProperties.pressedKeys[40]) {

        GameProperties.ship.y += this.speed;
    }

    if (GameProperties.pressedKeys[49]) {

        velocityUpgrade(plusSpeedCounter += 30);

    }
    if (GameProperties.pressedKeys[50]) {

        velocityDowngrade(plusSpeedCounter-=30);
    }
    if (GameProperties.pressedKeys[82]) {

        randomise();
    }
}

Ship.prototype.still = function(e) {
    if(GameProperties.pressedKeys[e]) {
        GameProperties.ship.x = GameProperties.ship.x;
    }
}



window.onload = GameProperties.init();


