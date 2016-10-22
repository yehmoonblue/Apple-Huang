var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var slime = document.createElement("img");
slime.src = "images/slime.gif";
var rukia = document.createElement("img");
rukia.src = "images/rukia.gif";
var tower = document.createElement("img");
tower.src = "images/tower-btn.png";
var enemy = {
  x:96,//x座標
  y:480-32//y座標
  };
function draw(){
  ctx.drawImage(bglmg,0,0);
  ctx.drawImage(slime,0,0);
  ctx.drawImage(rukia,0,0);
  ctx.drawImage(tower,100,100);
  
}
setInterval(draw,16);
