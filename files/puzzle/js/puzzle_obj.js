// used to move a game object
function move(gobj, new_posx, new_posy) {
  if (gobj.bindDOM !== null) {
    addClass(gobj.bindDOM, 'puzzle-posx-' + new_posx);
    addClass(gobj.bindDOM, 'puzzle-posy-' + new_posy);
    if (gobj.posx != new_posx)
      removeClass(gobj.bindDOM, 'puzzle-posx-' + gobj.posx);
    if (gobj.posy != new_posy)
      removeClass(gobj.bindDOM, 'puzzle-posy-' + gobj.posy);
  }
  gobj.posx = new_posx;
  gobj.posy = new_posy;
}

/*
Pos [posx, posy]
Pos Pair [[posx1, posy2], [posx2, posy2]]
Pos Pair Array [[[posx1, posy2], [posx2, posy2]], ...]
*/

// generate Pos [posx, posy]
function generateRandomPos(range_a, range_b) {
  return [Math.floor(Math.random()*range_a), Math.floor(Math.random()*range_b)];
}

// generate Pos Pair Arry [[[posx1, posy2], [posx2, posy2]], ...]
// yeah... I know it sucks...
function generateRandomArray(sizex, sizey) {
  var random_array = [];
  var size = sizex*sizey/2;
  for (var i = 0; i < size; ++i) {
    random_array.push([generateRandomPos(sizex, sizey), generateRandomPos(sizex, sizey)]);
  }
  return random_array;
}


/* Game. A controller. */
function Game(sizex, sizey, onwin) {
  this.status = 'win';
  this.map = [];
  this.sizex = sizex || 4;
  this.sizey = sizey || 4;

  this.onwin = onwin instanceof Function ? onwin : function() {};

  // initialize
  this.init = function() {
    var frag = document.createDocumentFragment();
    var line = [];
    for (var i = 0; i < this.sizex*this.sizey; ++i) {
      if (i % sizey === 0) line = [];
      var posx = Math.floor(i / this.sizey);
      var posy = Math.floor(i % this.sizey);
      var piece = null;
      var gameobj = new GameObj(posx, posy);
      // make DOM
      if (i != this.sizex*this.sizey - 1) {
        piece = document.createElement("span");
        addClass(piece, "puzzle-piece");
        addClass(piece, "puzzle-complete");
        addClass(piece, "puzzle-imgpos-" + String(posx) + "-" + String(posy));
        addClass(piece, "puzzle-posx-" + posx);
        addClass(piece, "puzzle-posy-" + posy);
        piece.bindObj = gameobj;
        piece.puzzle_num = i;

        frag.appendChild(piece);
      }
      // push GObj
      gameobj.bindDOM = piece;
      line.push(gameobj);
      if ((i + 1) % sizey === 0) this.map.push(line);
    }
    this.orginalMap = cloneMap(this.map);
    document.getElementsByClassName('game-container')[0].appendChild(frag);
  };

  // make border, when starting the game or press 'restart'
  this.splitPieces = function() {
    for (var i = 0; i < sizex; ++i) {
      for (var j = 0; j < sizey; ++j) {
        if(this.map[i][j].bindDOM)
          removeClass(this.map[i][j].bindDOM, 'puzzle-complete');
      }
    }
  };

  // restart the game. will shuffle the puzzle
  this.restart = function() {
    this.splitPieces();
    // shuffle the puzzle pieces
    do {
      var random_array = generateRandomArray(sizex, sizey);
      for (var i = 0; i < random_array.length; ++i) {
        this.swapGObj(random_array[i][0], random_array[i][1]);
      }
    } while (!this.checkSolvable());
  };

  // swap game object.
  // swap them in the map and redraw the position of the DOM
  this.swapGObj = function(pos1, pos2) {
    var obj = this.map[pos1[0]][pos1[1]].clone();
    // rebind
    if (this.map[pos1[0]][pos1[1]].bindDOM)
      this.map[pos1[0]][pos1[1]].bindDOM.bindObj = obj;
    // move the real DOM
    obj.moveTo(pos2[0], pos2[1]);
    this.map[pos2[0]][pos2[1]].moveTo(pos1[0], pos1[1]);
    // move the postion in the map array
    this.map[pos1[0]][pos1[1]] = this.map[pos2[0]][pos2[1]];
    this.map[pos2[0]][pos2[1]] = obj;
  };

  // a method, which would be invoked by a click event handler
  // in order to move the target's position (if it can)
  this.moveMe = function(pos) {
    if (this.status == 'win') {
      this.splitPieces();
    }
    this.status = "playing";
    console.log(pos);
    var posx = pos[0];
    var posy = pos[1];
    var flag = false;
    if (this.map[posx - 1] && this.map[posx - 1][posy] && this.map[posx - 1][posy].bindDOM === null) {
      // up
      this.swapGObj([posx, posy], [posx - 1, posy]);
      flag = true;
    } else if (this.map[posx + 1] && this.map[posx + 1][posy] && this.map[posx + 1][posy].bindDOM === null) {
      // down
      this.swapGObj([posx, posy], [posx + 1, posy]);
      flag = true;
    } else if (this.map[posx] && this.map[posx][posy - 1] && this.map[posx][posy - 1].bindDOM === null) {
      // left
      this.swapGObj([posx, posy], [posx, posy - 1]);
      flag = true;
    } else if (this.map[posx] && this.map[posx][posy + 1] && this.map[posx][posy + 1].bindDOM === null) {
      // right
      this.swapGObj([posx, posy], [posx, posy + 1]);
      flag = true;
    }
    this.checkWin();

    return flag;
  };

  // check if the game is over
  this.checkWin = function() {
    for (var i = 0; i < this.sizex; ++i) {
      for (var j = 0; j < this.sizey; ++j) {
        if (this.map[i][j].bindDOM === null) {
          if (this.sizex*this.sizey - 1 != i * this.sizey + j)
            return false;
        } else if (this.map[i][j].bindDOM.puzzle_num != i * this.sizey + j) {
          return false;
        }
      }
    }

    // win, complete the image
    for (i = 0; i < sizex; ++i) {
      for (var j = 0; j < sizey; ++j) {
        if(this.map[i][j].bindDOM)
          addClass(this.map[i][j].bindDOM, 'puzzle-complete');
      }
    }
    this.status = "win";
    onwin();
    return true;
  };

  // check if the result can be solved
  // (if not, it will be regenerate)
  this.checkSolvable = function() {
    var blank = null;
    var arr = [];
    for (var i = 0; i < this.sizex; ++i) {
      for (var j = 0; j < this.sizey; ++j) {
        if (this.map[i][j].bindDOM === null) {
          blank = this.map[i][j];
          arr.push(this.sizex*this.sizey - 1);
        } else {
          arr.push(this.map[i][j].bindDOM.puzzle_num);
        }
      }
    }
    var reverse_num = calReverseNum(arr);
    var d = Math.abs(blank.posx - (sizex - 1)) + Math.abs(blank.posy - (sizey - 1));
    if (reverse_num % 2 != d % 2) {
      console.log("should reshuffle");
      return false;
    } else {
      return true;
    }
  };
}

/* Game Object. Here, it means the puzzle piece */
function GameObj(posx, posy, ele) {
  this.posx = posx;
  this.posy = posy;
  this.bindDOM = ele || null;

  // move to a new position
  this.moveTo = function(new_posx, new_posy) {
    move(this, new_posx, new_posy);
  };

  // clone itself
  this.clone = function() {
    return new GameObj(this.posx, this.posy, this.bindDOM);
  };

  // check if it is equal to the other object
  this.isEqual = function(other) {
    return other.bindDOM == this.bindDOM;
  };
}