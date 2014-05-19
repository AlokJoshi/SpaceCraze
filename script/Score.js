/**
 *
 * @type {{init: init}}
 */
var Score = {
    score : 0,
    minusScoreTrue : false,

    init: function (blastY,enemyY) {

        var digit = document.getElementById('digit');

        var ScorePoints = (blastY / enemyY + plusSpeedCounter);
        this.score += ScorePoints;

        if(Score.minusScoreTrue = true) {
            this.score - 50;
        }

        digit.innerHTML = this.score.toFixed(2);
    }
}
//gjord till en global variabel
Score.prototype.score = 0;

window.onload = Score.init();
