/* // Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/93K1nfgDb/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function fileSelectHandler(event) {
  for (const file of event.target.files) {
    p5.File._load(file, fileHandler);
  }
}
function fileHandler(file) {
  console.log(file);
  if (file.type === "image") {
    // we can load the image into an DOM img element
    console.log("it was an image file");
    const imgElt = createImg(file.data, "");
    imgElt.hide();
    // but we can also load it into a p5.Image
    // and draw it to the canvas
    loadImage(file.data, (image) => {
      console.log("image data loaded into p5.Image");
      // letter box it (resize it to fit the canvas)
      // img = image;
      classifier.classify(image, gotResult);
    });
  }
}

function setup() {
  createCanvas(320, 260);
  input = select("#file");
  console.log(input);
  input.elt.addEventListener("change", fileSelectHandler, false);
  // Create the video
  // video = createCapture(VIDEO);
  // video.size(320, 240);
  // video.hide();

  // flippedVideo = ml5.flipImage(video);
  // Start classifying
  // classifyVideo();
}

function draw() {
  // background(0);
  // Draw the video
  // image(flippedVideo, 0, 0);

  // Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  // flippedVideo = ml5.flipImage(video)
  // classifier.classify(flippedVideo, gotResult);
  // flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  console.log(label);
  //location.href = `result.html?label=${label}`;
  // Classifiy again!
  // classifyVideo();
} 
*/

let cnv, clearButton, saveButton;
let px, py; // stores the previous mouse positions
let img;
let classifier;
let labelElement, confidenceElement;
let loadingModel = false;
let classifiying = false;
function preload() {
  const status = select("#status");
  let imageModelURL =
    "https://teachablemachine.withgoogle.com/models/ERkgF6SRb/";
  status.elt.innerText = "Loading model...";
  loadingModel = true;
  classifier = ml5.imageClassifier(imageModelURL + "model.json", function () {
    console.log("model loaded successfully");
    loadingModel = false;
    status.elt.innerText = "Model loaded successfully";
    const interval = setInterval(() => {
      if (!loadingModel) {
        clearInterval(interval);
        status.elt.innerText = "Ready for your drawing...";
      }
    }, 1000);
  });
}

/*function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent("sketch");
    background(255);

    px = mouseX; // initialize previous mouse x
    py = mouseY; // initialize previous mouse y

    // Button to clear the canvas
    clearButton = createButton("Clear Canvas");
    clearButton.parent("buttons");
    clearButton.mousePressed(clearCanvas);

    // Button to save the canvas
    saveButton = createButton("Save Canvas");
    saveButton.parent("buttons");

    saveButton.mousePressed(classifyCanvas);
    strokeCap(ROUND);
    const status = select("#status");
      }*/
function setup() {
  createCanvas(320, 260);
  input = select("#file");
  console.log(input);
  input.elt.addEventListener("change", fileSelectHandler, false);
  // Create the video
  // video = createCapture(VIDEO);
  // video.size(320, 240);
  // video.hide();

  // flippedVideo = ml5.flipImage(video);
  // Start classifying
  // classifyVideo();
}
function fileSelectHandler(event) {
  for (const file of event.target.files) {
    p5.File._load(file, fileHandler);
  }
}
function fileHandler(file) {
  console.log(file);
  if (file.type === "image") {
    // we can load the image into an DOM img element
    console.log("it was an image file");
    const imgElt = createImg(file.data, "");
    imgElt.hide();
    // but we can also load it into a p5.Image
    // and draw it to the canvas
    loadImage(file.data, (image) => {
      console.log("image data loaded into p5.Image");
      // letter box it (resize it to fit the canvas)
      // img = image;
      classifier.classify(image, (err, result) => {
        classifiying = false;
        //status.elt.innerText = "Classified successfully";
        console.log(result);
        labelElement = select("#label");
        labelElement.elt.innerText = `Label: ${result[0].label}`;
        // labelElement.createDiv(`Label: ${results[0].label}`);
        confidenceElement = select("#confidence");
        confidenceElement.elt.innerText = `Confidence: ${(
          result[0].confidence * 100
        ).toFixed(2)} %`;
        label = result[0].label;
        console.log(label);
        location.href = `result.html?label=${label}`;
      });
    });
  }
}
