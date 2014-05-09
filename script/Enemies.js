/**
 *
 * @type {{canvas: string, RegularEnemy: null, rendering: boolean, Enemies: Array, CurrentEnemy: number, init: init}}
 */
var EnemyProperties = {
    canvas : "",
    RegularEnemy : null,
    RareEnemy : null,
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
        EnemyProperties.RareEnemy = new new RareEnemy();

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
/**
 *
 * @constructor
 * vanligaste fienden
 */
function RegularEnemy() {
    this.speed = 0.4;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 20;
    this.height = 20;
}
/**
 *
 * @constructor
 * en fiende som inte spawnar lika ofta som regularenemy
 */
function RareEnemy() {
    this.speed = 0.4;
    this.x = Math.random()*window.innerWidth;
    this.y = 40;
    this.width = 10;
    this.height = 10;
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
/**
 * Ritar ut fienderna på randompositioner.
 * Om en fiende klarar sig hela vägen ner så skapas den åter högst upp på ny random position
 */
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
/**
 *ny RareEnemy. om den når botten på skärmen så skapas 2 nya av den.
 */
RareEnemy.prototype.render = function() {
    EnemyProperties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var v = 0; v < EnemyProperties.Enemies.length; v++) {

        EnemyProperties.canvas.fillRect(EnemyProperties.Enemies[v].x, EnemyProperties.Enemies[v].y += this.speed,
            EnemyProperties.Enemies[v].width, EnemyProperties.Enemies[v].height);

        if(EnemyProperties.Enemies[v].y > window.innerHeight) {

            EnemyProperties.Enemies[v] = new RareEnemy(EnemyProperties.Enemies[v].x, EnemyProperties.Enemies[v].y += this.speed,
                EnemyProperties.Enemies[v].width, EnemyProperties.Enemies[v].height);

            EnemyProperties.Enemies[v] = new RareEnemy(EnemyProperties.Enemies[v].x, EnemyProperties.Enemies[v].y += this.speed,
                EnemyProperties.Enemies[v].width, EnemyProperties.Enemies[v].height);

        if(EnemyProperties.Enemies[v].x >= EnemyProperties.Enemies[v].x -30 || EnemyProperties.Enemies[v].x <= EnemyProperties.Enemies[v].x +30) {

            EnemyProperties.Enemies[v] = new RareEnemy(EnemyProperties.Enemies[v].x, EnemyProperties.Enemies[v].y += this.speed,
                EnemyProperties.Enemies[v].width, EnemyProperties.Enemies[v].height);
        }
        }
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