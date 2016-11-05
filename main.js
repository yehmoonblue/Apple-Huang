var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 60;

var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var slime = document.createElement("img");
slime.src = "images/slime.gif";
var rukia = document.createElement("img");
rukia.src = "images/rukia.gif";
var tower1 = document.createElement("img");
tower1.src = "images/tower-btn.png";
var tower2 = document.createElement("img");
tower2.src = "images/tower.png";

var enemyPath = [
  {x:96,y:60},
  {x:383,y:60},
  {x:383,y:190},
  {x:225,y:190},
  {x:225,y:315},
  {x:543,y:315},
  {x:543,y:93}
  ];

var enemy = {
  pathDes: 0,
  x:96,
  y:480-32,
  speedx :0,
  speedy :-64,
  speed :64,
  move: function(){
    if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y,this.x,this.y, this.speed/FPS, this.speed/FPS)){
      enemyPath[this.pathDes].x,
      enemyPath[this.pathDes].y,
      this.x,this.y,
      this.pathDes++;
      console.log("qq")
      if(this.x>enemyPath[this.pathDes].x){
         this.speedx=-64;
         this.speedy=0;
         }
        else if(this.x<enemyPath[this.pathDes].x){
         this.speedx=64;
         this.speedy=0;
         }
         else if(this.y>enemyPath[this.pathDes].y){
         this.speedx=0;
         this.speedy=-64;
         }
        else if(this.y<enemyPath[this.pathDes].y){
         this.speedx=-64;
         this.speedy=0;
         }
        

    this.x=this.x+this.speedx/FPS;
    this.y=this.y+this.speedy/FPS;
      }
  }
};

var towerbutton={
  x: 580,
  y: 420,
  width: 60,
  height: 60
};


function draw(){
  enemy.move();
  ctx.drawImage(bglmg,0,0);
  ctx.drawImage(slime,0,0);
  ctx.drawImage(rukia,enemy.x,enemy.y);
  ctx.drawImage(tower1,towerbutton.x,towerbutton.y,towerbutton.width,towerbutton.height);
  if(isBuilding){
    ctx.drawImage(tower2,cursor.x,cursor.y);
  }
  ctx.drawImage(tower2,tower.x,tower.y);
};

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
  tower.x=cursor.x-cursor.x %32;
  tower.y=cursor.y-cursor.y %32;
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


setInterval(draw, 1000/FPS);
