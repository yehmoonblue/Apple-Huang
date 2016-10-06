
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");



var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";


function draw(){
  ctx.drawImage(bgImg,50,20);
  ctx.drawImage(enemyImg,30,30);

}
setInterval(draw, 16);

