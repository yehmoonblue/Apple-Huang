var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 60;
var enemies = [];
var clock = 0;
var treehp = 100;

var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var slime = document.createElement("img");
slime.src = "images/slime.gif";
var tower1 = document.createElement("img");
tower1.src = "images/tower-btn.png";
var tower2 = document.createElement("img");
tower2.src = "images/tower.png";
ctx.font="24px Arial";
ctx.fillStyle="white";
var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";


var enemyPath = [
  {x:96,y:60},
  {x:382,y:60},
  {x:382,y:190},
  {x:224,y:190},
  {x:224,y:314},
  {x:542,y:314},
  {x:542,y:92}
  ];



function Enemy(){
  this.x = 96;
  this.hp = 10;
  this.y = 480-32;
  this.speedx=0;
  this.speedy=-64
  this.pathDes = 0;
  this.speed = 64; 
  this.move = function(){
    if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y,this.x,this.y, this.speed/FPS, this.speed/FPS)){
      if (this.pathDes === enemyPath.length-1){
      this.hp = 0;
      treehp-= 10;
      }
      else{
      this.x = enemyPath[this.pathDes].x,
      this.y = enemyPath[this.pathDes].y,
      this.pathDes++;
      
      
    
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
        else {
      this.speedx=0;
      this.speedy=64;
        }
      }
    }else{
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
  ctx.drawImage(bglmg,0,0);
    if (clock%80==0){
    var newEnemy = new Enemy();
    enemies.push(newEnemy);
  }
  tower.searchEnemy();
  if(tower.aimingEnemyId!=null){
  var id = tower.aimingEnemyId;
  ctx.drawImage(crosshairImg,enemies[id].x,
               enemies[id].y);
  }
  for(var i=0;i<enemies.length;i++){
      if (enemies[i].hp<=0) {
           enemies.splice(i,1);}
    enemies[i].move();
    ctx.drawImage(slime,enemies[i].x,enemies[i].y);
  }
  ctx.fillText("HP:"+treehp ,20,20);
  ctx.drawImage(tower1,towerbutton.x,towerbutton.y,towerbutton.width,towerbutton.height);
  if(isBuilding){
    ctx.drawImage(tower2,cursor.x,cursor.y);
  }
  ctx.drawImage(tower2,tower.x,tower.y);
  clock++;
};


function Cannonball(){
this.speed = 320;
this.damage = 5;
}


var isBuilding = false; 
var cannonballs=[];
var tower={  
  fireRate:1,
  readyToShootTime:1,
  damage:5,
  range:96,
  aimingEnemyId:null,
  searchEnemy:function(){
  this.readyToSchootTime-=1/FPS
    for(var i=0;i<enemies.length;i++){
      var distance = Math.sqrt(
        Math.pow(this.x-enemies[i].x,2)+Math.pow(this.y-enemies[i].y,2)
      );
      if (distance<=this.range){
        this.aimingEnemyId = i;
        if(this.readyToShootTime<=0){
        this.shoot(i);
        this.readyToShootTime = this.fireRate;
        }
        return;
      }
    }
    this.aimingEnemyId = null;
  },
    shoot:function(id){
      var newCannonball = newCannonball(this);
    cannonballs.push(newCannonball);
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(enemies[id].x,enemies[id].y);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();
      enemies[id].hp=enemies[id].hp-this.damage;
  }
};



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
