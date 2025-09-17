/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/
let petals;
let thickness; 
let size;
let strokeW = 5;
var doExport = false;

function setup() {
  var canvas = createCanvas(400, 400, SVG);
  canvas.parent('sketch-holder');
  canvas.style('display', 'block');
  angleMode(RADIANS);
  
  //setup sliders
  petals = createSlider(3,24,1,1);
  petals.position(10,10);
  
  thickness = createSlider(1,10,1,1);
  thickness.position(10,30);
  
  size = createSlider(10,300,5,1);
  size.position(10,50);
    
  // setup stroke
  noFill();
  strokeWeight(strokeW)
  stroke(0);
}

function keyPressed() {
  // trigger save on keypress
  if (key === 's' || key === 'S') {
    doExport = true;
  }
}

function draw() {
  clear(); // Important;starts the canvas fresh.
  
  if (!doExport) {
    background(255);
  }

  drawGrid(6, 6);
  
  // save function 
  if (doExport) {
    var svgFilename = "flower.svg"; 
    saveSVG(svgFilename);
    doExport = false;
  }
}

function drawMotif(x, y) {
  
  // establish variables and vectors
  let rot_angle = (2*PI / radians(petals.value()));
  let sizeL = size.value();
  let petalWidth = (PI*0.7*sizeL)/petals.value();
  strokeWeight(thickness.value());
  
  let origin = createVector(x, y);//(random(0, windowWidth));
  let length = createVector(origin.x, origin.y - sizeL);
  let midL = createVector(origin.x - petalWidth, origin.y - (0.7*sizeL));
  let midR = createVector(origin.x + petalWidth, origin.y - (0.7*sizeL));
  let tip = length;
  
  beginShape();
  
  for (let i = 0; i < petals.value(); i += 1)
    {
      // left curve
      bezier(origin.x, origin.y, midL.x, midL.y, midL.x, midL.y, tip.x, tip.y);
      //right curve 
      bezier(origin.x, origin.y, midR.x, midR.y, midR.x, midR.y, tip.x, tip.y);
      
      // rotate vectors for next petal
      tip = rotateVector(origin, tip, radians(rot_angle));
      midL = rotateVector(origin, midL, radians(rot_angle));
      midR = rotateVector(origin, midR, radians(rot_angle));
    }
  
  endShape();
}

// vector rotation function
function rotateVector(origin, vec, angle) {
  let translated = p5.Vector.sub(vec, origin);
  translated.rotate(angle);
  return p5.Vector.add(translated, origin);
}

function drawGrid(petalRows, petalColumns) {
  let rowRatio = (400 / petalRows);
  let colRatio = (400 / petalColumns);
  
  for (let i = 1; i < petalRows; i += 1) {
    for (let j = 1; j < petalColumns; j += 1) {
      drawMotif(colRatio*j, rowRatio*i);
    }
  }
}

function drawSin(petalRows, petalColumns) {
  let rowRatio = (400 / petalRows);
  let colRatio = (400 / petalColumns);
  let vertical = size.value()*0.3;
  
  for (let i = 1; i < petalRows; i += 1) {
    for (let j = 1; j < petalColumns; j += 1) {
      vertical = -1*vertical;
      //point(colRatio*j, (rowRatio*i + vertical));
      drawMotif(colRatio*j, rowRatio*i + vertical);
    }
  }
}