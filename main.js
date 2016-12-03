var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
ctx.font = "28px Arial";
ctx.fillStyle = "white";
var FPS = 50;
var clock=0;
var treehp=100;
var money=25;
var score=0;
var enemies=[];
var towers=[];
var crosshairImg = document.createElement("img");
crosshairImg.src = "images/crosshair.png";
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var tower1 = document.createElement("img");
tower1.src = "images/tower-btn.png";
var tower2 = document.createElement("img");
tower2.src = "images/tower.png";
var green = document.createElement("gif");
green.src = "images/166863.gif";
var blue = document.createElement("img");
blue.src ="images/f4754c575b2a04079a771a8cc83e8bea.png";


var enemyPath = [
    {x:90,y:60},
    {x:382,y:60},
    {x:382,y:190},
    {x:220,y:190},
    {x:220,y:320},
    {x:538,y:320},
    {x:538,y:166}
];


function Enemy() {
    this.x = 90;
    this.hp= 10;
    this.y = 480-32;
    this.speedX = 0;
    this.speedY = -64;
    this.pathDes = 0;
    this.speed = 64;
    this.move = function(){
        if( isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, this.speed/FPS, this.speed/FPS) ){
            if (this.pathDes === enemyPath.length-1) {
                this.hp=0;
                treehp -= 10;
            }else{
                this.x = enemyPath[this.pathDes].x;
                this.y = enemyPath[this.pathDes].y;
                this.pathDes++;
                if (enemyPath[this.pathDes].x>this.x) {
                    this.speedX = 64;
                    this.speedY = 0;
                }else if (enemyPath[this.pathDes].x<this.x) {
                    this.speedX = -64;
                    this.speedY = 0;
                }else if (enemyPath[this.pathDes].y>this.y) {
                    this.speedX = 0;
                    this.speedY = 64;
                }else if (enemyPath[this.pathDes].y<this.y) {
                    this.speedX = 0;
                    this.speedY = -64;
                }
            }
        }else{
            this.x = this.x + this.speedX/FPS;
            this.y = this.y + this.speedY/FPS;
        }
    };
}

var enemy=new Enemy();
var towerbutton={
    x: 525,
    y: 432,
    width: 50,
    height: 50
};

function draw(){
    ctx.drawImage(bgImg,0,0);
    ctx.drawImage(blue,0,0,90,60);
    if(clock%80==0){
        var newenemy= new Enemy();
        enemies.push(newenemy);
    }
    ctx.fillText( "HP:"+treehp , 20, 20 );
    ctx.fillText( "Money:"+money , 20, 40 );
    ctx.fillText( "Score:"+score , 20, 60 );
    for(var i=0;i<enemies.length;i++){
        if (enemies[i].hp<=0) {
            enemies.splice(i,1);
            money+=8;
            score+=10;
        }
        enemies[i].move();
        ctx.drawImage(green, enemies[i].x, enemies[i].y,40,30);
    }
    ctx.drawImage(tower1,towerbutton.x,towerbutton.y,towerbutton.width,towerbutton.height);
    if(isBuilding){
        ctx.drawImage(tower2,cursor.x,cursor.y);
    }
    
    for(var i=0;i<towers.length;i++){
        ctx.drawImage(tower2,towers[i].x,towers[i].y);  
        towers[i].searchEnemy();
        if(towers[i].aimingEnemyId!=null){
            var id = towers[i].aimingEnemyId;
            ctx.drawImage(crosshairImg,enemies[id].x,enemies[id].y);
        }
    }
    clock++;
}

var isBuilding = false;
function Tower(x,y){
    this.x=x;
    this.y=y;
    this.range=90;
    this.aimingEnemyId=null;
    this.fireRate=1; 
    this.readyToShootTime=1;
    this.damage=5;
    this.searchEnemy=function(){
        this.readyToShootTime -= 1/FPS;
        for(var i=0; i<enemies.length; i++){
            var distance = Math.sqrt(
                Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2) 
            );
            if (distance<=this.range) {
                this.aimingEnemyId = i;
                if(this.readyToShootTime<=0) {
                    this.shoot(i);
                    this.readyToShootTime = this.fireRate;
                }
                return;
            }
        }
        this.aimingEnemyId = null;
    };
    this.shoot=function(id){
        ctx.beginPath(); 
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(enemies[id].x, enemies[id].y);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.stroke();
        enemies[id].hp = enemies[id].hp - this.damage;
    };
};
var cursor = {};
$( "#game-canvas" ).on( "click", function(){
    if(isCollided(cursor.x, cursor.y, 540, 432, 50, 50)){
        if(isBuilding){
            isBuilding= false;
        }else{
            isBuilding = true;
        }
    }else if(isBuilding&&money>=25){
        towers.push(new Tower(cursor.x-cursor.x%32,cursor.y-cursor.y%32));
        money-=25;
        isBuilding=false;
    }
});



$( "#game-canvas" ).on( "mousemove", function( event ) {
cursor = {
    x: event.offsetX,
    y: event.offsetY
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
