/**
 *
 * @type {{init: init}}
 */
var Score = {
    score : 0,

    init: function (enemyY,blastY) {

        var digit = document.getElementById('digit');
        /*console.log(enemyY);
        console.log(blastY);
        console.log(enemyY+blastY);*/

        var ScorePoints = (blastY / enemyY + plusSpeedCounter);
        this.score += ScorePoints;

        digit.innerHTML = this.score.toFixed(2);
    }
}
//gjord till en global variabel
Score.prototype.score = 0;


window.onload = Score.init();
