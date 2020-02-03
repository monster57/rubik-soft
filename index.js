const color = {
  G: "rgb(21, 251, 0)",
  B:"rgb(31, 1, 255)",
  O:"rgb(255, 119, 0)",
  R:"rgb(199, 8, 5)",
  Y:"rgb(246, 251, 0)",
  W:"rgb(226, 221, 221)"

}
const
    fs = require("fs"),
    { createCanvas } = require("canvas");

const WIDTH = 120;
const HEIGHT = 120;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#000000";
ctx.lineWidth = 3;


// var PDFImage = require("pdf-image").PDFImage;

// var pdfImage = new PDFImage("./files/First_work.pdf");
// pdfImage.convertPage(0).then(function(imagePath) {
//     // 0-th page (first page) of the slide.pdf is available as slide-0.png 
//     fs.existsSync("slide-0.png") // => true 
// }, function(err) {
//     console.log(err);
// });

// const    fs = require("fs");
// const PDFExtract = require('pdf.js-extract').PDFExtract;
// const pdfExtract = new PDFExtract();
// const options = {}; /* see below */
// pdfExtract.extract('./files/First_work.pdf', options, (err, data) => {
//   if (err) return console.log(err);
//   console.log(data.pages[1].content.length);
  
//   fs.writeFile("data.json" , JSON.stringify(data.pages[1]), (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// });
// });



function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }        
}


ctx.fillStyle = color.B;
roundRect(ctx, 2, 2, 37, 37, 5, true);
roundRect(ctx, 41, 2, 37, 37, 5, true);
roundRect(ctx, 80, 2, 37, 37, 5, true);
roundRect(ctx, 2, 41, 37, 37, 5, true);
roundRect(ctx, 2, 80, 37, 37, 5, true);
roundRect(ctx, 41, 41, 37, 37, 5, true);
roundRect(ctx, 41, 80, 37, 37, 5, true);
roundRect(ctx, 80, 41, 37, 37, 5, true);
roundRect(ctx, 80, 80, 37, 37, 5, true);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("test.png", buffer);


