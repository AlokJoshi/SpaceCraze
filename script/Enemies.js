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
    Enemies : [],
    RareEnemies : [],
    CurrentEnemy : 0,
    RegularEnemyLife : 1,
    RareEnemyLife : 2,
    RarestEnemyLife : 4,
    enemyLooseHealth : false,
    EnemyInterval : null,
    RareEnemyInterval : null,
    RarestEnemyInterval : null,

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
    var regularEnemyInterval = 2000;
      EnemyProperties.EnemyInterval = setInterval(function(){
        spawnEnemy(1);
        setTimeout(function(){regularEnemyInterval===500},10000);

    }, regularEnemyInterval);
}
function spawnRareEnemyControl() {
    var RareEnemyInterval = 4000;
    EnemyProperties.RareEnemyInterval = setInterval(function(){
        spawnRareEnemy(1);
        setTimeout(function(){RareEnemyInterval=2000},10000);
    }, RareEnemyInterval);
}
function spawnRarestEnemyControl() {
    var RarestEnemyInterval = 10000;
    EnemyProperties.RarestEnemyInterval = setInterval(function(){
        spawnRarestEnemy(1);
        setTimeout(function(){RarestEnemyInterval=5000},10000);

    }, RarestEnemyInterval);
}
/**
 *
 * @constructor
 * vanligaste fienden
 */
function RegularEnemy() {
    this.speed = 2;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 50;
    this.height = 50;
    this.Life = 2;
    this.points = 55;
}
/**
 *
 * @constructor
 * en fiende som inte spawnar lika ofta som regularenemy
 */
function RareEnemy() {
    var that = this;
    this.speed = 2.8;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 30;
    this.height = 30;
    this.Life = 2;
    this.points = 70;
}
/**
 *ovanlig fiende
 *
 */
function RarestEnemy() {

    this.speed = 1.4;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 100;
    this.height = 100;
    this.Life = 4;
    this.points = 99;
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
RegularEnemy.prototype.render = function(Enemy) {

    EnemyProperties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < EnemyProperties.Enemies.length; i++) {
        //om man if:ar varje fiende kanske man kan få det att använda this. istället. if(regularshop) {dens speed(egen variabel för speed?)}

            EnemyProperties.canvas.drawImage(GameProperties.enemySprite1, 0, 0, 700, 700,EnemyProperties.Enemies[i].x, EnemyProperties.Enemies[i].y += EnemyProperties.Enemies[i].speed ,
                EnemyProperties.Enemies[i].width, EnemyProperties.Enemies[i].height);

                                                                       //när jag böt från this. till Enemies i arrayen försvann speedcontrol
           /* EnemyProperties.canvas.fillRect(EnemyProperties.Enemies[i].x, EnemyProperties.Enemies[i].y += EnemyProperties.Enemies[i].speed ,
                EnemyProperties.Enemies[i].width, EnemyProperties.Enemies[i].height);*/



        /**
         * fienden spawnar högst upp i rutan om den når botten
         */
        if(EnemyProperties.Enemies[i].y > window.innerHeight) {

            if(EnemyProperties.Enemies[i] = RegularEnemy ) {

                spawnEnemy(2);
               /* EnemyProperties.Enemies[i] = new RegularEnemy(EnemyProperties.Enemies[i].x, EnemyProperties.Enemies[i].y += EnemyProperties.Enemies[i].speed,
                    EnemyProperties.Enemies[i].width, EnemyProperties.Enemies[i].height);*/
            }

            /*if(GameProperties.life>=0){
                GameProperties.life-=1;
                CallGameOver = true;
            }
            console.log(GameProperties.life);
*/
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