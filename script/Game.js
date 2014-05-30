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
    shipSprite : null,
    healthBar : null,
    life : 3,
    restartGame : false,
    playerAlias : null,
    shipSpriteCounter : 0,
    sprite1 : null,
    shipcount : 0,
    GameOverBool : false,
    spriteBundle : null,
    UserScore : 0,
    HighScoreArray : [],
    HighScoreObject : {},
    pushObject : null,
    enemySprite1 : null,
    ControlSprite : null,
    DOMInstance : null,


    //skapar spelets canvas för en spelare och lägger in det till indexfil
    //skapar instans av spelaren
    //startar spelet
    //skapar en eventlistener för att styra spelet med knapptryck

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
        RegularEnemy(GameProperties.regularEnemySpeed);


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
        gameStartMenu();
    }
}

/**
 *
 * @constructor
 */
function Game(){
}
/**
 *laddar in bilder innan init() körs och spelet startar
 */
function drawSprite() {

    GameProperties.shipSprite = new Image();
    GameProperties.healthBar = new Image();
    GameProperties.spriteBundle = new Image();
    GameProperties.enemySprite1 = new Image();
    GameProperties.ControlSprite = new Image();
    GameProperties.shipSprite.src = 'Img/sprites2.png';
    GameProperties.healthBar.src = 'Img/healthBar.png';
    GameProperties.spriteBundle.src = 'Img/spritez.png';
    GameProperties.enemySprite1.src = 'Img/enemysprites1.png';
    GameProperties.ControlSprite.src = 'Img/howto.png';

    GameProperties.shipSprite.onload = function() {
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
    this.width = 100;
    this.height = 120;
    this.life = 3;
}

/**
 * tar bort det som tidigare ritats ut och ritar ut det igen.
 */
Ship.prototype.render = function() {
    GameProperties.canvas.clearRect(0,0,window.innerWidth,window.innerHeight);
    GameProperties.shipcount++;

    //sprites för animering av spelarskepp
   if (GameProperties.shipcount>0 && GameProperties.shipcount<=24) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 0, 0, 162, 215, this.x, this.y, this.width, this.height);
    }
    if (GameProperties.shipcount>24 && GameProperties.shipcount<=30) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 162, 0, 160, 215, this.x, this.y, this.width, this.height);
    }
    if (GameProperties.shipcount>30 && GameProperties.shipcount<=39) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 323, 0, 160, 215, this.x, this.y, this.width, this.height);
    }
    if (GameProperties.shipcount>39 && GameProperties.shipcount<=44) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 484, 0, 160, 215, this.x, this.y, this.width, this.height);
    }
    if (GameProperties.shipcount>44 && GameProperties.shipcount<=53) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 323, 0, 160, 215, this.x, this.y, this.width, this.height);
    }
    if (GameProperties.shipcount>53 && GameProperties.shipcount<=60) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 0, 0, 162, 215, this.x, this.y, this.width, this.height);
    }
    if (GameProperties.shipcount>60 && GameProperties.shipcount<=73) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 484, 0, 160, 215, this.x, this.y, this.width, this.height);
    }
    if (GameProperties.shipcount>73 && GameProperties.shipcount<=84) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 484, 0, 160, 215, this.x, this.y, this.width, this.height);
    }
    if (GameProperties.shipcount>84 && GameProperties.shipcount<=92) {
        GameProperties.canvas.drawImage(GameProperties.shipSprite, 484, 0, 160, 215, this.x, this.y, this.width, this.height);
        GameProperties.shipcount=18;
    }
    //SPrites för spelare liv
    if(GameProperties.life == 3){
    GameProperties.canvas.drawImage(GameProperties.spriteBundle, 30,750,171,700, 5,590,200, 600);
    }
    if(GameProperties.life == 2){
        GameProperties.canvas.drawImage(GameProperties.spriteBundle, 30,750,121,700, 5,590,140, 600);
    }
    if(GameProperties.life == 1){
        GameProperties.canvas.drawImage(GameProperties.spriteBundle, 30,750,71,700, 5,590,80, 600);
    }
    if(GameProperties.life == 1){
        GameProperties.canvas.drawImage(GameProperties.spriteBundle, 0,0,1,1, 5,590,80, 600);
    }
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
        //EnemyProperties.RareEnemy.render();
        aniSmooth(gameLoop);
        if(GameProperties.CallGameOver === true){
            gameOver();
        }
    }
}
/**
 *
 * @constructor startar spelet
 */
function StartGame() {
    var gameContainer = document.getElementById('gameContainer');
    var HighScoreDiv = document.getElementById('HighScoreDiv');
    var GameControls = document.getElementById('GameControls');
    if(gameContainer.contains(HighScoreDiv)){
        gameContainer.removeChild(HighScoreDiv);
    }
    if(gameContainer.contains(GameControls)){
        gameContainer.removeChild(GameControls);
    }




    GameProperties.rendering = true;
    gameLoop();
    spawnEnemyControl();
    spawnRareEnemyControl();
    spawnRarestEnemyControl();
    BlastControl();
    //spawnPowerupControl();

}
//Tagen från paul irish
var aniSmooth = window.requestAnimationFrame      ||
        window.webkitRequestAnimationFrame        ||
        window.mozRequestAnimationFrame           ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
};
/**
 *funktion för alla knapptryck som användaren kommer använda sig av.  inte bara för skeppet
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
    if (GameProperties.pressedKeys[87]) {

        randomise();
    }
    /**
     * gamesettings
     */
    if (GameProperties.pressedKeys[49]) {
        GameProperties.rendering = true;
        velocityUpgrade(plusSpeedCounter += 30);

        for (var i = 0; i < EnemyProperties.Enemies.length; i++) {

            EnemyProperties.Enemies[i].speed +=1;
        }
    }
    if (GameProperties.pressedKeys[50]) {

        velocityDowngrade(plusSpeedCounter -= 30);

        for (var i = 0; i < EnemyProperties.Enemies.length; i++) {

            EnemyProperties.Enemies[i].speed -= 1;
        }
    }
    if (GameProperties.pressedKeys[82]) {

     randomise();

    GameProperties.rendering = true;

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
 */
function position() {

    for (var i=0; i < EnemyProperties.Enemies.length; i++)
    {

        for (var j=0; j < weaponProperties.Blasts.length; j++)
        {
            /**
             * Skickar vidare yled till Scorescrptet.
             * ändrar plats på blasts
             * minskar liv80 vid kollison
             * splicear ur arrayerna
             */
            if (Collision(EnemyProperties.Enemies[i], weaponProperties.Blasts[j]))
            {
                weaponProperties.Blasts[j].x = +2000;
                EnemyProperties.Enemies[i].Life-=1;

                if(EnemyProperties.Enemies[i].Life === 0) {
                    Score.init(EnemyProperties.Enemies[i].points);

                    EnemyProperties.Enemies.splice(i, 1)

                }
            }
            if (Collision2(EnemyProperties.Enemies[i],GameProperties.ship))
            {
                Score.init(EnemyProperties.Enemies[i].points);
                if (EnemyProperties.Enemies.splice(i, 1)) {
                    GameProperties.life -= 1;
                }

                if(GameProperties.life <= 0) {
                    GameProperties.rendering = false;
                    gameOver();

                }
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
    /**
     * hittas inte objektet så ska det inte spliceas
     */
    if(item1 === undefined || item2 === undefined)
    {
        return false;
    }
    /**
     * blast och enemy kollision. enemy splice
     */
    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y >= item1.y && item2.y <= (item1.y + item1.height))
    {
        return true;
    }
    else {
        return false;
    }

}
function Collision2(item1,item2) {
    /**
     * hittas inte objektet så ska det inte spliceas
     */
    if(item1 === undefined || item2 === undefined)
    {
        return false;
    }
    /**
     * om en fiende befinner sig bakom spelaren ska den inte spliceas
     */
    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y <= item1.height && (item2.y + item2.height) >= (item1.y + item1.height))
    {
        return false;
    }
    /**
     * om en fiende och spelare träffas så spliceas fienden
     */
    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y >= item1.height && item2.y <= (item1.y - item1.height))
    {
        return true;
    }
}

function gameStartMenu() {
    GameProperties.rendering = false;
    GameProperties.DOMInstance = new DOMClassStartMenu();
}

function gameOver() {
    GameProperties.DOMInstance = new DOMClassEndMenu();
}

window.onload = drawSprite();
