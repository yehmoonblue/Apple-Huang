
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");



var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";
var enemy ={
  x: 146,
  y: 480-32
}


function draw(){
  ctx.drawImage(bgImg,50,0);
  ctx.drawImage(enemyImg,enemy.x,enemy.y);

}
setInterval(draw, 16);

