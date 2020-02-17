let page = +process.argv[2];
const color = {
    G: "rgb(21, 251, 0)",
    B: "rgb(31, 1, 255)",
    O: "rgb(255, 119, 0)",
    R: "rgb(199, 8, 5)",
    Y: "rgb(246, 251, 0)",
    W: "rgb(226, 221, 221)"
};

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

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
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

let xAxis = 2;
let yAxis = 2;
const imageHeight = 37;
const imageWidth = 37;
const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const radius = 5;
const options = {}; /* see below */
let initial = 0;

function giveFolder(str, totalPieces) {
    let folders = [];
    let lines = Math.sqrt(totalPieces) / 3;
    let startingPoint = (((+str.substring(1))-1)*lines)+1;
    for (i = startingPoint; i < startingPoint+lines; i++) {
        folders.push(i);
    };
    return folders;
}

function giveNumber(str , totalPieces){
    let lines = Math.sqrt(totalPieces) / 3;
    var num = str.split("").filter(ele=>{
        if(isNaN(+ele)) return true;
    })

    var ch = num[0];
    var index = 0;

    var first = ((ch.charCodeAt(index)-65)*lines)+1;
    return first;
    

}

pdfExtract.extract('./files/First_work.pdf', options, (err, data) => {
    if (err) return console.log(err);
    var cubes = data.pages[page].content.slice(1, data.pages[1].content.length);
    var folders = giveFolder(data.pages[page].content.slice(0, 1)[0].str, cubes.length);
    var firstNum = giveNumber(data.pages[page].content.slice(0, 1)[0].str, cubes.length);
    var cubeNumber = firstNum;
    var count =0;
    var num = [];
    for (j = 0; j < cubes.length ; j = j + 3) {
        if(num.includes(j)){
            continue;
        };
        if(j%5 == 0 & j!=0){ 
            count++
        };
        initial = j;
        xAxis = 2;
        yAxis = 2;
        //Start: canvas for each rubik cube
        for (i = initial; i <= initial + 2; i++) {
            num.push(i);
            ctx.fillStyle = color[cubes[i].str];
            roundRect(ctx, xAxis, yAxis, imageHeight, imageWidth, radius, true);
            xAxis += 39;
        }

        xAxis = 2;
        yAxis += 39;
        initial += 15;
        for (var i = initial; i <= initial + 2; i++) {
            num.push(i);
            ctx.fillStyle = color[cubes[i].str];
            roundRect(ctx, xAxis, yAxis, imageHeight, imageWidth, radius, true);
            xAxis += 39;
        }

        xAxis = 2;
        yAxis += 39;
        initial += 15;
        for (var i = initial; i <= initial + 2; i++) {
            num.push(i);
            ctx.fillStyle = color[cubes[i].str];
            roundRect(ctx, xAxis, yAxis, imageHeight, imageWidth, radius, true);
            xAxis += 39;
        }
        //End: canvas for each rubik cube
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("Result/" + folders[count] + "-"+cubeNumber+".png", buffer);
        cubeNumber++;
        if((cubeNumber-1)%5 == 0){
            cubeNumber = firstNum;
        }
        

    }

    fs.writeFile("data.json", JSON.stringify(data.pages[1].content.slice(0, 1)), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});


// ctx.fillStyle = color.B;
// roundRect(ctx, 2, 2, 37, 37, 5, true);
// roundRect(ctx, 2, 41, 37, 37, 5, true);
// roundRect(ctx, 2, 80, 37, 37, 5, true);

// roundRect(ctx, 41, 2, 37, 37, 5, true);
// roundRect(ctx, 41, 41, 37, 37, 5, true);
// roundRect(ctx, 41, 80, 37, 37, 5, true);

// roundRect(ctx, 80, 2, 37, 37, 5, true);
// roundRect(ctx, 80, 41, 37, 37, 5, true);
// roundRect(ctx, 80, 80, 37, 37, 5, true);