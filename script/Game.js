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
     * blast och enemy colision. enemy splice
     */
    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y >= item1.y && item2.y <= (item1.y + item1.height))
    {
        return true;
    }
    else {
        return false;
    }
    /**
     * om en fiende befinner sig bakom spelaren ska den inte spliceas
     */
    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y <= item1.height && (item2.y + item2.height+100) >= (item1.y + item1.height))
    {
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
     * om en fiende och spelare träffas så spliceas fienden
     */

    if((item2.x + item2.width) >= item1.x  && item2.x <= (item1.x + item1.width) &&
        item2.y >= item1.height && item2.y <= (item1.y - item1.height))
    {
        return true;
    }
}




function gameOver() {
    GameProperties.GameOverBool = true;
    GameProperties.rendering = false;
    var gameContainer = document.getElementById('gameContainer');

    var gameOver = document.createElement('div');
    var gameOverHeader = document.createElement('h1');
    var gameOverScore = document.createElement('span');
    var gameOverPlayerName = document.createElement('span');
    var gameOverPlayAgain = document.createElement('span');
    var gameOverSubmitScore = document.createElement('span');

    //var gameOverHeaderText = document.createTextNode('SpaceCraze');
    GameProperties.spriteBundle.src = 'Img/spritez.png';
    var gameOverScorePoints = document.createTextNode('Your score: ' + Score.score.toFixed(2) + ' points');
    var gameOverPayerAlias = document.createTextNode('Your Alias: '+ GameProperties.playerAlias);
    var gameOverPlayAgainText = document.createTextNode('Want to play again? - press "N"');
    var gameOverSubmitScoreText = document.createTextNode('Do you want to submit your score? - Press "J"');

    gameOver.setAttribute('id', 'gameOver');
    gameOverHeader.setAttribute('id', 'headerSpan');
    gameOverScore.setAttribute('id', 'gameOverScore');
    gameOverPlayerName.setAttribute('id', 'gameOverPlayerName');
    gameOverPlayAgain.setAttribute('id', 'gameOverPlayAgain');
    gameOverSubmitScore.setAttribute('id', 'gameOverSubmitScore');
    gameOver.style.boxShadow = "1px 0px 200px #ffffff";

    gameContainer.appendChild(gameOver);

    gameOver.appendChild(gameOverHeader);
    GameProperties.canvas.drawImage(GameProperties.spriteBundle, 0, 429, 700 ,120, 211, 110, 700, 200);

    gameOver.appendChild(gameOverScore);
    gameOverScore.appendChild(gameOverScorePoints);

    gameOver.appendChild(gameOverPlayerName);
    gameOverPlayerName.appendChild(gameOverPayerAlias);

    gameOver.appendChild(gameOverPlayAgain);
    gameOverPlayAgain.appendChild(gameOverPlayAgainText);

    gameOver.appendChild(gameOverSubmitScore);
    gameOverSubmitScore.appendChild(gameOverSubmitScoreText);

    var shadowEffectCounter = 0;

        var clearShadow = setInterval(function(){

            if(shadowEffectCounter === 10) {
                clearInterval(clearShadow);
            }
            if(shadowEffectCounter === 1) {
                gameOver.style.boxShadow = "10px 0px 120px #ffffff";

                if(shadowEffectCounter>=1) {
                    shadowEffectCounter=0;
                }
            }
            else if(shadowEffectCounter===0) {
                gameOver.style.boxShadow = "-5px 0px 200px #ffffff";
                shadowEffectCounter++;
            }
            setTimeout(function(){shadowEffectCounter=10;},30000);
        },1000);
        window.addEventListener('keydown', function(e) {

            if(GameProperties.pressedKeys[83]) {
            GameProperties.pressedKeys[83].disabled;
            }

            if(GameProperties.pressedKeys[78] && !GameProperties.rendering) {
                location.reload();
                gameContainer.removeChild(gameOver);
                GameProperties.pressedKeys[e.keyCode] = true;
            }
            if(e.keyCode===74){
                console.log('j');

              /*  var UpdatedHighscoreList = localStorage.setItem('Highscore', HighscoreList + ' Alias: '+GameProperties.playerAlias +'  -  Score:  ' + Score.score.toFixed(2)+ '\n');
                var HighscoreList1 = localStorage.getItem('Highscore');
                GameProperties.HighScoreArray = HighscoreList1.split("\n");
                console.log(GameProperties.HighScoreArray);*/

                GameProperties.HighScoreObject = {
                    Alias : GameProperties.playerAlias,
                    Score : Score.score
                }

                var HighscoreList = localStorage.getItem('Highscore');
                //GameProperties.HighScoreArray = JSON.parse(HighscoreList);

                if(HighscoreList===null){
                    localStorage.setItem('Highscore', JSON.stringify(GameProperties.HighScoreArray));
                }
                var retrievedList = localStorage.getItem('Highscore');

                GameProperties.HighScoreArray = JSON.parse(retrievedList);

                GameProperties.HighScoreArray.push(GameProperties.HighScoreObject);
                console.log(GameProperties.HighScoreArray);
                var UpdatedHighscoreList = localStorage.setItem('Highscore', '\n'+JSON.stringify(GameProperties.HighScoreArray));

                var retrievedHighscoreList = localStorage.getItem('Highscore');
                var parsedHighscoreLists = JSON.parse(retrievedHighscoreList);

                parsedHighscoreLists.sort(function(a, b){return b.Score- a.Score});
                console.log(parsedHighscoreLists);
                for (var i = 0; i < parsedHighscoreLists.length; i++) {

                    GameProperties.HighScoreArray[i] =  '\n' + 'Alias: ' + parsedHighscoreLists[i].Alias + ' | Score:' + parsedHighscoreLists[i].Score;
                }

                var HighScoreDiv = document.createElement('div');
                var HighScoreSpan = document.createElement('span');

                HighScoreDiv.setAttribute('id', 'HighScoreDiv')
                HighScoreSpan.setAttribute('id', 'HighScoreSpan')
                var retrievedHighscoreList = localStorage.getItem('Highscore');

                var HighScoreText = document.createTextNode(GameProperties.HighScoreArray);

                gameContainer.appendChild(HighScoreDiv);
                HighScoreDiv.appendChild(HighScoreSpan);

                HighScoreSpan.appendChild(HighScoreText);

            }
            if(GameProperties.pressedKeys[18] && GameProperties.pressedKeys[79]){


               localStorage.clear('Highscore')
            }

        });
        window.addEventListener('keyup', function(e) {
            GameProperties.pressedKeys[e.keyCode] = false;
        });
}

function gameStartMenu() {

    GameProperties.rendering = false;
    var gameContainer = document.getElementById('gameContainer');

    var gameStartMenu = document.createElement('div');
    var gameOverHeader = document.createElement('h1');
    var gameStartmenuPlayerName = document.createElement('input');
    var gameStartPlay = document.createElement('span');
    var Controls = document.createElement('span');
    var PlayerAlias = document.createElement('span');
    var Highscore = document.createElement('span');

    var gameOverPayerAlias = document.createTextNode('');
    var gameStartPlayText = document.createTextNode('Start Game - Press "Enter"');
    var ControlsText = document.createTextNode('How to play - Press "C"');
    var playerAliasText = document.createTextNode('Choose your Alias wisely');
    var HighscoreText = document.createTextNode('Check your highscore - Press "H"');

    gameStartMenu.setAttribute('id', 'gameStartMenu');
    gameOverHeader.setAttribute('id', 'headerSpan');
    gameStartmenuPlayerName.setAttribute('id', 'gameStartmenuPlayerName');
    Controls.setAttribute('id', 'Controls');
    gameStartPlay.setAttribute('id','StartGame');
    PlayerAlias.setAttribute('id','PlayerAlias');
    Highscore.setAttribute('id','Highscore');
    gameStartMenu.style.boxShadow = "1px 0px 50px #ffffff";

    gameContainer.appendChild(gameStartMenu);
    gameStartMenu.appendChild(gameOverHeader);

    GameProperties.canvas.drawImage(GameProperties.spriteBundle, 0, 429, 700 ,120, 211, 110, 700, 200);

    gameStartMenu.appendChild(gameStartmenuPlayerName);
    gameStartmenuPlayerName.appendChild(gameOverPayerAlias);

    gameStartMenu.appendChild(gameStartPlay);
    gameStartPlay.appendChild(gameStartPlayText);

    gameStartMenu.appendChild(Controls);
    Controls.appendChild(ControlsText);

    gameStartMenu.appendChild(PlayerAlias);
    PlayerAlias.appendChild(playerAliasText);

    gameStartMenu.appendChild(Highscore);
    Highscore.appendChild(HighscoreText);

    var shadowEffectCounter = 0;
    var clearShadow = setInterval(function(){

        if(shadowEffectCounter === 10) {
            clearInterval(clearShadow);
        }
        if(shadowEffectCounter === 1) {
            gameStartMenu.style.boxShadow = "5px 0px 120px #ffffff";

            if(shadowEffectCounter>=1) {
                shadowEffectCounter=0;
            }
        }
        else if(shadowEffectCounter===0) {
            gameStartMenu.style.boxShadow = "-5px 0px 200px #ffffff";
            shadowEffectCounter++;
        }
        setTimeout(function(){shadowEffectCounter=10;},30000);
    },1000);
    window.addEventListener('keydown', function(e) {
        var gameContainer = document.getElementById('gameContainer');
        var HighScoreDiv = document.getElementById('HighScoreDiv');
        var GameControls = document.getElementById('GameControls');


        if (GameProperties.GameOverBool === false) {
            if (GameProperties.shipcount <= 0) {
                if (GameProperties.pressedKeys) {
                    GameProperties.playerAlias = document.getElementById("gameStartmenuPlayerName").value;
                }
            }
            if (GameProperties.playerAlias.length >= 3) {
                if (GameProperties.pressedKeys[13] && !GameProperties.rendering) {
                    gameContainer.removeChild(gameStartMenu);
                    StartGame();
                    GameProperties.pressedKeys[e.keyCode] = true;
                }
            }
            if(GameProperties.pressedKeys[13] && GameProperties.playerAlias.length < 3){
                var NotValidAlias = document.createElement('span');
                var NotValidAliasText = document.createTextNode('Not a valid Alias. You need atleast 3 symbols');

                NotValidAlias.setAttribute('id','NotValidAlias');
                gameContainer.appendChild(NotValidAlias);
                NotValidAlias.appendChild(NotValidAliasText);

                setTimeout(function(){gameContainer.removeChild(NotValidAlias)},3000);

            }
        }
        if(GameProperties.GameOverBool === false) {
            if (GameProperties.pressedKeys[67] && !GameProperties.rendering) {
                if(gameContainer.contains(GameControls)){
                    gameContainer.removeChild(GameControls);
                }
                    var GameControls = document.createElement('div');
                    var GameControlsSpan = document.createElement('span');
                    GameControls.setAttribute('id', 'GameControls')
                    var GameControlsText = document.createTextNode('Controls');
                    /*gameContainer.appendChild(GameControls);
                    GameControls.appendChild(GameControlsSpan);
                    GameControlsSpan.appendChild(GameControlsText);*/

                    GameProperties.canvas.drawImage(GameProperties.ControlSprite, 0, 0, 400 ,400, 0, 100, 400, 400);
                    GameProperties.pressedKeys[e.keyCode] = true;
            }
            if (GameProperties.pressedKeys[72] && !GameProperties.rendering) {
                if(gameContainer.contains(HighScoreDiv)){
                    gameContainer.removeChild(HighScoreDiv);
                }
                console.log('H');
                //var numberPattern = /\d+/g;
                var HighScoreDiv = document.createElement('div');
                var HighScoreSpan = document.createElement('span');
                //var GameControlsHeader = document.createTextNode('h1');

                HighScoreDiv.setAttribute('id', 'HighScoreDiv')
                HighScoreSpan.setAttribute('id', 'HighScoreSpan')
                HighScoreSpan.innerHTML="Highscore";
                var retrievedHighscoreList = localStorage.getItem('Highscore');
                var parsedHighscoreLists = JSON.parse(retrievedHighscoreList);

                parsedHighscoreLists.sort(function(a, b){return b.Score- a.Score});
                console.log(parsedHighscoreLists);
                for (var i = 0; i < parsedHighscoreLists.length; i++) {

                    GameProperties.HighScoreArray[i] =  '\n' + 'Alias: ' + parsedHighscoreLists[i].Alias + ' | Score:' + parsedHighscoreLists[i].Score;
                }
                var HighScoreText = document.createTextNode(GameProperties.HighScoreArray);

                gameContainer.appendChild(HighScoreDiv);
                HighScoreDiv.appendChild(HighScoreSpan);

                HighScoreSpan.appendChild(HighScoreText);


                GameProperties.pressedKeys[e.keyCode] = true;
            }
        }
        if (e.keyCode===83 && GameProperties.shipcount >3 && !GameProperties.rendering) {


            StartGame();
            GameProperties.pressedKeys[72].disabled;
            GameProperties.pressedKeys[67].disabled;

        }
        if (GameProperties.pressedKeys[80]) {

            GameProperties.rendering = false;
            clearInterval(weaponProperties.blastInterval);
            clearInterval(EnemyProperties.EnemyInterval);
            clearInterval(EnemyProperties.RareEnemyInterval);
            clearInterval(EnemyProperties.RarestEnemyInterval);
        }
    });
    window.addEventListener('keyup', function(e) {
        GameProperties.pressedKeys[e.keyCode] = false;
    });
}
window.onload = drawSprite();
