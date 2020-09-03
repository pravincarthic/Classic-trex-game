var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var play = 1;
var end = 0;
var state = play;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, jump, die, checkpoint, restart,restart_image, gameover, over;

var score = 0;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkpoint.mp3");
  restart_image = loadImage("restart.png");
  over = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Trexc", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;


  gameover = createSprite(200, 30, 400, 20);
  gameover.addImage("over", over);
  gameover.visible = false;
  
  restart = createSprite(200, 100, 40, 20);
  restart.addImage("restart1", restart_image);
  restart.visible = false;


  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();


}

function draw() {
  background(180);
  drawSprites();
  score = World.frameCount;
  text("Score: " + score, 500, 50);

  if (state == play) {
    score = 0;
    ground.velocityX = -4;

    score = score + Math.round(getFrameRate() / 100);
    if (keyDown("space")) {
      trex.velocityY = -10;
      // addSound(jump);
    }
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    if (trex.isTouching(obstaclesGroup) || trex.isTouching(cloudsGroup)) {
      state = end;

    }
  }
    if (state == end) {
      trex.changeAnimation("Trexc", trex_collided);
      ground.velocityX = 0;
      trex.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityYEach(0);
      cloudsGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityYEach(0);
      restart.visible = true;
      gameover.visible = true;
      
      if(mousePressedOver(restart)){
      state = play;
      gameover.visible = false;
      restart.visible = false;
      trex.addAnimation(trex_running);
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      trex.changeAnimation("running", trex_running);
      score = 0;

    }
    }
        
  }
  


  function spawnClouds() {
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      var cloud = createSprite(600, 120, 40, 10);
      cloud.y = Math.round(random(80, 120));
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;
      cloud.velocityX = -3;

      //assign lifetime to the variable
      cloud.lifetime = 200;

      //adjust the depth
      cloud.depth = trex.depth;
      trex.depth = trex.depth + 1;

      //add each cloud to the group
      cloudsGroup.add(cloud);
    }

  }

  function spawnObstacles() {
    if (frameCount % 60 === 0) {
      var obstacle = createSprite(600, 165, 10, 40);
      obstacle.velocityX = -4;

      //generate random obstacles
      var rand = Math.round(random(1, 6));
      switch (rand) {
        case 1:
          obstacle.addImage(obstacle1);
          break;
        case 2:
          obstacle.addImage(obstacle2);
          break;
        case 3:
          obstacle.addImage(obstacle3);
          break;
        case 4:
          obstacle.addImage(obstacle4);
          break;
        case 5:
          obstacle.addImage(obstacle5);
          break;
        case 6:
          obstacle.addImage(obstacle6);
          break;
        default:
          break;
      }

      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }

  function restartGame() {
    score = 0;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    state = play;
  }

