var dolphin, dolphinImg, piranhaImg, backgroundImg, bg, count; 

function preload() {
  backgroundImg = loadImage("seaImage.jpg");
  dolphinImg = loadImage("dolphin image for game.png");
  piranhaImg = loadImage("piranha-cartoon-vector-6917170.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight - 120);

  bg = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bg.addImage(backgroundImg);
  bg.scale = 6;
  bg.velocityX = -3;
  bg.x = bg.width/2;

  dolphin = createSprite(displayWidth/5, displayHeight/2, 150, 50);
  dolphin.addImage(dolphinImg);
  dolphin.scale = "0.8";

  count = 0;
}

function draw() {
  background("blue");  

  if(bg.x<100){
    bg.x = bg.width/2;
    }

  if(keyDown("up")){
    dolphin.velocityY = -4;
  }

  if(keyDown("down")){
    dolphin.velocityY = 4;
  }

  count = count + Math.round(World.framerate/60);

  

  spawnObstacles(); 

  drawSprites();


}

function spawnObstacles() {
  if(frameCount % 100 === 0){
    var obstacle = createSprite(displayWidth, displayHeight/2, 120, 120);
    obstacle.addImage(piranhaImg);
    obstacle.scale = "0.5";
    obstacle.y = Math.round(random(0,displayHeight - 120));
    obstacle.velocityX = Math.round(random(-3, -7));
  }
} 
