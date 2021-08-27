/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();

  kangaroo = createSprite(100,300,30,30)
  kangaroo.addAnimation("running",kangaroo_running)
  kangaroo.addAnimation("collided",kangaroo_collided)
  kangaroo.scale=0.2
  

 kangaroo.setCollider("circle",0,0,300);
  kangaroo.debug = true

  invisibleGround=createSprite(400,380,800,20)
  invisibleGround.visible=false;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
 
  gameOver.scale = 1.0;
  restart.scale = 0.1;

  score=0
}

function draw() {
  background(255);

 
 


  if(gameState === PLAY){
 
    gameOver.visible = false;
    restart.visible = false;

    if (jungle.x < 50){
      jungle.x =width/4
    }
   jungle.velocityX = -5;
    kangaroo.x=camera.position.x-270;
  
    if(keyDown("space")) {
      kangaroo.velocityY = -12;
      jumpSound.play();
  }
  
  kangaroo.velocityY = kangaroo.velocityY + 0.8
  
  
  
  if(obstaclesGroup.isTouching(kangaroo)){
    gameState = END;
    collidedSound.play()
  }
  if(shrubsGroup.isTouching(kangaroo)){
   shrubsGroup.destroyEach()
   score=score+1
  }
  
  
  
  }else if(gameState === END){

    gameOver.visible = true;
    restart.visible = true;

    kangaroo.changeAnimation("collided",kangaroo_collided)

  kangaroo.velocityY=0
  jungle.velocityX = 0;

    // obstaclesGroup.setlifeTimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
   
     shrubsGroup.setVelocityXEach(0);
    //  shrubsGroup.setLifeTimeEach(-1);

  }

  
  
  kangaroo.collide(invisibleGround);
  spawnObstacles()
  spawnShrubs()
  drawSprites();
  fill("Red")
  textSize(20)
  text("Score:"+score,width/2,50)
}

function spawnShrubs(){
  if(frameCount % 150===0){
    var shrub=createSprite(camera.position.x+300,330,40,10)
    shrub.velocityX=-3;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      
      default: break;

    }
    
      shrub.scale = 0.1;
      shrub.lifetime = 300;

      shrubsGroup.add(shrub);
  }
}

function spawnObstacles(){
  if(frameCount % 350===0){
    var stone=createSprite(camera.position.x+300,330,40,10)
    stone.velocityX=-3;
    stone.addImage(obstacle1);
    
      stone.scale = 0.3;
      stone.lifetime = 300;

      obstaclesGroup.add(stone);
  }
}