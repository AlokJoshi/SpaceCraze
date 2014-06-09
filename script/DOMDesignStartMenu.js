/**
 * Created by erikmagnusson on 30/05/14.
 */
/**
 *
 * @constructor
 * ritar ut startmenyn
 */
this.DOMClassStartMenu =  function(){
    /**
     *
     * @type {HTMLElement}
     */
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
    gameStartPlay.setAttribute('id','startGame');
    PlayerAlias.setAttribute('id','PlayerAlias');
    Highscore.setAttribute('id','Highscore');
    gameStartMenu.style.boxShadow = "1px 0px 50px #ffffff";

    gameContainer.appendChild(gameStartMenu);
    gameStartMenu.appendChild(gameOverHeader);

    var headerWidth = window.innerWidth/6;
    var headerHeight = window.innerHeight/6;
    GameProperties.canvas.drawImage(GameProperties.spriteBundle,  0, 429, 700 ,120, 211, 110, 700, 200);

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
    /**
     *
     * @type {number}
     * interval för skenet i startmnyn
     */
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
    /**
     * eventlisterner för att lyssna på knapptryck i startmenyn
     */
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
                    startGame();
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


            startGame();
            GameProperties.pressedKeys[72].disabled;
            GameProperties.pressedKeys[67].disabled;

        }
        if (GameProperties.pressedKeys[80]) {

            GameProperties.rendering = false;
            clearInterval(WeaponProperties.blastInterval);
            clearInterval(EnemyProperties.EnemyInterval);
            clearInterval(EnemyProperties.RareEnemyInterval);
            clearInterval(EnemyProperties.RarestEnemyInterval);
        }
    });
    window.addEventListener('keyup', function(e) {
        GameProperties.pressedKeys[e.keyCode] = false;
    });
}

