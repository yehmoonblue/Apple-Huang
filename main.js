
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");



var bgImg = document.createElement("img");
bgImg.src = "images/mapwithwater.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";
var towerImg = document.createElement("img");
towerImg.src = "images/tower-btn.png";
var enemy ={
  x: 115,
  y: 480-32
};
var width =10;
var height =10;

function draw(){
  ctx.drawImage(bgImg,50,0);
  ctx.drawImage(enemyImg,enemy.x,enemy.y);
  ctx.drawImage(towerImg,500,432,width,height);

}
setInterval(draw, 16);

