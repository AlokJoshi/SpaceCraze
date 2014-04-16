App = function()
{
    var ship;

    this.load = function()
    {
        wade.loadImage('Img/ship.png');
    };

    this.init = function()
    {

        var sprite = new Sprite('Img/ship.png');
        ship = new SceneObject(sprite, 0, 0, 0);
        wade.addSceneObject(ship);
    };
};