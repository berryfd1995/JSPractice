var imported = document.createElement('script');
imported.src = './JS/Snake.js';
document.head.appendChild(imported);

var canvas;
var snake;
window.onload = function() {
  //init
  this.canvas = document.getElementById('game');
  let head = document.getElementById('head');
  let body = document.getElementById('body');
  let apple = document.getElementById('apple');
  this.snake = new Snake(this.canvas,head,body,apple);
};
document.addEventListener("keypress", function(event){
  //w = 119
  //a = 97
  //s = 115
  //d = 100
  switch(event.keyCode){
    case 119:
      this.snake.setDirection(0);
      break;
    case 97:
      this.snake.setDirection(1);
      break;
    case 115:
      this.snake.setDirection(2);
      break;
    case 100:
      this.snake.setDirection(3);
      break;
    default:
      break;
  }
  this.snake.start();
}.bind(this));
