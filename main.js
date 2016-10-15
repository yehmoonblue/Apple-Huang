var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var slimeImage = document.createElement("img");
slime.src = "images/slime.gif";
var rukia = document.createElement("img");
rukia.src = "images/rukia.gif";
var slime = {
  x:96,//x座標
  y:480-32//y座標
  };
function draw(){
  ctx.drawImage(bglmg,0,0);
  ctx.drawImage(slimeImage,0,0);
  ctx.drawImage(rukia,0,0);
}
setInterval(draw,16);
