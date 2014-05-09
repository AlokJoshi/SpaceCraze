/**
 *
 * @type {{canvas: string, RegularBlast: null, rendering: boolean, Blasts: Array, currentBlast: number, init: init}}
 */
var weaponProperties = {
    canvas : "",
    RegularBlast : null,
    rendering :false,
    Blasts : [],
    currentBlast: 0,

    init:function() {
        //skapar canvas för vape och attribut för detta
        var canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'weaponCanvas');
        var gameContainer = document.getElementById('gameContainer')
        weaponProperties.canvas = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameContainer.appendChild(canvas);

        //skotten är orangea
        weaponProperties.canvas.fillStyle = 'orange';
        //startar spelet
        weaponStart();
    }
}
function Weapons() {
}
//interval för hur ofta skotten ska avfyras
function BlastControl() {
    var blastInterval = setInterval(function(){
        Blast(1);

    }, 300);
}
//vanliga skott
function RegularBlast() {
        this.speed = 5;
        this.x = GameProperties.ship.x+20;
        this.y = GameProperties.ship.y-5;
        this.width = 5;
        this.height = 5;
}
/**
 * suddar ut skott.
 */
function renderBlasts() {
    weaponProperties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var i=0;i<weaponProperties.Blasts.length;i++) {
        //skriver ut skotten från array
        weaponProperties.Blasts[i].render();

       /*//tar bort skottet från arrayen om det lämnar skärmen
        if(weaponProperties.Blasts[i].y > window.innerHeight) {
            weaponProperties.Blasts.splice(i,1);
        }*/
    }
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



}

function weaponStart() {
    weaponProperties.rendering = true;

}

window.onload = weaponProperties.init();