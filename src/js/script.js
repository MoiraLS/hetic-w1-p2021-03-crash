var room;
var player;
var position;
var robotOne;
var robotTwo;
var laserOne;
var doorOne;
var doorTwo;
var doorOffice;
var doorExit;
var doorFirst;

// Enter the game when pressing enter, if not already in it

oxo.inputs.listenKey('enter', function () {
  if (oxo.screens.getCurrentScreen !== 'game') {
    oxo.screens.loadScreen('game', game);
  }
});

function game() {
  room = document.getElementById('room');
  player = document.getElementById('player');
  position = oxo.animation.getPosition(player);
  robotOne = document.getElementById('robotOne');
  robotTwo = document.getElementById('robotTwo');
  laserOne = document.getElementById('laserOne');
  laserTwo = document.getElementById('laserTwo');
  doorOne = document.getElementById('doorOne');
  doorTwo = document.getElementById('doorTwo');
  doorOffice = document.getElementById('doorOffice');
  doorExit = document.getElementById('doorExit');
  doorFirst = document.getElementById('doorFirst');

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

  oxo.animation.setPosition(player, {x: 300, y: 510});

  if (collision) {
    oxo.animation.moveElementWithArrowKeys(player, 100); // Speed of the player
  }

  oxo.elements.onCollisionWithElement(player, doorOffice, changeRoom);

  oxo.elements.onCollisionWithElement(player, laserOne, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, laserTwo, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, robotOne, end); // Collision with a robot
  oxo.elements.onCollisionWithElement(player, robotTwo, end); // Collision with a robot

  oxo.elements.onCollisionWithElement(player, wallBottom, function () {
    collision = false;
    console.log(collision);
  }); // Collision with a wall
};

/* Function reception to office */

function changeRoom() {
  oxo.screens.loadScreen('office', office);
}

function office() {
  player = document.getElementById('player');
  doorFirst = document.getElementById('doorFirst');
  var officeRoom = document.getElementById('officeRoom');
  
  wallRight = oxo.elements.createElement({
    type: 'div',
    class: '.room__wall .room__wall--right',
    obstacle: true,
    appendTo: 'body'
  });

  wallBottom = oxo.elements.createElement({
    type: 'div',
    class: '.room__wall .room__wall--bottom',
    obstacle: true,
    appendTo: 'body'
  });
  
  collision = true;

  oxo.animation.setPosition(player, {x: 910, y: 140});

  if (collision) {
    oxo.animation.moveElementWithArrowKeys(player, 100); // Speed of the player
  }
  oxo.elements.onCollisionWithElement(player, doorFirst, goReception);
  oxo.elements.onCollisionWithElement(player, laserOne, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, laserTwo, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, robotOne, end); // Collision with a robot
  oxo.elements.onCollisionWithElement(player, robotTwo, end); // Collision with a robot

  oxo.elements.onCollisionWithElement(player, wallRight, function () {
    collision = false;
    console.log('Bottom');
  }); // Collision with a wall

  document.getElementsByClassName('.room__laser').addEventListener('keypress', function () {
    
  })

}

/* Function Office to Reception */
function goReception() {
  oxo.screens.loadScreen('game', game);
}


function end() {
  oxo.screens.loadScreen('end');
};