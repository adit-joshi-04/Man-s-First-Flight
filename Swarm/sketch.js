// Ernst Schmidt
// www.ernst-schmidt.com

// open file tree on the left to see all files

function setup() {
  let canvas = createCanvas(1920, 1080);
  canvas.parent('chapter-4')

  showLines = false;
  showUI = false;
  blur = false;

  // slider = createSlider(1, 1000, 200);
  // sliderBuffer = 5;
  // slider.position(width / 2 - slider.width / 2, height - slider.height - sliderBuffer);
  
  
  swarm = new Array(population);
  for (let i = 0; i < swarm.length; i++) {
    swarm[i] = new Entity(random(0, width), random(0, height));
  }

  blasts = [];
}

var population = 1;


  function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }

async function delayedLoop() {
  
  for (let i = 1; i <= 500; i++) {
    population = i;
    await delay(10);
    // console.log(population);
  }
  }
  
  delayedLoop();

function draw() {
  //blur effect
  // if (blur) {
  //   background(0, 80);
  // } else {
  //   background(0);
  // }
  
  clear();

  handleBlasts();
  handleSwarm();
  
  for (let i = 0; i < swarm.length; i++) {
    swarm[i].display();
  }

  if (showUI) {
    displayFrameRate();
    displayPopulationSize();
  }
}

function handleBlasts() {
  if (blasts.length > 0) {
    for (let i = blasts.length - 1; i >= 0; i--) {
      if (blasts[i].lifePoints <= 0) {
        blasts.splice(i, 1);
      } else {
        blasts[i].update();
        blasts[i].display();
      }
    }
  }
}

function handleSwarm() {
  if (swarm.length < population) {
    for (let i = swarm.length; i < population; i++) {
      swarm.push(new Entity(random(0, width), random(0, height)));
    }
  }
  if (swarm.length > population) {
    swarm.splice(slider.value(), swarm.length);
  }
  for (let i = 0; i < swarm.length; i++) {
    swarm[i].do();
  }
}

function displayPopulationSize() {
  textAlign(LEFT, BOTTOM);
  textSize(15);
  fill(255, 200);
  noStroke();
  text(swarm.length, width / 2 + slider.width / 2 + 10, height - 3 - sliderBuffer);
}

function displayFrameRate() {
  textAlign(LEFT, BOTTOM);
  var notRed = map(frameRate(), 30, 55, 0, 255);
  textSize(15);
  fill(255, notRed, notRed, 200);
  text(floor(frameRate()), 5, 17);
}

function mouseClicked() {

  if (onSlider(mouseX, mouseY) && showUI) {
    return;
  }
  blasts.push(new Blast());

}

function onSlider(x, y) {
  if (y > height - slider.height - 2 * sliderBuffer) {
    if (x >= width / 2 - slider.width / 2 - sliderBuffer && x <= width / 2 + slider.width / 2 + sliderBuffer) {
      return true;
    }
  }
  return false;
}

// function keyPressed() {
//   if (key === "l" || key === "L") {
//     showLines = !showLines;
//   }
//   if (key === "u" || key === "U") {
//     showUI = !showUI;
//     if (showUI) {
//       slider.show();
//     } else {
//       slider.hide();
//     }
//   }
//   if (key === "b" || key === "B") {
//     blur = !blur;
//   }
// }