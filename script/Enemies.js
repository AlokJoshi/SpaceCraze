/**
 *
 * @type {{canvas: string, RegularEnemy: null, rendering: boolean, Enemies: Array, CurrentEnemy: number, init: init}}
 */
var EnemyProperties = {
    canvas : "",
    RegularEnemy : null,
    RareEnemy : null,
    RarestEnemy : null,
    rendering: false,
   /* randomTopPos : Math.floor(Math.random() * (window.innerWidth)),
    randomLeftPos : Math.floor(Math.random() * (window.innerHeight)),*/
    Enemies : [],
    RareEnemies : [],
    CurrentEnemy : 0,
    RegularEnemyLife : 1,
    RareEnemyLife : 2,
    RarestEnemyLife : 4,

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
        EnemyProperties.RareEnemy = new RareEnemy();

        EnemyStart();
    }
}

function Enemies(){
}
/**
 * Interval för hur ofta fiender ska skapas
 * Normalt varannan sekund
 */
function spawnEnemyControl() {
      var EnemyInterval = setInterval(function(){
        spawnEnemy(1);

    }, 2000);
}
function spawnRareEnemyControl() {
    var EnemyInterval = setInterval(function(){
        spawnRareEnemy(1);

    }, 5000);
}
function spawnRarestEnemyControl() {
    var EnemyInterval = setInterval(function(){
        spawnRarestEnemy(1);

    }, 20000);
}
/**
 *
 * @constructor
 * vanligaste fienden
 */
function RegularEnemy() {
    this.speed = 0.6;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 20;
    this.height = 20;
    this.RegularEnemyLife = 1;
}
/**
 *
 * @constructor
 * en fiende som inte spawnar lika ofta som regularenemy
 */
function RareEnemy() {
    this.speed = 1.3;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 10;
    this.height = 10;
    this.RareEnemyLife = 2;
}
/**
 *ovanlig fiende
 *
 */
function RarestEnemy() {
    this.speed = 0.4;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 40;
    this.height = 40;
    this.RarestEnemyLife = 4;
}
/**
 *
 * @param amount
 * Är lika med det antalet fiender som ska skapas per intevall
 * vanligtvis 1
 */
function spawnEnemy(amount) {
    for(var i=0;i<amount;i++) {
        EnemyProperties.Enemies[EnemyProperties.Enemies.length] = new RegularEnemy();

    }
}
function spawnRareEnemy(amount) {
    for(var i=0;i<amount;i++) {

        EnemyProperties.Enemies[EnemyProperties.Enemies.length] = new RareEnemy();

    }
}
function spawnRarestEnemy(amount) {
    for(var i=0;i<amount;i++) {

        EnemyProperties.Enemies[EnemyProperties.Enemies.length] = new RarestEnemy();

    }
}
/**
 * Ritar ut fienderna på randompositioner.
 * Om en fiende klarar sig hela vägen ner så skapas den åter högst upp på ny random position
 * Renderfunktionen fungerar till alla enemies trots namnet
 */
RegularEnemy.prototype.render = function() {
    EnemyProperties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < EnemyProperties.Enemies.length; i++) {
        //om man if:ar varje fiende kanske man kan få det att använda this. istället. if(regularshop) {dens speed(egen variabel för speed?)}
                                                                                      //när jag böt från this. till Enemies i arrayen försvann speedcontrol
            EnemyProperties.canvas.fillRect(EnemyProperties.Enemies[i].x, EnemyProperties.Enemies[i].y += EnemyProperties.Enemies[i].speed,
                EnemyProperties.Enemies[i].width, EnemyProperties.Enemies[i].height);

        /**
         * fienden spawnar högst upp i rutan om den når botten
         */
        if(EnemyProperties.Enemies[i].y > window.innerHeight) {

            if(EnemyProperties.Enemies[EnemyProperties.RegularEnemy]) {
                EnemyProperties.Enemies[i] = new RegularEnemy(EnemyProperties.Enemies[i].x, EnemyProperties.Enemies[i].y += EnemyProperties.Enemies[i].speed,
                    EnemyProperties.Enemies[i].width, EnemyProperties.Enemies[i].height);
            }

        }
       /* if(EnemyProperties.Enemies[i].x >= EnemyProperties.Enemies[i].x -30 || EnemyProperties.Enemies[i].x <= EnemyProperties.Enemies[i].x +30) {

            EnemyProperties.Enemies[i] = new RegularEnemy(EnemyProperties.Enemies[i].x, EnemyProperties.Enemies[i].y += this.speed,
                EnemyProperties.Enemies[i].width, EnemyProperties.Enemies[i].height);
        }*/
    }
}

/**
 *
 * @constructor
 */
function EnemyStart() {
    EnemyProperties.rendering = true;
}

window.onload = EnemyProperties.init();