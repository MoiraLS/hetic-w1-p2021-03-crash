var room;
var robotOne;
var robotTwo = document.getElementById('robot__two');
var laserOne;

// Donner la position initiale du joueur

// Enter the game when pressing enter, if not already in it
oxo.inputs.listenKey('enter', function () {
  if (oxo.screens.getCurrentScreen !== 'game') {
    oxo.screens.loadScreen('game', game);
  }
});

function game() {
  room = document.getElementById('room');
  robotOne = document.getElementById('robot__one');
  robotTwo = document.getElementById('robot__two');
  laserOne = document.getElementById('laser__one');
  laserTwo = document.getElementById('laser__two');

  var wallRight = oxo.elements.createElement({
    type: 'div',
    class: '.room__wall .room__wall--right',
    obstacle: true,
    appendTo: 'body'
  });

  var wallBottom = oxo.elements.createElement({
    type: 'div',
    class: '.room__wall .room__wall--bottom',
    obstacle: true,
    appendTo: 'body'
  });

  var collision = true;

  oxo.player.setScore(0);
  var player = document.getElementById('player');
  oxo.animation.setPosition(player, {x: 300, y: 555});
  var position = oxo.animation.getPosition(player);

  if(collision){
    oxo.animation.moveElementWithArrowKeys(player, 100); // Speed of the player
  }  

  oxo.elements.onCollisionWithElement(player, laserOne, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, laserTwo, end);// Collision with a laser
  oxo.elements.onCollisionWithElement(player, robotOne, end); // Collision with a robot
  oxo.elements.onCollisionWithElement(player, robotTwo, end); // Collision with a robot

  oxo.elements.onCollisionWithElement(player, wallBottom, function () {
    collision = false;
    console.log(collision);
  }); // Collision with a wall
};

function end() {
  oxo.screens.loadScreen('end');
};