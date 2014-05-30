/**
 *
 * @type {{canvas: string, RegularBlast: null, rendering: boolean, Blasts: Array, currentBlast: number, init: init}}
 */
var WeaponProperties = {
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
        WeaponProperties.canvas = canvas.getContext('2d');
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
    WeaponProperties.blastInterval = setInterval(function(){
        Blast(1);
        document.getElementById('audio').play();

    }, 180);

    WeaponProperties.blastInterval = setInterval(function(){
        ;
        document.getElementById('audio').play();

    }, 100);
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
    WeaponProperties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i=0;i<WeaponProperties.Blasts.length;i++) {
        //skriver ut skotten från array

            WeaponProperties.Blasts[i].render();

       //tar bort skottet från arrayen om det lämnar skärmen
        if(WeaponProperties.Blasts[i].y-10000 > window.innerHeight) {
            WeaponProperties.Blasts.splice(i,1);
        }
        else if(WeaponProperties.Blasts[i].y > window.innerHeight+1000) {
            WeaponProperties.Blasts.splice(i,1);
        }

    }
}

function drawBlastSprite() {

    WeaponProperties.BlastSprite = new Image()
    WeaponProperties.BlastSprite.src = 'Img/Blast.png';
    WeaponProperties.BlastSprite.onload = function() {
        WeaponProperties.init();
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
        WeaponProperties.Blasts[WeaponProperties.currentBlast] = new RegularBlast();
        WeaponProperties.currentBlast++;
    }
}
/**
 * renderfunktionen som bestämmmer hur skotten ska röra sig och från vart
 */
RegularBlast.prototype.render = function() {

    WeaponProperties.canvas.fillRect(this.x, this.y -= this.speed, this.width, this.height);
    WeaponProperties.canvas.drawImage(WeaponProperties.BlastSprite, 100, 50,550,650, this.x, this.y, this.width, this.height);


}

function weaponStart() {
    WeaponProperties.rendering = true;
}

window.onload = drawBlastSprite();