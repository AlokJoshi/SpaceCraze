/**
 *
 * @type {{canvas: string, RegularBlast: null, rendering: boolean, Blasts: Array, currentBlast: number, init: init}}
 */
var weaponProperties = {
    canvas : "",
    RegularBlast : null,
    RegularEnemyBlast : null,
    rendering :false,
    Blasts : [],
    currentBlast: 0,
    enemyBlasts : [],
    BlastSprite : null,


    init:function() {
        //skapar canvas för vape och attribut för detta
        var canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'weaponCanvas');
        var gameContainer = document.getElementById('gameContainer')
        weaponProperties.canvas = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameContainer.appendChild(canvas);

        //startar spelet
        weaponStart();
    }
}
function Weapons() {
}
//interval för hur ofta skotten ska avfyras
function BlastControl() {
    weaponProperties.blastInterval = setInterval(function(){
        Blast(1);

    }, 180);
}

//vanliga skott
function RegularBlast() {
        this.speed = 5;
        this.x = GameProperties.ship.x+40;
        this.y = GameProperties.ship.y;
        this.width = 25;
        this.height = 25;
}


/**
 * suddar ut skott.
 */
function renderBlasts() {
    weaponProperties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i=0;i<weaponProperties.Blasts.length;i++) {
        //skriver ut skotten från array

            weaponProperties.Blasts[i].render();

       //tar bort skottet från arrayen om det lämnar skärmen
        if(weaponProperties.Blasts[i].y-200 > window.innerHeight) {
            weaponProperties.Blasts.splice(i,1);
        }
    }
}

function drawBlastSprite() {

    weaponProperties.BlastSprite = new Image()
    weaponProperties.BlastSprite.src = 'Img/Blast.png';
    weaponProperties.BlastSprite.onload = function() {
        weaponProperties.init();
    };
}
/**
 *
 * @param amount
 * @constructor
 * gör att varje skott i Blasts blir ett regularblast
 * räknar upp currentblast så det inte tas bort ett skott för varje nytt som skapas
 */
function Blast(amount) {
    for(var i=0;i<amount;i++) {
        weaponProperties.Blasts[weaponProperties.currentBlast] = new RegularBlast();
        weaponProperties.currentBlast++;
    }
}
/**
 * renderfunktionen som bestämmmer hur skotten ska röra sig och från vart
 */
RegularBlast.prototype.render = function() {

    weaponProperties.canvas.fillRect(this.x, this.y -= this.speed, this.width, this.height);
    weaponProperties.canvas.drawImage(weaponProperties.BlastSprite, 200, 200,350,350, this.x, this.y, this.width, this.height);


}

function weaponStart() {
    weaponProperties.rendering = true;
}

window.onload = drawBlastSprite();