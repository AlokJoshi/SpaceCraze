/**
 * Created by erikmagnusson on 30/05/14.
 */

/**
 *
 * @constructor
 */
this.DOMClassEndMenu =  function(){
    GameProperties.GameOverBool = true;
    GameProperties.rendering = false;
    /**
     *
     * @type {HTMLElement}
     */
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