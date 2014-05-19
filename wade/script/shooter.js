App = function()
{
    var ship;
    this.load = function()
    {
        wade.loadImage('image/ship.png');
    };

    this.init = function()
    {
        var sprite = new Sprite('image/ship.png');
        ship = new SceneObject(sprite, 50, 50, 50);
        wade.addSceneObject(ship);

    };
    this.onMouseMove = function(eventData)
    {
        ship.setPosition(eventData.screenPosition.x, eventData.screenPosition.y);
    };
    var sprite = new Sprite('image/ship.png');
    var mousePosition = wade.getMousePosition();
    ship = new SceneObject(sprite, 0, mousePosition.x, mousePosition.y);
    wade.addSceneObject(ship);
}
