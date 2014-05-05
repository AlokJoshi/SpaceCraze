var Score = {

    init: function (enemyY,blastY) {
        var score = document.getElementById('Score');
        var digit = document.getElementById('digit');
        score.appendChild(digit);

        console.log(enemyY);
        console.log(blastY);
        console.log(enemyY+=blastY);

        var ScorePoints =+ (enemyY + blastY);

        digit.innerHTML = ScorePoints.toFixed(2);

    }
}

function ScoreCount(enemyYCount){



}

window.onload = Score.init();
