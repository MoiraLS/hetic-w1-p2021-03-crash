var room;
var player;
var position;
var robotOne;
var robotTwo;
var laserOne;
var doorOne;
var doorTwo;
var doorOffice;
var doorControl;
var doorExit;
var doorFirst;
var canPressZ = true;

// Enter the game when pressing enter, if not already in it

oxo.inputs.listenKey('enter', function () {
  if (oxo.screens.getCurrentScreen !== 'game') {
    oxo.screens.loadScreen('game', game);
  }
});

function game(from) {
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
  doorControl = document.getElementById('doorControl');
  doorExit = document.getElementById('doorExit');
  doorFirst = document.getElementById('doorFirst');

  var wallRight = oxo.elements.createElement({
    type: 'div',
    class: 'room__wall room__wall--right',
    styles: {
      transform: 'translate(1030px, 80px)'
    },
    obstacle: true,
    appendTo: '.room'
  });

  var wallBottom = oxo.elements.createElement({
    type: 'div',
    class: 'room__wall room__wall--bottom',
    styles: {
      transform: 'translate(100px, 640px)'
    },
    obstacle: true,
    appendTo: '.room'
  });

  var wallVaultRoom = oxo.elements.createElement({
    type: 'div',
    class: 'roomVault__wall--bottom',
    styles: {
      transform: 'translate(100px, 200px)'
    },
    obstacle: true,
    appendTo: '.room'
  });

  var wallVaultRoom1 = oxo.elements.createElement({
    type: 'div',
    class: 'roomVault__wall--right',
    styles: {
      transform: 'translate(420px, 90px)'
    },
    obstacle: true,
    appendTo: '.room'
  });

  var collision = true;

  if (from === 'office') {
    oxo.animation.setPosition(player, {x: 43, y: 476});
  } else if (from === 'control') {
    oxo.animation.setPosition(player, {x: 800, y: 80});
  } else {
    oxo.animation.setPosition(player, {x: 300, y: 510});
  }

  if (collision) {
    oxo.animation.moveElementWithArrowKeys(player, 150); // Speed of the player
  }

  oxo.elements.onCollisionWithElement(player, doorOffice, goOffice);
  oxo.elements.onCollisionWithElement(player, doorControl, goControl);

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

function goOffice() {
  oxo.screens.loadScreen('office', office);
}

function goControl() {
  oxo.screens.loadScreen('control', control);
}

/* Function Office to Reception */
function goReception() {
  oxo.screens.loadScreen('game', function() {game('office')});
}
function goReception1() {
  oxo.screens.loadScreen('game', function() {game('control')});
}

function goControl() {
  oxo.screens.loadScreen('control', control);
}

/* Function for the office */
function office() {
  player = document.getElementById('player');
  doorFirst = document.getElementById('doorFirst');
  var officeRoom = document.getElementById('officeRoom');

  var remote = document.querySelector('.officeRoom__remoteControl');
  oxo.elements.onCollisionWithElement(player, remote, function() {
    remote.remove();

    document.querySelector('.modalRemote').classList.add('visible'); // Pop-up remote
    var popup = document.querySelector('.modalRemote');
    oxo.elements.onCollisionWithElement(player, popup, function() {
      document.querySelector('.modalRemote').classList.remove('visible');
    });
    oxo.inputs.listenKey('z', desactivateLaser);
  })
  
  var wallRight = oxo.elements.createElement({
    type: 'div',
    class: 'officeRoom__wall officeRoom__wall--right',
    styles: {
      transform: 'translate(1030px, 80px)'
    },
    obstacle: true,
    appendTo: '.officeRoom'
  });

  var wallBottom = oxo.elements.createElement({
    type: 'div',
    class: 'officeRoom__wall officeRoom__wall--bottom',
    styles: {
      transform: 'translate(100px, 630px)'
    },
    obstacle: true,
    appendTo: '.officeRoom'
  });
  
  collision = true;

  oxo.animation.setPosition(player, {x: 910, y: 140});

  if (collision) {
    oxo.animation.moveElementWithArrowKeys(player, 150); // Speed of the player
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
}

/* Function for the control room */
function control() {
  player = document.getElementById('player');
  doorReception = document.getElementById('controlRoom__doorReception');
  var controlRoom = document.getElementById('controlRoom');
  
  var wallRight = oxo.elements.createElement({
    type: 'div',
    class: 'officeRoom__wall officeRoom__wall--right',
    styles: {
      transform: 'translate(1030px, 80px)'
    },
    obstacle: true,
    appendTo: '.officeRoom'
  });

  var wallBottom = oxo.elements.createElement({
    type: 'div',
    class: 'officeRoom__wall officeRoom__wall--bottom',
    styles: {
      transform: 'translate(100px, 630px)'
    },
    obstacle: true,
    appendTo: '.officeRoom'
  });
  
  collision = true;

  oxo.animation.setPosition(player, {x: 150, y: 110});

  if (collision) {
    oxo.animation.moveElementWithArrowKeys(player, 150); // Speed of the player
  }
  oxo.elements.onCollisionWithElement(player, doorReception, goReception1);

  oxo.elements.onCollisionWithElement(player, laserOne, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, laserTwo, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, robotOne, end); // Collision with a robot
  oxo.elements.onCollisionWithElement(player, robotTwo, end); // Collision with a robot
}

function desactivateLaser() {
  if (!canPressZ) {
    console.log('nope');
    return;
  } else if (canPressZ === true) {
    document.querySelector('.room__laser').classList.add('invisible');
  }

  canPressZ = false;
  console.log('Allez-y')

  setTimeout(activateLaser, 1000);

  setTimeout(function() {
    canPressZ = true;
  }, 3000);

  function activateLaser() {
    document.querySelector('.room__laser').classList.remove('invisible');
    document.querySelector('.room__laser').classList.add('visible');
  }
}

function end() {
  oxo.screens.loadScreen('end');
};