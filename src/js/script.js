var room;
var player;
var position;
var robotOne;
var robotTwo;
var laserOne;
var doorOne;
var doorGoal;
var doorOffice;
var doorControl;
var terminal;
var doorReception;
var doorExit;
var doorFirst;
var canPressZ = true;
var bankData;

// Enter the game when pressing enter, if not already in it

oxo.inputs.listenKeyOnce('enter', function () {
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
  doorGoal = document.getElementById('doorGoal');
  doorOffice = document.getElementById('doorOffice');
  doorControl = document.getElementById('doorControl');
  doorExit = document.getElementById('doorExit');
  doorFirst = document.getElementById('doorFirst');
  bankData = document.getElementById('bankData');

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
      transform: 'translate(400px, 90px)'
    },
    obstacle: true,
    appendTo: '.room'
  });

  var collision = true;

  if (from === 'office') {
    oxo.animation.setPosition(player, {
      x: 43,
      y: 476
    });
  } else if (from === 'control') {
    oxo.animation.setPosition(player, {
      x: 900,
      y: 80
    });
  } else {
    oxo.animation.setPosition(player, {
      x: 300,
      y: 510
    });
  }

  if (collision) {
    oxo.animation.moveElementWithArrowKeys(player, 150); // Speed of the player
  }

  oxo.elements.onCollisionWithElement(player, doorOffice, goOffice);
  oxo.elements.onCollisionWithElement(player, doorControl, goControl);

  /* Password to enter in vaultRoom */
  oxo.elements.onCollisionWithElementOnce(player, doorGoal, function () {
    document.querySelector('.password').classList.add('visible'); // Pop-up password
    var password = document.querySelector('.password');
  });

  /* Take the bankData and left the game */
  document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (event.target.querySelector('input').value === 'secret') {
      wallVaultRoom1.classList.add('invisible');
      document.querySelector('.password').classList.remove('visible');
      oxo.elements.onCollisionWithElement(player, bankData, function () {
        bankData.remove();
        document.querySelector('.takeData').classList.add('visible'); // Pop-up bankData
        var takeData = document.querySelector('.takeData');
        oxo.elements.onCollisionWithElement(player, takeData, function () {
          document.querySelector('.takeData').classList.remove('visible');
        });
      });
      oxo.elements.onCollisionWithElement(player, doorExit, function () {
        oxo.screens.loadScreen('win');
      });
    }
  });

  oxo.elements.onCollisionWithElement(player, laserOne, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, laserTwo, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, robotOne, end); // Collision with a robot
  oxo.elements.onCollisionWithElement(player, robotTwo, end); // Collision with a robot

  oxo.elements.onCollisionWithElement(player, wallBottom, function () {
    collision = false;
  }); // Collision with a wall
};

/* Function reception to office */
function goOffice() {
  oxo.screens.loadScreen('office', office);
}

/* Function reception to control */
function goControl() {
  oxo.screens.loadScreen('control', control);
}

/* Function office to reception */
function goReception() {
  oxo.screens.loadScreen('game', function () {
    game('office')
  });
}

/* Function control to reception */
function goReception1() {
  oxo.screens.loadScreen('game', function () {
    game('control')
  });
}

/* Function for the office */
function office() {
  player = document.getElementById('player');
  doorFirst = document.getElementById('doorFirst');
  var officeRoom = document.getElementById('officeRoom');

  var remote = document.querySelector('.officeRoom__remoteControl');
  oxo.elements.onCollisionWithElement(player, remote, function () {
    remote.remove();

    document.querySelector('.modalRemote').classList.add('visible'); // Pop-up remote
    var popup = document.querySelector('.modalRemote');
    oxo.elements.onCollisionWithElement(player, popup, function () {
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

  oxo.animation.setPosition(player, {
    x: 910,
    y: 140
  });

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
  doorReception = document.getElementById('doorReception');
  terminal = document.getElementById('terminal');
  var controlRoom = document.getElementById('controlRoom');

  var wallRight = oxo.elements.createElement({
    type: 'div',
    class: 'controlRoom__wall controlRoom__wall--right',
    styles: {
      transform: 'translate(1020px, 80px)'
    },
    obstacle: true,
    appendTo: '.controlRoom'
  });

  var wallBottom = oxo.elements.createElement({
    type: 'div',
    class: 'controlRoom__wall controlRoom__wall--bottom',
    styles: {
      transform: 'translate(100px, 635px)'
    },
    obstacle: true,
    appendTo: '.controlRoom'
  });

  collision = true;

  oxo.animation.setPosition(player, {
    x: 60,
    y: 90
  });

  if (collision) {
    oxo.animation.moveElementWithArrowKeys(player, 150); // Speed of the player
  }
  oxo.elements.onCollisionWithElement(player, doorReception, goReception1);
  oxo.elements.onCollisionWithElement(player, terminal, function () {
    document.querySelector('.findPassword').classList.add('visible'); // Pop-up riddle
    var riddle = document.querySelector('.findPassword');
    oxo.elements.onCollisionWithElement(player, riddle, function () {
      document.querySelector('.findPassword').classList.remove('visible');
    });
  })
  var clue = document.querySelector('.controlRoom__paper');
  oxo.elements.onCollisionWithElement(player, clue, function () {
    document.querySelector('.riddle').classList.add('visible'); // Pop-up clue
    var clue = document.querySelector('.riddle');
    oxo.elements.onCollisionWithElement(player, clue, function () {
      document.querySelector('.riddle').classList.remove('visible');
    });
  })

  oxo.elements.onCollisionWithElement(player, laserOne, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, laserTwo, end); // Collision with a laser
  oxo.elements.onCollisionWithElement(player, robotOne, end); // Collision with a robot
  oxo.elements.onCollisionWithElement(player, robotTwo, end); // Collision with a robot
}

/* Function to desactivate laser */
function desactivateLaser() {
  if (!canPressZ) {
    return;
  } else if (canPressZ === true) {
    document.querySelectorAll('.room__laser').forEach(function (laser) {
      laser.classList.add('invisible');
    });
  }

  canPressZ = false;

  setTimeout(activateLaser, 1000);

  setTimeout(function () {
    canPressZ = true;
  }, 3000);

  /* Function to activate laser */
  function activateLaser() {
    document.querySelectorAll('.room__laser').forEach(function (laser) {
      laser.classList.remove('invisible');
      laser.classList.add('visible');
    });
  }
}

/* Fonction game to end */
function end() {
  oxo.inputs.cancelKeyListener('z', desactivateLaser);

  oxo.screens.loadScreen('end');

  oxo.inputs.listenKeyOnce('enter', function () {
    if (oxo.screens.getCurrentScreen !== 'game') {
      oxo.screens.loadScreen('game', game);
    }
  });
}