var weaponProperties = {
    canvas : "",
    RegularBlast : null,
    rendering :false,
    Blasts : [],
    currentBlast: 0,
    shipx : 0,
    shipy : 0,

    init:function() {

        var canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'weaponCanvas');
        var gameContainer = document.getElementById('gameContainer')
        weaponProperties.canvas = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gameContainer.appendChild(canvas);
        weaponProperties.canvas.fillStyle = 'white';
        weaponProperties.RegularBlast = new RegularBlast();
        weaponStart();
        BlastControl();
    }
}
function Weapons() {
}

function BlastControl() {
    console.log('2');
    var blastInterval = setInterval(function(){
        Blast(1);

    }, 1000);
}

function RegularBlast() {
    this.speed = 5;
    this.x = weaponProperties.shipx;
    this.y = weaponProperties.shipy;
    console.log(this.x, this.y);
    this.width = 2;
    this.height = 2;
    console.log('3');
}

function Blast(amount) {
    this.currentBlast = 0;

    for(var i=0;i<amount;i++) {
        weaponProperties.Blasts[weaponProperties.currentBlast] = new RegularBlast();
        weaponProperties.currentBlast++;
        console.log('4');
    }
}

RegularBlast.prototype.render = function() {
    weaponProperties.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < weaponProperties.Blasts.length; i++) {

        weaponProperties.canvas.fillRect(weaponProperties.Blasts[i].x, weaponProperties.Blasts[i].y,
            weaponProperties.Blasts[i].width, weaponProperties.Blasts[i].height);
        console.log('5');
    }
}

function weaponStart() {
    weaponProperties.rendering = true;
    console.log('6');
}
RegularBlast.prototype.BlastMovement = function() {

    if (weaponProperties.rendering) {
        for (var i = 0; i < weaponPropteries.Blasts.length; i++) {
        }
        weaponProperties.Blasts[i].y -= this.speed;
        console.log('7');
    }
}


window.onload = weaponProperties.init();