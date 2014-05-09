/**
 *
 * @type {{init: init}}
 */
var Score = {

    init: function (enemyY,blastY) {
        var score = document.getElementById('Score');
        var digit = document.getElementById('digit');
        score.appendChild(digit);

        /*console.log(enemyY);
        console.log(blastY);
        console.log(enemyY+blastY);*/

        var oldScore = ScorePoints;
        var ScorePoints = (enemyY + blastY);
        var totSCore = oldScore + ScorePoints;

        console.log(totSCore);
        digit.innerHTML = totSCore.toFixed(2);
    }
}

function Score() {
};

/**
 *
 * @param enemyYCount
 * @constructor
 */
function ScoreCount(enemyYCount){

}
window.onload = Score.init();
