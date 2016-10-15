var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
function draw(){
  ctx.drawImage(bglmg,0,0);
}
setInterval(draw,16);
var rukia = document.createElement("img");
rukia.src = "images/rukia.gif";
draw();
