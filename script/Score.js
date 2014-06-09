/**
 *
 * @type {{init: init}}
 */
var Score = {
    score : 0,
    minusScoreTrue : false,
    /**
     * tar emot poäng från de avverakde fienderna
     * @param points
     */
    init: function (points) {

        var digit = document.getElementById('digit');

        var ScorePoints = (points + plusSpeedCounter);
        this.score += ScorePoints;

        digit.innerHTML = this.score.toFixed(2);
    }
}
//gjord till en global variabel
Score.prototype.score = 0;

window.onload = Score.init();
