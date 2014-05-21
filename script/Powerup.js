/*
 * Created by erikmagnusson on 20/05/14.
var PowerupProterties = {
    canvas : "",
    speedBulletPowerUp : null,
    rendering: false,
    Powerups : [],
    speedBulletPowerUpInterval : null,

    init: function () {

        var canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'powerUpCanvas');
        var gameContainer = document.getElementById('gameContainer')
        PowerupProterties.canvas = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameContainer.appendChild(canvas);

        PowerupProterties.canvas.fillStyle = 'blue';
        PowerupProterties.speedBulletPowerUp = new speedBulletPowerUp();

        PowerupStart();
    }
}

function Powerup() {};

function speedBulletPowerUp() {
    this.speed = 2;
    this.x = Math.random()*window.innerWidth;
    this.y = 5;
    this.width = 40;
    this.height = 40;
    //weaponProperties.blastInterval = 60;
}

function spawnPowerupControl() {
    PowerupProterties.speedBulletPowerUpInterval = setInterval(function(){
        spawnPowerup(1);

    }, 5000);
};
function spawnPowerup(amount) {
    for(var i=0;i<amount;i++) {
        PowerupProterties.Powerups[PowerupProterties.speedBulletPowerUp.length] = new speedBulletPowerUp();
    }
};
speedBulletPowerUp.prototype.render = function() {

    PowerupProterties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < PowerupProterties.Powerups.length; i++) {
        //om man if:ar varje fiende kanske man kan få det att använda this. istället. if(regularshop) {dens speed(egen variabel för speed?)}
        //när jag böt från this. till Enemies i arrayen försvann speedcontrol
        PowerupProterties.canvas.fillRect(PowerupProterties.Powerups[i].x, PowerupProterties.Powerups[i].y += PowerupProterties.Powerups[i].speed ,
            PowerupProterties.Powerups[i].width, PowerupProterties.Powerups[i].height);


    }
};
function PowerupStart() {
    PowerupProterties.rendering = true;
};

window.onload = PowerupProterties.init();*/