var bglmg = document.createElement("img");
var canvas = document.getElementByld("game-canvas");
bglmg.src = "images/map.png";
var ctx = canvas.getContext("2d");
function draw(){
  ctx.drawlmage(bglmg,0,0);
}
setlnterval(draw,16);
