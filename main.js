
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 60;


var bgImg = document.createElement("img");
bgImg.src = "images/mapwithwater.png";
var enemyImg = document.createElement("img");
enemyImg.src = "images/rukia.gif";
var towerImg = document.createElement("img");
towerImg.src = "images/tower-btn.png";
var towerbuiltImg = document.createElement("img");
towerbuiltImg.src = "images/tower.png";
var enemy ={
  x: 115,
  y: 480-32,
  speedx: 0,
  speedy: -64
};

//畫畫
function draw(){
  ctx.drawImage(bgImg,50,0);
  ctx.drawImage(enemyImg,move(enemy.x,enemy.speedx),move(enemy.y,enemy.speedy));
  ctx.drawImage(towerImg,590,432,50,50);
  if(isBuilding){
  ctx.drawImage(towerbuiltImg,cursor.x,cursor.y);
  }
  ctx.drawImage(towerbuiltImg, tower.x, tower.y);
}

//製造城堡
var isBuilding = false;
var tower={};
var cursor = {};
$( "#game-canvas" ).on( "click", function(){
  if(isCollided(cursor.x, cursor.y, 590, 432, 50, 50)){
  isBuilding = true;
  }
  else if(isBuilding){
  tower.x =cursor.x-cursor.x%32;
  tower.y =cursor.y-cursor.y%32;;
  isBuilding = false;
  }
  else{
  isBuilding= false;
  }
});




$( "#game-canvas" ).on( "mousemove", function( event ) {
cursor = {
x: event.offsetX,
y: event.offsetY
};
});
  
setInterval(draw, 1000/FPS);

//移動
function move(position,speed){
position = position+speed;
  return position;
}

//判斷之間

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
