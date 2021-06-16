var dolphin, dolphinImg, piranhaImg, backgroundImg, bg, health, obstacle, gameState, restartButtonImg, restartButton, gameOverButtonImg, gameOverButton, healthBarImg, startbgImg, startButtonImg; 
var obstacleGroup;
var dolphinFollower;

function preload() {
  backgroundImg = loadImage("seaImage2.jpg");
  dolphinImg = loadImage("dolphin image for game.png");
  piranhaImg = loadImage("piranha-cartoon-vector-6917170.png");
  restartButtonImg = loadImage("RESTARTBUTTON.png");
  gameOverButtonImg = loadImage("GAMEOVERBUTTON.png");
  healthBarImg = loadImage("Pixelheart.png");
  startbgImg = loadImage("startbg.jpg");
  startButtonImg = loadImage("startbutton.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight - 120);
  bg = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bg.addImage("start", startbgImg);
  bg.addImage("play", backgroundImg);

  healthImg = createSprite(130, 50, 125, 60)
  healthImg.addImage(healthBarImg);
  healthImg.scale = 0.08;
  
  dolphin = createSprite(displayWidth/5, displayHeight/2, 420, 170);
  dolphin.visible = false;
  //dolphin.addImage(dolphinImg);
  dolphin.scale = 0.8;

  dolphinFollower = createSprite(displayWidth/5, displayHeight/2, 420, 170);
  dolphinFollower.addImage(dolphinImg);
  dolphinFollower.visible = false;

  health = 100;

  distanceTraveled = 0;

  gameState = "start";

  obstacleGroup = new Group();

  restartButton = createSprite(displayWidth/2, displayHeight/2);
  restartButton.addImage(restartButtonImg);
  restartButton.visible = false;
  restartButton.scale = 0.5;

  gameOverButton = createSprite(displayWidth/2, displayHeight/2 - 160);
  gameOverButton.addImage(gameOverButtonImg);
  gameOverButton.visible = false;

  startButton = createSprite(displayWidth/2, displayHeight/2);
  startButton.addImage(startButtonImg);
}

function draw() {
  background("white");  

  dolphinFollower.x = dolphin.x;
  dolphinFollower.y = dolphin.y;

  if(gameState === "start"){
    healthImg.visible = false;

    bg.scale = 1.9;
   
    startButton.scale = 0.3;
    if(mousePressedOver(startButton)){
      gameState = "play";
      }
  }

  if(gameState === "play"){
    
    //dolphin.debug = true;
    
    dolphinFollower.visible = true;
    startButton.visible = false;
    healthImg.visible = true;

    distanceTraveled = distanceTraveled + Math.round(World.frameRate/60);
    
    bg.changeAnimation("play");

    bg.scale = 6;
    bg.velocityX = -3;
    bg.x = bg.width/2;

    text("Distance Traveled: "+ distanceTraveled, 250, 100);

    if(bg.x < 100){
      bg.x = bg.width/2;
    }
  
    if(keyDown("up")){
      dolphin.velocityY = -4;
    }
  
    if(keyDown("down")){
      dolphin.velocityY = 4;
    }

    spawnObstacles(); 

    for (var i = 0; i < obstacleGroup.length; i++) {
      if (obstacleGroup.get(i).isTouching(dolphin)) {
          obstacleGroup.get(i).destroy();
          health = health - 25;
      }
  }

    if(health === 0){
      gameState = "end";
    }
  
  }else if(gameState === "end"){
      dolphin.setVelocity(0,0);
      obstacleGroup.setVelocityEach(0,0);
      bg.velocityX = 0;
      restartButton.visible = true;
      gameOverButton.visible = true;

      if(mousePressedOver(restartButton)){
        restartButton.visible = false;
        gameOverButton.visible = false;
        dolphin.y = displayHeight/2;
        health = 100;
        obstacleGroup.destroyEach();
        gameState = "play";
        }
  }
  


  drawSprites();

  fill(0)
  textSize(20)
  text(health, 180, 50);

  

  //text("X :"+mouseX +" Y :"+ mouseY,mouseX,mouseY);


}

function spawnObstacles() {
  if(frameCount % 100 === 0){
    obstacle = createSprite(displayWidth, displayHeight/2, 120, 120);
    obstacle.addImage(piranhaImg);
    obstacle.scale = 0.5;
    obstacle.y = Math.round(random(0,displayHeight - 120));
    obstacle.velocityX = Math.round(random(-3, -7));
    obstacleGroup.add(obstacle);
  }
} 
