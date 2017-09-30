  var snakeArray = [];
  var appleObject = {
    x : 100,
    y : 100,
    state : false
   };
  var snakeMaxLength = 6;
  var a = 800;
  var snakeX = a/2;
  var snakeY = a/2;
  var snakeVelX = 0;
  var snakeVelY = 0;
  var scl = a/20;

function setup() {
  createCanvas(a,a);
  background(0);
  rectMode(CENTER);
  frameRate(10);
  generateApple();
}

function keyPressed() {
switch (keyCode) {
  case LEFT_ARROW:
  if (snakeVelX == scl){
    return;
  }
  snakeVelY = 0;
  snakeVelX = -scl;
  break;
  case RIGHT_ARROW:
  if (snakeVelX == -scl){
    return;
  }
  snakeVelY = 0;
  snakeVelX = scl;
  break;
  case UP_ARROW:
  if (snakeVelY == scl){
    return;
  }
  snakeVelX = 0;
  snakeVelY = -scl;
  break;
  case DOWN_ARROW:
  if (snakeVelY == -scl){
    return;
  }
  snakeVelX = 0;
  snakeVelY = scl;
  break;
  case ESCAPE:
  frameRate(0);
  break;
  case ENTER:
  frameRate(10);
  break;
  default: return false;
}
}
function draw() {
  if (snakeX == 0) {
  snakeX = a-scl;
  }
  if (snakeY == 0) {
  snakeY = a-scl;
  }
  if (snakeX == a) {
  snakeX = 0+scl;
  }
  if (snakeY == a) {
  snakeY = 0+scl;
  }
  snakeArray.push([snakeX,snakeY]);
  snakeX += snakeVelX;
  snakeY += snakeVelY;

  if (snakeX == appleObject.x && snakeY == appleObject.y) {
    generateApple();
    snakeMaxLength += 1;
  }
  if (snakeArray.length == snakeMaxLength) {
    snakeArray.shift();
    clear();
    background(0);
  }
  fill(255);
  for (i=0; i<snakeArray.length; i++) {
    var x = snakeArray[i][0];
    var y = snakeArray[i][1];
    if (x == snakeX && y == snakeY) {
      gameStop(true);
    }
    rect(x, y, scl, scl);

  }
  ellipse(appleObject.x, appleObject.y, scl/1.5, scl/1.5);
}
function gameStop(gameOver) {
  if (gameOver === true){
    snakeX = a/2;
    snakeY = a/2;
    snakeVelX = 0;
    snakeVelY = 0;
    snakeArray.splice(0,snakeArray.length+1);
    snakeMaxLength = 6;
    clear();
    background(0);
  }
}
function generateApple(){
    frameRate(0);
    appleObject.x = floor(random(1, 19))*scl;
    appleObject.y = floor(random(1, 19))*scl;
    for (i=0; i<snakeArray.length; i++) {
      var c = snakeArray[i][0];
      var d = snakeArray[i][1];
      if (appleObject.x == c && appleObject.y == d) {
        generateApple();
      }
      else {
      frameRate(10);
      }
    }
}
