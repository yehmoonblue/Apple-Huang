var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var buttonImg = document.createElement("img");
buttonImg.src = "images/tower-btn.png";
var towerImg = document.createElement("img");
towerImg.src = "images/tower.png";
var slimeImg = document.createElement("img");
slimeImg.src = "images/slime.gif";
var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";


var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

function draw(){
  
ctx.drawImage(bgImg,0,0);

}

setTimeout( draw(), 1000);
