var EnemyProperties = {
    canvas : "",
    RegularEnemy : null,
    rendering: false,
   /* randomTopPos : Math.floor(Math.random() * (window.innerWidth)),
    randomLeftPos : Math.floor(Math.random() * (window.innerHeight)),*/
    Enemies : [],
    CurrentEnemy : 0,

    init: function () {

        var canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'enemyCanvas');
        var gameContainer = document.getElementById('gameContainer')
        EnemyProperties.canvas = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameContainer.appendChild(canvas);

        EnemyProperties.canvas.fillStyle = 'red';
        EnemyProperties.RegularEnemy = new RegularEnemy();

        EnemyStart();
    }
}

function Enemies(){
}
function spawnEnemyControl(a) {
      var EnemyInterval = setInterval(function(){
        spawnEnemy(1);

    }, 2000);
}

function RegularEnemy() {
    this.speed = 0.4;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 20;
    this.height = 20;
}

function spawnEnemy(amount) {
    for(var i=0;i<amount;i++) {
        EnemyProperties.Enemies[EnemyProperties.Enemies.length] = new RegularEnemy();
    }
}
RegularEnemy.prototype.render = function() {
    EnemyProperties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < EnemyProperties.Enemies.length; i++) {

            EnemyProperties.canvas.fillRect(EnemyProperties.Enemies[i].x, EnemyProperties.Enemies[i].y += this.speed,
                EnemyProperties.Enemies[i].width, EnemyProperties.Enemies[i].height);

        if(EnemyProperties.Enemies[i].y > window.innerHeight) {

            EnemyProperties.Enemies[i] = new RegularEnemy(EnemyProperties.Enemies[i].x, EnemyProperties.Enemies[i].y += this.speed,
                EnemyProperties.Enemies[i].width, EnemyProperties.Enemies[i].height);
        }
    }
}

function EnemyStart() {
    EnemyProperties.rendering = true;
}

window.onload = EnemyProperties.init();