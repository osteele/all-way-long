//page1 broken
let brokenParticles = [];
let brokenParticlesState = false;
let virusState = false;
let datavisState = false;
let wavingState = false;
let playmusic = false;
//page2 virus
let cnv, virus, ready, ball;
const READY = 1;
const SHOOTING = 2;
const END = 3;
let gameState = READY;
//page3 datavis
let data;
let color = 50;
let ballbase1;
//page4 ending
let connectedParticles = [];
let endingState = false;
//default
let page = 'broken';

var time, theta = 0;
var frames = 300;
var num = 60;



function preload() {
  data = loadJSON("projects.json");
  bgm1 = loadSound("sound/bgm1.mp3");
  bgm2 = loadSound("sound/bgm2.mp3");
  bgm3 = loadSound("sound/bgm3.mp3");
  bgm4 = loadSound("sound/bgm4.mp3");
}



function setup() {
  textAlign();
  textFont("EB Garamond");
  cnv = createCanvas(windowWidth, windowHeight);
  // page1 broken
  for (let i = 0; i < width / 6; i++) {
    brokenParticles.push(new BrokenParticles());
  }
  // page2 virus
  angleMode(DEGREES);
  virus = new Virus();
  ready = new Ready();
  ball = new Ball();
  ballbase1 = new Ballbase();
  // page4 ending
  for (let i = 0; i < width / 6; i++) {
    connectedParticles.push(new ConnectedParticles());
  }

  // if (page == 'ending') {
  smooth(8);
  noStroke();
  rs = random(10000);


}




function draw() {
  background('#0f0f0f');
  textSize(20)



  // ----------------------------------------------------------------------------------------所有state对应sketch
  if (endingState) {
    datavisState = false;
    for (let i = 0; i < connectedParticles.length; i++) {
      connectedParticles[i].createParticle();
      connectedParticles[i].moveParticle();
      connectedParticles[i].joinParticles(connectedParticles.slice(i));

    }
    textSize(30);
    textAlign(CENTER);
    text("04 Creative Coding - Arrival", width / 2, height / 2);
    text("Present by Jyoti and Cara", width / 2, height / 2 + 300);
    if (bgm4.isPlaying() == false) {
      bgm4.play();
      bgm1.stop();
      bgm2.stop();
      bgm3.stop();
    }
    rect(30, 30, 50, 50);
    let d = dist(mouseX, mouseY, 30, 30);
    if (d < 50) {
      textSize(25);
      textAlign(LEFT);
      textFont("EB Garamond");
      text(data.projects[3].instruction, 40, 120)
    }
  }

  if (brokenParticlesState) {
    for (let i = 0; i < brokenParticles.length; i++) {
      brokenParticles[i].createParticle();
      brokenParticles[i].moveParticle();
      brokenParticles[i].joinParticles(brokenParticles.slice(i));
    }
    // text('Generative Art - Scattered Knowledege.', width / 2 - 80, height / 2);
    if (bgm1.isPlaying() == false && mouseIsPressed) {
      bgm1.play();
      bgm2.stop();
      bgm3.stop();
      bgm4.stop();
    }
    // rect(10, 10, 10, 10);
    // let d = dist(mouseX, mouseY, 10, 10);
    // if (d < 10) {
    //   text(data.projects[0].instruction, 10, 30)
    // }
  }
  // if (playmusic == true) {

  // }


  if (datavisState) {

    // ballbase1.update();
    randomSeed(rs);
    background("black");
    time = (frameCount % frames) / float(frames);
    for (var i = 0; i < num; i++) {
      drawBubble(i);
    }
    theta += TWO_PI / frames;

    ballbase1.wave();
    ballbase1.displayBall();
    fill(255, 201, 135);
    textSize(30);
    textAlign(CENTER);
    text("03 Data Visualization - Journey", width / 2, height / 2)
    if (bgm3.isPlaying() == false) {
      bgm3.play();
      bgm1.stop();
      bgm2.stop();
      bgm4.stop();
    }
    rect(30, 30, 50, 50);
    let d = dist(mouseX, mouseY, 30, 30);
    textAlign(LEFT);
    if (d < 50) {
      textFont("EB Garamond");
      textSize(25);
      text(data.projects[2].instruction, 40, 120)
    }
  }

  if (virusState) {
    // if (gameState === END) {
    //   // push();
    //   // textFont('Orbitron');
    //   // textSize(50);
    //   // textAlign(CENTER, CENTER);
    //   // fill('yellow');
    //   // text("YOU WIN!", width / 2 + 4, height / 2 - 56 + random(-5, 5));
    //   // fill(255, 0, 255);
    //   // text("YOU WIN!", width / 2, height / 2 - 60 + random(-5, 5));
    //   // pop();
    //   page = 'datavis'
    // }
    if (gameState === READY) {
      ready.move();
      ready.draw();

      virus.distractFrom(ready.center, ready.length);
      virus.move();
      virus.checkBorder();
      virus.draw();
      //text('Interactive Experience - Hit the Virus.', width / 2 - 80, height / 2);
      // console.log('here')
    } else if (gameState === SHOOTING) {
      if (virus.checkCollision(ball.pos, ball.size)) {
        gameState = END;
      }
      if (ball.checkFallout()) {
        gameState = READY;
      }
      virus.move();
      virus.checkBorder();
      virus.draw();
      ball.move();
      ball.checkBorder();
      ball.draw();
    }
    //text('Interactive Experience - Hit the Virus.', width / 2 - 80, height / 2);
    if (bgm2.isPlaying() == false) {
      bgm2.play();
      bgm1.stop();
      bgm3.stop();
      bgm4.stop();
    }

  }


  // ----------------------------------------------------------------------------------------所有page对应state
  // page 1 broken
  if (page == 'ending') {
    datavisState = false;
    virusState = false;
    brokenParticlesState = false;
    endingState = true;
    console.log('yes')




  }
  // else if (page == 'datavis') {
  //   brokenParticlesState = false;
  //   virusState = false;
  //   datavisState = true;
  // }
  else if (page == 'virus') {
    brokenParticlesState = true;
    // brokenParticlesState2 = true; //draw brokenParticles ???
    virusState = true;
    datavisState = false;
    fill(255, 133, 214);
    textSize(30);
    textAlign(CENTER);
    text("02 Interactive Experience - Hit the Virus", width / 2, height / 2);
    rect(30, 30, 50, 50);
    let d = dist(mouseX, mouseY, 30, 30);
    if (d < 50) {
      textSize(25);
      textFont("EB Garamond");
      textAlign(LEFT);
      text(data.projects[1].instruction, 40, 120)
    }
    // rect(10, 10, 10, 10);
    // let d = dist(mouseX, mouseY, 10, 10);
    // if (d < 10) {
    //   text(data.projects[1].instruction, 10, 30)
    // }


  } else if (page == 'broken') {
    brokenParticlesState = true; //draw brokenParticles
    virusState = false;
    datavisState = false;
    playmusic = true;
    fill('rgba(200,169,169,0.9)');
    textSize(30);
    textAlign(CENTER);
    text('01 Generative Visuals - Scattered', width / 2, height / 2);
    rect(30, 30, 50, 50);
    let d = dist(mouseX, mouseY, 30, 30);
    if (d < 50) {
      textSize(25);
      textFont("EB Garamond");
      textAlign(LEFT);
      text(data.projects[0].instruction, 40, 120)
    }
    //text('Scattered', width / 2 - 50, 100 + height / 2);





  }



  // ----------------------------------------------------------------------------------------切换page
  if (gameState === END) {
    page = 'datavis';
    brokenParticlesState = false;
    virusState = false;
    datavisState = true;

  }

  if (mouseX > width - 3) {
    page = 'virus';
  }
  push()
  strokeWeight(5)
  fill("black");
  textSize(20);
  textAlign(LEFT);
  text("TIPs", 35, 60)
  pop()
}




function keyPressed() {
  if (gameState === READY) {
    ball.setPosition(ready.actualPos);
    ball.setVelocity(ready.pos.copy().mult(0.1));
    gameState++;
  }
}

function drawBubble(i) {
  var x = random(width);
  var y = random(height);
  var sc = random(1, 3);
  //var rotation = random(-.01, 0.1);
  var m = map(sin(theta + (TWO_PI / num) * i), -1, 1, 0.5, 1.5);
  var sz = random(10, 30) * 2 * m;
  push();
  scale(sc);
  translate(x, y);
  fill(250, 179, 92);
  //
  ellipse(0, -time * height + height, sz, sz);
  ellipse(0, -time * height, sz, sz);
  pop();
}
