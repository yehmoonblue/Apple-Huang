var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var canvas = document.getElementByld("game-canvas");
var ctx = canvas.getContext("2d");
function draw(){
ctx.drawlmage(bglmg,0,0);
}
setlnterval( draw, 16);
