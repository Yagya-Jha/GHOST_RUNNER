var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ghost,ghost_loader;
var tower,tower_loader,sound;
var climber,climber_loader,i_climber;
var door,door_loader;
var i_climberG,climber_G,doorG;
var score = 0;
function preload()
    {
      tower_loader = loadImage("tower.png");
      ghost_loader = loadImage("ghost-jumping.png");
      door_loader = loadImage("door.png");
      climber_loader = loadImage("climber.png");
      sound = loadSound("spooky.wav");
    }

function setup() {
  
  createCanvas(600, 600);   
  tower = createSprite(300,300);
  tower.addImage("tower",tower_loader);
  tower.velocityY = 4;
  ghost = createSprite(200,200,10,10);
  ghost.addImage("ghost",ghost_loader);
  ghost.scale = 0.4;
   i_climberG = new Group();
   climber_G = new Group();  
   doorG = new Group();
       }

function draw() {
  background("black");
  
  sound.loop();
  if(gameState===PLAY){
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY=ghost.velocityY+0.8; 
   
  ghost.setCollider("circle",0,7,140)
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("left")&&ghost.x>100){
    ghost.x = ghost.x-5;
  }
  
  if(keyDown("right")&&ghost.x<500){
    ghost.x = ghost.x+5;
  }
  spawn_doors();  
    
    if(ghost.isTouching(climber_G)){
      ghost.velocityY = 0;
      score = score+10;
    }
  
  if(i_climberG.isTouching(ghost)||ghost.y>600){
    gameState=END;
  }
  }
  else
      {
        if(gameState===END){
          ghost.destroy();
          doorG.destroyEach();
          climber_G.destroyEach();
          i_climberG.destroyEach();
          tower.destroy();
          textSize(50);
          fill("yellow");
          text("GAME OVER",100,300);
        }
      }
  drawSprites();
  textSize(24);
    fill("red");
    text("GHOST ACHIEVEMENT: "+score,180,50);
}
function spawn_doors(){
  if(World.frameCount%100===0){
    door = createSprite(200,0);
    
    door.addImage("door",door_loader);
    door.x=Math.round(random(100,500));
    door.velocityY = 3;
    door.lifeTime = 300;
    doorG.add(door);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    climber = createSprite(200,50);
    climber.x = door.x;
    
    climber.addImage("climber",climber_loader);
    climber.velocityY = 3;
    climber.lifeTime = 300;
    climber.debug = true;
    climber_G.add(climber);
    
    i_climber = createSprite(200,60);
    i_climber.width = climber.width;
    i_climber.height = 3;
    i_climber.x = door.x;
    i_climber.velocityY = 3;
    i_climber.lifeTime = 300;
    i_climberG.add(i_climber);
  }
}