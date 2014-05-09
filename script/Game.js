//skapar allt som ja vill använd amig av för spelare och fiender

/**
 *
 * @type {{canvas: string,
 * ship: null,
 * RegularBlast: null,
 * rendering: boolean,
 * pressedKeys: Array,
 * sprite: null,
 * init: init}}
 */
var GameProperties = {
    canvas : "",
    ship : null,
    RegularBlast : null,
    rendering: false,
    pressedKeys : [],
    sprite : null,

    //skapar spelets canvas för en spelare och lägger in det till indexfil
    //skapar instans av spelaren
    //startar spelet
    //skapar en eventlistener för att styra spelet med knapptryck

    init:function(){

        var canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'gameCanvas');
        var gameContainer = document.getElementById('gameContainer');
        GameProperties.canvas =  canvas.getContext('2d');
        var ctx = canvas.getContext('2d');
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

                GameProperties.ship.speed = 15;

            }
            if(ifkeydown==8) {

                GameProperties.ship.speed = 25;

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

/**
 *
 * @constructor
 */
function Game(){

}
/**
 *
 */
function drawSprite() {

    GameProperties.sprite = new Image();
    GameProperties.sprite.src = 'Img/ship1.png';

    GameProperties.sprite.onload = function() {
        GameProperties.init();
    };
}


/**
 * Ship är själva spelarobjektet
 */
function Ship() {
    this.speed = 5;
    this.x = 600;
    this.y = 500;
    this.width = 50;
    this.height = 50;
}

/**
 * tar bort det som tidigare ritats ut och ritar ut det igen.
 */
Ship.prototype.render = function() {
    GameProperties.canvas.clearRect(0,0,window.innerWidth,window.innerHeight);
    GameProperties.canvas.drawImage(GameProperties.sprite, 0,0,50,50, this.x,this.y,this.width, this.height);
    this.moving();
}
/**
 * Gameloopen.
 */
function gameLoop() {

    if (GameProperties.rendering) {
        GameProperties.ship.render();
        //weaponProperties.RegularBlast.render();
        renderBlasts();
        position();
        EnemyProperties.RegularEnemy.render();
        aniSmooth(gameLoop);

    }
}
/**
 *
 * @constructor startar spelet
 */
function StartGame() {
    GameProperties.rendering = true;
    gameLoop();
    spawnEnemyControl();
    spawnRareEnemyControl();
    BlastControl();

}

//Tagen från paul irish
var aniSmooth = window.requestAnimationFrame      ||
        window.webkitRequestAnimationFrame        ||
        window.mozRequestAnimationFrame           ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
};


/**
 *funktion för alla knaptryck som användaren kommer använda sig av
 */
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
        EnemyProperties.RegularEnemy.speed+=0.25;

    }
    if (GameProperties.pressedKeys[50]) {

        velocityDowngrade(plusSpeedCounter-=30);
        EnemyProperties.RegularEnemy.speed-=0.25;

    }
    if (GameProperties.pressedKeys[82]) {

        randomise();
    }
}

/**
 *Läserna av när den nädrykta tangenten inte är det längre och stannar spelaren
 *
 * @param e
 *
 */
Ship.prototype.still = function(e) {
    if(GameProperties.pressedKeys[e]) {
        GameProperties.ship.x = GameProperties.ship.x;
    }
}
/**
 * hämtar ut positionen för det olika objekten i canvaserna
 * Enemie/blast
 * Enemie/Player
 *Färdiga
 * PLayer/blast. Kvar
 */
function position() {

    for (var i=0; i < EnemyProperties.Enemies.length; i++)
    {

        for (var j=0; j < weaponProperties.Blasts.length; j++)
        {

            if (Collision(EnemyProperties.Enemies[i], weaponProperties.Blasts[j]))
            {
                Score.init(EnemyProperties.Enemies[i].y, weaponProperties.Blasts[j].y);
                EnemyProperties.Enemies.splice(i,1);


            }
            if (Collision(EnemyProperties.Enemies[i],GameProperties.ship))
            {
                EnemyProperties.Enemies.splice(i,1);
            }
        }
    }
}

/**
 * ekvationer för när och hur objekten ska tas bort
 *
 * @param item1
 * @param item2
 * @returns {boolean}
 * @constructor
 */
function Collision(item1,item2) {

    if(item1 === undefined || item2 === undefined)
    {
        return false;
    }
    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y >= item1.y && item2.y <= (item1.y + item1.height))
    {
        return true;
    }
    else {
        return false;
    }
    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y+40 <= item1.height && item2.y+40 >= (item1.y+40 + item1.height))
    {
        return false;
    }
    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y >= item1.height && item2.y <= (item1.y + item1.height))
    {
        return true;
    }
}

window.onload = drawSprite();


