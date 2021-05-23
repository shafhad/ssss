var play =1;
var end =0;
var gameState = play;
var trex
var trexRunning,trexCollided;
var ground, invisableGround,groundImage;
var cloudGroups,cloudImage;
var obstacleGroups,obstacle1,obstacle2;
var backGround;
var score =0;
var jumpSound,collidedSound;
var gameOver;
var restart;

function preload(){
 backGround = loadImage("assets/BackGround.png");
 moonAnimation = loadImage("assets/Moon.png");
 trexRunning = loadImage("assets/Trexrunning.png");
 trexCollided = loadImage("assets/Trex collided.png");
 groundImage = loadImage("assets/GroundImage.png");
 cloudImage = loadImage("assets/Cloud.png");
 obstacle1 = loadImage("assets/Obstacle1.png");
 obstacle2 = loadImage("assets/Obstacle2.png");
 gameOver = loadImage("assets/GameOver.png");
 restart = loadImage("assets/Restart.png");
}

function Setup(){
    createCanvas(windowWidth,windowHeight);
    moon = createSprite( width-50,100,10,10);
    moon.addAnimation("moon",moonAnimation);
    moon.scale=0.1;

    trex = createSprite(50,height-70,20,50);
    trex.addAnimation("running",trexRunning);
    trex.addAnimation("collided",trexCollided);
    trex.setCollider('circle',0,0,350);
    trex.scale=0.08;

    invisableGround = createSprite(width/2,height-10,width,125);
    invisableGround.shapeColor = "red";
     
    ground = createSprite(width/2,height,width,2);
    ground.addImage("ground",groundImage);
    ground.x = width/2;
    ground.velocityX = -(6+3*score/100);

    gameOver = createSprite(width/2,height/2-50);
    gameOver.addImage(gameOver);

    restart = createSprite(width/2,height/2);
    restart.addImage(restart);

    gameOver.scale = 0.5;
    gameOver.visiable = false;

    restart.scale = 0.1;
    restart.visiable = false;

    cloudGroups = new Groups();

    obstacleGroups = new Groups();

    score = 0;
}

function draw() {
    background(backGround);
    textSize(20);
    fill("blue");
    text("Score:"+score,30,50);
    if (gameState===play)
    {
        score=score+Math.round(getFrameRate()/60);
        ground.velocityX= -(6+3*score/100);
       if((touches.length>0||keyDown("SPACE"))&&trex.y>=height-120)
       {
        jumpSound.play();
        trex.velocityY = -10;
        touchs = [];
    } 
    trex.velocityY = trex.velocityY+0.8;
    if(ground.x<0)
    {
        ground.x = ground.width/2;
    }
    trex.collide(invisableGround);
    spawnClouds();
    spwanObstacles();
    if(obstacleGroups.isTouching(trex))
    {
        gameState = end;
    }
    }
else if(gameState===end)
{
gameOver.visiable=true;
restart.visiable=true;
ground.velocityX=0;
trex.velocityY=0;
obstacleGroups.setVelocityXEach(0);
cloudGroups.setVelocityXEach(0);
trex.changeAnimation("collided",trexCollided);
obstacleGroups.setLifetimeEach(-1);
cloudGroups.setLifetimeEach(-1);
if(touches.length>0||keyDown("SPACE"))
{
reset();
touches=[];
}
}
drawSprite();
}

function spawnClouds()
{
if(frameCount%60===0)
{
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale=0.5;
    cloud.velocityX=-3;
    cloud.lifetime=300;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudGroups.add(cloud);
}    
}
function spwanObstacles()
{
if(frameCount%60===0)
{
   var obstacle = createSprite(600,height-95,20,30);
   obstacle.setCollider('circle',0,0,45);
   obstacle.velocityX=-(6+3*score/100);
   var rand = Math.round(random(1,2));
   switch(rand)
   {
     case 1: obstacle.addImage(obstacle1);
             break;
     case 2: obstacle.addImage(obstacle2);
             break;
      default:break;       
   }
   obstacle.scale=0.3;
   obstacle.lifetime=300;
   obstacle.depth=trex.depth;
   trex.depth+=1;
   obstacleGroups.add(obstacle);
}  
}

function reset() 
{
 gameState=play;
 gameOver.visiable=false;
 restart.visiable=false;
 obstacleGroups.destroyEach();
 cloudsGroups.destroyEach();
 trex.changeAnimation("running",trexRunning);
 score = 0;   
}