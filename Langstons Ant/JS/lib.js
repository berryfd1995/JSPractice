var imported = document.createElement('script');
imported.src = './JS/Ant.js';
document.head.appendChild(imported);

var game;
var canvas;
var width = 2;
var height = 2;
var ant;
window.onload = function() {
  //init
  ant = document.getElementById('img');
  canvas = document.getElementById('game');
  game = new Ant(canvas,ant);
  game.createBoard(width, height);

  var slider = document.getElementById("fpsrange");
  var output = document.getElementById("fpsvalue");
  output.innerHTML = slider.value;
  slider.oninput = function(){
    output.innerHTML = this.value;
    game.setFPS(4000);
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
