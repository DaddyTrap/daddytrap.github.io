var Game = {};
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_Z = 90;
var c = 0;
var isTesting = false;
function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}
function Sprite(c, imgsrc, x, y, dx, dy, speed) {
  x = x == null ? 0 : x;
  y = y == null ? 0 : y;
  dx = dx == null ? 0 : dx;
  dy = dy == null ? 0 : dy;
  this.x = x;
  this.y = y;
  this.dirX = dx;
  this.dirY = dy;
  this.moving = false;
  this.speed = speed;
  this.img = new Image();
  this.img.src = imgsrc;
  this.cxt = c;
  this.lifeTime = 0;
}
Sprite.prototype.draw = function() {
  this.cxt.drawImage(this.img, this.x, this.y);
};
Sprite.prototype.update = function() {
  this.move();
  this.draw();
  ++this.lifeTime;
};
Sprite.prototype.move = function() {
  if (!this.moving) return;
  var tspeed = this.speed;
  var tmp = this.dirX + this.dirY;
  if (tmp == 0 || tmp == 2 || tmp == -2) tspeed *= Math.sqrt(2) * 0.5;
  var tx = this.dirX * tspeed;
  var ty = this.dirY * tspeed;
  this.x += tx;
  this.y += ty;
};
Sprite.prototype.setDir = function(dx, dy) {
  if (dx == 0 && dy == 0) return;
  this.dirX = dx;
  this.dirY = dy;
};
Sprite.prototype.info = function() {
  var s = '(' + Math.round(this.x) + ', ' + Math.round(this.y) + ')';
  s += 'dir:(' + Math.round(this.dirX) + ', ' + Math.round(this.dirY) + ')';
  s += 'lifeTime:' + this.lifeTime;
  return s;
};


// Character inherits from Sprite
function Character(c, imgsrc, x, y, dx, dy, speed, bulimgsrc) {
  Sprite.call(this, c, imgsrc, x, y, dx, dy, speed);
  this.bulImgSrc = bulimgsrc;
  this.actionCD = 60;
  this.tempTime = 0;
  this.bullets = [];
  this.bulId = 0;
  this.isFiring = false;
  this.spawnBul = function(x, y, dx, dy, moving) {
    this.bullets[this.bulId++] =
        new Bullet(this.cxt, this.bulImgSrc, x, y, dx, dy, 30, moving);
  };
  this.s_update = this.update;
  this.update = function() {
    this.s_update();
    if (this.isFiring && (this.lifeTime - this.tempTime >= this.actionCD)) {
      this.tempTime = this.lifeTime;
      this.spawnBul(this.x, this.y, this.dirX, this.dirY, true);
    }
    for (var i in this.bullets) {
      this.bullets[i].update();
    }
  }
}
Character.prototype = Object.create(Sprite.prototype);
Character.prototype.constructor = Character;

// Bullet inherits from Sprite
function Bullet(c, imgsrc, x, y, dx, dy, speed, moving) {
  Sprite.call(this, c, imgsrc, x, y, dx, dy, speed);
  this.moving = /*moving == null ? true : */ moving;
}
Bullet.prototype = Object.create(Sprite.prototype);
Bullet.prototype.constructor = Bullet;



Game.init = function(c) {
  this.entities = [];
  this.running = false;
  this.cxt = c;
  this.spriteID = 0;
  this.fps = 60;
  this.controlEntity = new Character(
      this.cxt, "assets/game_assets/head.png", 0, 0, 0, 0, 5,
      "assets/game_assets/bullet.png");
  this.isUp = false;
  this.isDown = false;
  this.isLeft = false;
  this.isRight = false;
  this.isZ = false;
  // this.controlEntity.prototype.img.src = "assets/game_assets/head.png";
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
  // Fire control
  if (Game.isZ)
    this.controlEntity.isFiring = true;
  else
    this.controlEntity.isFiring = false;

  this.controlEntity.update();
  for (var i in this.entities) {
    this.entities[i].update();
  }
  // console.info(this.controlEntity.info());
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
  this.entities[this.spriteID] =
      new Character(this.cxt, "assets/game_assets/head.png");
  this.entities[this.spriteID].x = GetRandomNum(0, 800);
  this.entities[this.spriteID].y = GetRandomNum(0, 600);
  this.spriteID++;
};
Game.removeSprite = function(id) {
  delete this.entities[id];
  this.entities[id] = null;
};
Game.test = function(txt) {
  txt.value = Game.controlEntity.info();
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
  if (key == KEY_Z) {
    Game.isZ = true;
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
  if (key == KEY_Z) {
    Game.isZ = false;
  }

};