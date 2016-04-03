var Game = {};
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var c = 0;
function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}
function Sprite(c) {
  this.x = 0;
  this.y = 0;
  this.dirX = 0;
  this.dirY = 0;
  this.moving = false;
  this.speed = 10;
  this.img = new Image();
  this.cxt = c;
  this.draw = function() {
    this.cxt.drawImage(this.img, this.x, this.y);

  };
  this.update = function() {
    this.move();
    this.draw();
  };
  this.move = function() {
    if (!this.moving) return;
    var tx = this.dirX * this.speed;
    var ty = this.dirY * this.speed;
    this.x += tx;
    this.y += ty;
    var txt = document.getElementById('txt');
    txt.value = '(';
    txt.value += this.x;
    txt.value += ', ';
    txt.value += this.y;
    txt.value += ')';
    txt.value += 'mx:' + tx + ', my:' + ty + '  dir:' +
        '(' + this.dirX + ', ' + this.dirY + ')';
  };
  this.setDir = function(dx, dy) {
    if (dx == 0 && dy == 0) return;
    this.dirX = dx;
    this.dirY = dy;
  }
}
Game.init = function(c) {
  this.entities = [];
  this.running = false;
  this.cxt = c;
  this.spriteID = 0;
  this.fps = 10;
  this.controlEntity = new Sprite(this.cxt);
  this.isUp = false;
  this.isDown = false;
  this.isLeft = false;
  this.isRight = false;
  this.controlEntity.img.src = "assets/game_assets/head.png";
  window.addEventListener('keydown', this.doKeyDownEvent, false);
  window.addEventListener('keyup', this.doKeyUpEvent, false);
};
Game.start = function() {
  this.running = true;
  this.loop();
};
Game.loop = function() {
  this.cxt.clearRect(0, 0, 800, 600);
  if (this.running = false) return;
  // Moving Control
  if (Game.isRight || Game.isUp || Game.isDown || Game.isLeft) {
    Game.controlEntity.moving = true;
  } else {
    Game.controlEntity.moving = false;
  }
  // alert(Game.controlEntity.moving);
  var dx = 0;
  var dy = 0;
  if (Game.isRight || Game.isLeft) {
    if (Game.isRight)
      dx = 1;
    else
      dx = -1;
  } else {
    dx = 0;
  }
  if (Game.isUp || Game.isDown) {
    if (Game.isDown)
      dy = 1;
    else
      dy = -1;
  } else {
    dy = 0;
  }
  this.controlEntity.setDir(dx, dy);
  // Moving control end
  this.controlEntity.update();
  for (var i in this.entities) {
    this.entities[i].update();
  }
  // document.getElementById('txt').value = c++;
  setTimeout('Game.loop()', 1000 / this.fps, false);
};
Game.stop = function() {
  this.running = false;
};
Game.draw = function(argument) {
  for (var id in this.entities) {
    entities[id].draw(this.context);
  }
};
Game.addSprite = function() {
  this.entities[this.spriteID] = new Sprite(this.cxt);
  this.entities[this.spriteID].img.src = "assets/game_assets/head.png";
  this.entities[this.spriteID].x = GetRandomNum(0, 800);
  this.entities[this.spriteID].y = GetRandomNum(0, 600);
  this.spriteID++;
};
Game.removeSprite = function(id) {
  this.entities[id] = null;
  delete this.entities[id];
};
Game.test = function() {
  for (var i in this.entities) {
    this.entities[i].x += 100;
  }

  this.controlEntity.x += 100;
};
Game.doKeyDownEvent = function(e) {
  var key = e.keyCode;
  if (key == KEY_RIGHT) {
    Game.isRight = true;
  }
  if (key == KEY_LEFT) {
    Game.isLeft = true;
  }
  if (key == KEY_DOWN) {
    Game.isDown = true;
  }
  if (key == KEY_UP) {
    Game.isUp = true;
  }
};
Game.doKeyUpEvent = function(e) {
  var key = e.keyCode;
  // document.getElementById('txt').value = key;
  if (key == KEY_RIGHT) {
    Game.isRight = false;
  }
  if (key == KEY_LEFT) {
    Game.isLeft = false;
  }
  if (key == KEY_DOWN) {
    Game.isDown = false;
  }
  if (key == KEY_UP) {
    Game.isUp = false;
  }
};
