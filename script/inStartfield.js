/**
 * Created by erikmagnusson on 05/06/14.
 */
//  Create the starfield.
var container = document.getElementById('starfield');
var starfield = new Starfield();
starfield.initialise(container);
starfield.start();