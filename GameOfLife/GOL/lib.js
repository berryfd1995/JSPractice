var imported = document.createElement('script');
imported.src = './GOL/GOL.js';
document.head.appendChild(imported);

var game;
var canvas;
var width = 5;
var height = 5;
window.onload = function() {
  //init
  canvas = document.getElementById('game');
  game = new GOL(canvas);
  game.createNewGame(width, height);

  var slider = document.getElementById("fpsrange");
  var output = document.getElementById("fpsvalue");
  output.innerHTML = slider.value;
  slider.oninput = function(){
    output.innerHTML = this.value;
    game.setFPS(this.value);
  }
};
function pauseGame(){
  this.game.pauseG();
};

function startGame(){
  this.game.start();
};

function regenerate(){
  this.game.createNewGame(width,height);
}
