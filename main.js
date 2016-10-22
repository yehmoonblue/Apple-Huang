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
var tower2 = document.createElement("img");
tower2.src = "images/tower.png";
var cursor = {x:0,y:0};
var enemy = {
  x:96,//x座標
  y:480-32//y座標
  };
function draw(){
  ctx.drawImage(bglmg,0,0);
  ctx.drawImage(slime,0,0);
  ctx.drawImage(rukia,0,0);
  ctx.drawImage(tower,580,420,60,60);
  ctx.drawImage(tower2,cursor.x,cursor.y);
}
setInterval(draw,16);

$("#game-canvas").on("mousemove",function( event ){
cursor = {
x:event.offsetX,
y:event.offsetY
};
});

