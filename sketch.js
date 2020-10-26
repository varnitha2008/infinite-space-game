var spaceImage,bg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var rocket,rImage;
var stone,sImage;
var invisibleground,ground;
var score=0, score1 = 1; 
var monster,mg;
var scoreS,endS;

function preload() {
  
  spaceImage=loadImage("space 2.png");
  rImage=loadImage("rocket.png");
  sImage=loadImage("34.png");
  mg=loadImage("n.jpg");
  scoreS=loadSound("magic-tokens-13-game-fx-sound-effect-6228638.mp3");
  endS=loadSound("end-tone-01-sound-effect-665284.mp3");
}


function setup(){
  createCanvas(windowWidth,windowHeight);
  
  
  bg=createSprite(300,300,300,300);
  bg.addImage(spaceImage);
  
  rocket=createSprite(200,150,20,20);
  rocket.addImage(rImage);
  rocket.scale=0.4;
  
  
  
  stonesGroup=createGroup();
  monsterGroup=createGroup();
  
  score=0;
 
  rocket.setCollider("rectangle",0,0,rocket.width,rocket.height);
  rocket.debug = true;
}


function draw(){
  
  if (gameState===PLAY){
    
    
if(bg.y>700){
    bg.y=bg.height/7;
  }
   bg.velocityY=5;
  
  if(keyDown("space")){
    rocket.velocityY=-6;
    
  }
    rocket.velocityY=rocket.velocityY+0.5;
      
    if(keyDown("right")){
      rocket.x=rocket.x+3;
    }
    
    if(stonesGroup.isTouching(rocket)){
      stonesGroup.destroyEach();
      score1=score1+1;
      scoreS.play();
    }
    
     if(monsterGroup.isTouching(rocket)){
      rocket.velocityY=0;
      bg.velocityX=0;
      monsterGroup.setVelocityXEach(0);
      gameState=END; 
      endS.play(); 
       
     }
       
    
     if(keyDown("left")){
      rocket.x=rocket.x-3;
    }
     
    
    Spawnstone();
     Spawnmonster();
  
   
   drawSprites()
      
       fill("white");
       textSize(25);
       text("Score : " + score1, 200,30);
      
    }    //main
  
    
  else if(gameState==END){
  
     if(monsterGroup.isTouching(rocket)){
      rocket.velocityY=0;
      bg.velocityX=0;
      monsterGroup.setVelocityXEach(0);
      gameState=END
       
        fill("yellow");
       textSize(25);
       text("GAME OVER",200,400);
      
    }
      
  }
   
 }


function Spawnstone(){
  
  if(frameCount%200===0){
   
    rocket.velocityY = -(6 + 3*score/100);
    
    stone=createSprite(Math.round(random(300,100)),100,10,10);
    stone.addImage(sImage);
    stone.scale=0.2;
    stone.velocityY=3;
    stone.lifetime=-300;
    
       var rand = Math.round(random(1,6));
       switch(rand) {
       case 1: stone.addImage(sImage);
              break;
     default: break;
    }
    stone.depth= rocket.depth;
    rocket.depth= rocket.depth+1;
    stonesGroup.add(stone);
     }
}


function Spawnmonster(){
  
   if(frameCount%200===0){
   
    rocket.velocityY = -(6 + 3*score/100);
    
    monster=createSprite(Math.round(random(300,200)),100,10,10);
    monster.shapeColor="red";
    monster.scale=1;
    monster.velocityX=-3;
    monster.lifetime=-300;
    
     
       var rand = Math.round(random(1,6));
       switch(rand) {
       case 1: monster.addImage(mg);
              break;
     default: break;
    }
    monster.depth= rocket.depth;
    rocket.depth= rocket.depth+1;
     
    monsterGroup.add(monster); 
     }
  
}
