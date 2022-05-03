window.onload = function() {
    'use strict';
  
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var w = document.getElementById('canvas').offsetWidth;
    var h = document.getElementById('canvas').offsetHeight;
    var terrainImageLoaded = false,
      houseImageLoaded = false,
      pokeballImageLoaded = false,
      playerImageLoaded = false;
    var objectSizes = 20;
    var speed = 100;
    var modifier = 100;
    var score = 0;
  
    //terrain image
    var terrainImage = new Image();
    terrainImage.onload = function() {
      terrainImageLoaded = true;
      assetsLoaded();
    };
    terrainImage.src = 'https://drive.google.com/uc?id=1o9rhnAr2GIilfjxPm4Wdl1BlaVP4Gsj1';
  
    //house image
    var houseImage = new Image();
    houseImage.onload = function() {
      houseImageLoaded = true;
      assetsLoaded();
    };
    houseImage.src = 'https://drive.google.com/uc?id=1YO5Mg6IzlskREYSRcr2Ut00JZI49ivnR';
  
    //main sound
    var mainTheme = new Audio('https://drive.google.com/uc?id=1ljrlJ1UBrH4YnIpxH02jqR_oJeLZhkDv');
    mainTheme.loop = true;
    mainTheme.volume = 0.5;
    mainTheme.play();
  
    var pokePick = new Audio('https://drive.google.com/uc?id=1ULOY_JeGQWJ0SOcxQfBtNQ77e20sWa31');
    pokePick.volume = 0.8;
  
    var playerImage = new Image();
    playerImage.onload = function() {
      pokeballImageLoaded = true;
      assetsLoaded();
    };
    playerImage.src = 'https://drive.google.com/uc?id=1ZsYCAWG7uR2_nZTVsIOOUog4tXFIUsgB';
  
    var pokeballImage = new Image();
    pokeballImage.onload = function() {
      playerImageLoaded = true;
      assetsLoaded();
    };
    pokeballImage.src = 'https://drive.google.com/uc?id=1XiXaiRlytnRI2ncwnBWyyef79guxI55X';
  
    /**
     * @Object
     * @name pokeball
     */
    var pokeball = {
x: 0,
y: 0,
spritePosition: 0,
spriteItemDistance: 33,
};
pokeball.generatePosition = function() {
do {
  pokeball.x = Math.floor(Math.random() * 20) + 1;
  pokeball.y = Math.floor(Math.random() * 16) + 4;
} while (check_collision(pokeball.x, pokeball.y));

pokeball.spritePosition = Math.floor(Math.random() * 4) + 0; // get position from 0-4
};

/**
* @Object
* @name pokeball
*/
var player = {
x: Math.round(w / 2 / objectSizes),
y: Math.round(h / 2 / objectSizes),
currentDirection: 'stand',
direction: {
  stand: {
    x: 0,
    y: 0,
  },
  'down-1': {
    x: 17,
    y: 0,
  },
  'down-2': {
    x: 34,
    y: 0,
  },
  'up-1': {
    x: 125,
    y: 0,
  },
  'up-2': {
    x: 142,
    y: 0,
  },
  'left-1': {
    x: 69,
    y: 0,
  },
  'left-2': {
    x: 87,
    y: 0,
  },
  'right-1': {
    x: 160,
    y: 0,
  },
  'right-2': {
    x: 178,
    y: 0,
  },
},
};
player.move = function(direction) {
/**
 * Objetos temporales
 */
var hold_player = {
  x: player.x,
  y: player.y,
};

/**
 * Decidir las direcciones
 */
switch (direction) {
  case 'left':
    player.x -= speed / modifier;
    if (player.currentDirection == 'stand') {
      player.currentDirection = 'left-1';
    } else if (player.currentDirection == 'left-1') {
      player.currentDirection = 'left-2';
    } else if (player.currentDirection == 'left-2') {
      player.currentDirection = 'left-1';
    } else {
      player.currentDirection = 'left-1';
    }
    break;
  case 'right':
    player.x += speed / modifier;
    if (player.currentDirection == 'stand') {
      player.currentDirection = 'right-1';
    } else if (player.currentDirection == 'right-1') {
      player.currentDirection = 'right-2';
    } else if (player.currentDirection == 'right-2') {
      player.currentDirection = 'right-1';
    } else {
      player.currentDirection = 'right-1';
    }
    break;
  case 'up':
    player.y -= speed / modifier;

    if (player.currentDirection == 'stand') {
      player.currentDirection = 'up-1';
    } else if (player.currentDirection == 'up-1') {
      player.currentDirection = 'up-2';
    } else if (player.currentDirection == 'up-2') {
      player.currentDirection = 'up-1';
    } else {
      player.currentDirection = 'up-1';
    }

    break;
  case 'down':
    player.y += speed / modifier;

    if (player.currentDirection == 'stand') {
      player.currentDirection = 'down-1';
    } else if (player.currentDirection == 'down-1') {
      player.currentDirection = 'down-2';
    } else if (player.currentDirection == 'down-2') {
      player.currentDirection = 'down-1';
    } else {
      player.currentDirection = 'down-1';
    }

    break;
}

/**
* Más colisiones si movimientos
 */
if (check_collision(player.x, player.y)) {
  player.x = hold_player.x;
  player.y = hold_player.y;
}

/**
 * Aumentar coordenadas
 */
if (player.x == pokeball.x && player.y == pokeball.y) {
  // found a pokeball !! create a new one
  console.log('found a pokeball of ' + pokeball.spritePosition + '! Bravo! ');
  pokePick.pause();
  pokePick.currentTime = 0;
  pokePick.play();
  score += 1;
  pokeball.generatePosition();
}

update();
};

/**
* Las actualizaciones
* @function
* @name update
*/
function update() {
ctx.drawImage(terrainImage, 0, 0);
ctx.drawImage(houseImage, 80, 60);

//Genboard
board();

//Pokeball
ctx.drawImage(
  pokeballImage,
  pokeball.spritePosition * pokeball.spriteItemDistance,
  0,
  objectSizes,
  objectSizes,
  pokeball.x * objectSizes,
  pokeball.y * objectSizes,
  objectSizes,
  objectSizes
);

//Jugador
console.log('y:', (player.y * objectSizes) / objectSizes);
console.log('x', (player.x * objectSizes) / objectSizes);
ctx.drawImage(
  playerImage,
  player.direction[player.currentDirection].x,
  player.direction[player.currentDirection].y,
  objectSizes - 2,
  objectSizes,
  player.x * objectSizes,
  player.y * objectSizes,
  objectSizes,
  objectSizes
);
}

/**
* Colisiones con objetos
* @function
* @name check_collision
* @param {Integer} x - The x axis
* @param {Integer} y - The y axis
*/
function check_collision(x, y) {
var foundCollision = false;

if ((x > 3 && x < 9 && y == 6) || (x > 4 && x < 9 && (y == 5 || y == 4 || y == 3))) {
  //Colisión en casa
  console.log('on house');
  foundCollision = true;
}

if (
  x < 1 ||
  x > 20 ||
  y < 2 ||
  y > 20 ||
  (y > 0 && y < 4 && (x == 20 || x == 19)) || //right corner
  (y > 0 && y < 4 && (x == 2 || x == 3)) || //left corner
  (y > 18 && (x == 2 || x == 3)) || //left corner
  (x > 17 && (y == 19 || y == 20)) || //left corner
  (x > 19 && (y == 17 || y == 18)) //left corner 2
) {
  console.log('lost on the woods');
  foundCollision = true;
}

return foundCollision;
}

/**
* Botón de Score
* @todo 
* @function
* @name board
*/
function board() {
ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
ctx.fillRect(w - 100, h - 70, 100, 70);

ctx.font = '18px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 1)';
ctx.fillText('You Found', w - 93, h - 45);

ctx.font = '14px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 1)';
ctx.fillText(score + ' poketballs', w - 85, h - 25);
}

/**
* Para empezar a funcionar
* @function
* @name assetsLoaded
*/
function assetsLoaded() {
if (
  terrainImageLoaded == true &&
  houseImageLoaded == true &&
  pokeballImageLoaded == true &&
  playerImageLoaded == true
) {
  pokeball.generatePosition();
  update();
}
}

/**
* Teclas
*/
document.onkeydown = function(e) {
e = e || window.event;

if (e.keyCode == '37') player.move('left');
else if (e.keyCode == '38') player.move('up');
else if (e.keyCode == '39') player.move('right');
else if (e.keyCode == '40') player.move('down');
};
};