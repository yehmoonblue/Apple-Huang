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
  x:115,//x座標
  y:480-32//y座標
};

var towerbutton={
  x: 580,
  y: 420,
  width: 60,
  height: 60
};

function draw(){
  ctx.drawImage(bglmg,50,0);
  ctx.drawImage(slime,0,0);
  ctx.drawImage(rukia,enemy.x,enemy.y);
  ctx.drawImage(tower,towerbutton.x,towerbutton.y,towerbutton.width,towerbutton.height);
  if(isBuilding){
      ctx.drawImage(towerbuiltImg,cursor.x,cursor.y);
  }
  ctx.drawImage(towerbuiltImg, tower.x, tower.y);
}

var isBuilding = false;
var tower={};
var cursor = {};
$( "#game-canvas" ).on( "click", function(){
  if(isCollided(cursor.x, cursor.y, 590, 432, 50, 50)){
    if(isBuilding){
    isBuilding= false;
  }
    else{
    isBuilding = true;
  }
  }
  else if(isBuilding){
  tower.x =cursor.x-cursor.x%32;
  tower.y =cursor.y-cursor.y%32;
 isBuilding=false;
  }
 
});


$("#game-canvas").on("mousemove",function( event ){
cursor = {
x:event.offsetX,
y:event.offsetY
};
});


function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
    if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
    ){
        return true;
    } else {
        return false;
    }
}


setInterval(draw,16);
