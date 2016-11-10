window.onload = function () {
  var body_ele = document.getElementsByTagName('body')[0];
  // initialize puzzle pieces
  var game = new Game(4, 4, function() {
    var win_hint = document.getElementById('win-hint');
    removeClass(win_hint, 'hidden');
    setTimeout(function() {
      addClass(win_hint, 'hidden');
    }, 1200);
  });
  game.init();

  var pieces = document.getElementsByClassName('puzzle-piece');

  // register click event for puzzle pieces
  function puzzleClickEvent(event) {
    console.log(event.target.bindObj);
    game.moveMe([event.target.bindObj.posx, event.target.bindObj.posy]);
  }
  for (var i = 0; i < pieces.length; ++i) {
    pieces[i].addEventListener('click', puzzleClickEvent);
  }

  // register click event for restart
  var restart_btn = document.getElementById('btn-restart');
  restart_btn.addEventListener('click', function() {
    game.restart();
  });

  // register change event for file upload button
  var file_select = document.getElementById('sel-img');
  file_select.addEventListener('change', function(event) {
    var class_name = "";
    switch(event.target.value) {
      case "Panda":
        class_name = 'bg-panda';
        break;
      case "Cirno":
        class_name = 'bg-cirno';
        break;
      case "Creeper":
        class_name = 'bg-creeper';
        break;
      case "Dragonborn":
        class_name = 'bg-dragonborn';
        break;
      case "Suika":
        class_name = 'bg-suika';
        break;
    }

    body_ele.className = class_name;
  });
};