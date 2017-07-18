

var rows;
var cols;
var cw = 2;
var rh = 2;
var txtSize = 70;

var textPos;
var pos;
var rePos;
var blockDim;
var txt;
var letters = [];
var images = [];
var myCanvas;
var backColor; 



function setup(){
	backColor = color('#cc6600');
	background(backColor);
	//background(144,191,96);

	myCanvas = createCanvas(800, 400);
	typeWriter = new TypeWriter();
	
	//p5.vectors
	pos = createVector(0,0);
	textPos = createVector(0, 0);
	relPos = createVector(0,0);
	blockDim = createVector(cw, rh);
	letters = loadLetters(blockDim);
}


function draw(){
	//background(144,191,96);
	background(backColor);
	typeWriter.draw();
}


function keyTyped(){
	if (key.charCodeAt(0)==32){
		typeWriter.space();
	} else if (key.charCodeAt(0)==13){
		typeWriter.return();
	} else {
		typeWriter.addLetter(images[key.charCodeAt(0)-49]);
	}
}

function loadLetters(blockDim){

	for(var i = '1'.charCodeAt(0); i<= 'z'.charCodeAt(0); i++){
		letters.push(String.fromCharCode(i));
	}

	var pos = createVector(0,0);

	for (var i = 0; i < letters.length; i++){
		images[i] = new TextImage(letters[i], txtSize, blockDim.x, blockDim.y);
		images[i].setPos(textPos);
		images[i].display();
		images[i].getImage();
		images[i].img.loadPixels();
		images[i].getBlocks();
		//background(144,191,96);
		background(backColor);

	}


}

function TypeWriter(){
	this.typed = [];
	this.letterPos = [];
	this.hpadding = width/10;
	this.vpadding = height/4;

	this.startPos = createVector(this.hpadding,this.vpadding);
	this.lastPos = this.startPos.copy();
}

TypeWriter.prototype.draw = function(){
    for(var t = 0; t< this.typed.length; t++){
		for (var i = 0; i< this.typed[t].rows; i++){
			for (var j = 0; j< this.typed[t].cols; j++){
				this.typed[t].blocks[i*this.typed[t].cols+j].display(this.letterPos[t].x, this.letterPos[t].y);
				this.typed[t].blocks[i*this.typed[t].cols+j].go.add(
					this.typed[t].blocks[i*this.typed[t].cols+j].spd);
				this.typed[t].blocks[i*this.typed[t].cols+j].checkEnd();
			}
		}
	}
}

TypeWriter.prototype.addLetter = function(typedLetter){
	this.typed.push(typedLetter);
	if (this.typed.length == 1){
		this.letterPos.push(createVector(this.hpadding,this.vpadding));		
	} else {
		this.letterPos.push(createVector(this.lastPos.x + this.typed[this.typed.length - 2].w, this.lastPos.y));
		this.lastPos.set(this.letterPos[this.letterPos.length - 1]);
	}
}
TypeWriter.prototype.space = function(){
	this.lastPos.add(ceil(txtSize/3),0);
}
TypeWriter.prototype.return = function(){
	this.lastPos.add(-this.lastPos.x-this.typed[this.typed.length-1].w + this.hpadding, txtSize);
}

function TextImage(txt, txtSize, cw, rh){

	
	//text
	this.txt = txt;
	fill(0).textSize(txtSize);
	textFont("Verdana");
	textAlign(LEFT, TOP);
	
    //dimensions of blocks
	this.blockDim = createVector(cw, rh);

	//image width and height - divisible by block dims
	this.w = textWidth(txt) + (blockDim.x - (textWidth(txt) % blockDim.x));
	this.h = textSize()+(blockDim.y - (textSize() % blockDim.y));
	this.imageDim = createVector(this.w, this.h);


	//cols - blocks in x dim
	//rows - blocks in y dim
	this.cols = this.w/this.blockDim.x;
	this.rows = this.h/this.blockDim.y;

	this.blocks = [];
	this.relPos = createVector(0,0);

	this.setPos = function(txtPos) {
		this.pos = txtPos;
	}

	//function to display text
	this.display = function() {
			text(this.txt,this.pos.x, this.pos.y);
		}

	//get image of text 
	this.getImage = function(){
		this.img = get(this.pos.x, this.pos.y + this.h*0.2, this.w, this.h);
	}

	this.print = function() {
		console.log(this.txt, this.pos, this.w, this.h, this.img);
	}

}

TextImage.prototype.getBlocks = function (){
	for (var i = 0; i< this.rows; i++){
		for (var j = 0; j< this.cols; j++){
			this.relPos.set(j*this.blockDim.x, i*this.blockDim.y);
			
			//this.blocks.push(b);
			this.blocks[i*this.cols+j] = new Block(this.relPos, this.blockDim, this.imageDim);

			this.blocks[i*this.cols+j].getColor(this.img.pixels, this.w);
		}
	}
}

function Block(pos, blockDim, imageDim) {
	this.pos = pos.copy();
	this.blockDim = blockDim.copy();
	this.imageDim = imageDim.copy();
	this.end = pos.copy();

	//random cloud of points
	this.a = random(0,1);
	this.b = random(0,1);
	var temp;
	if(this.b< this.a){
		temp = this.b;
		this.b = this.a;
		this.a = temp;
	}
	this.radius = imageDim.y*3;
	this.start = createVector(this.b*this.radius*cos(TWO_PI*this.a/this.b)+this.imageDim.x/2, 
		this.b*this.radius*sin(TWO_PI*this.a/this.b)+this.imageDim.y/2);
	
	this.go = this.start.copy();

	this.col;
	//this.spdX = random (0.5,1.5) * random([-1,1]);
	//this.spdY = random (0.5,1.5) * random([-1,1]);
	//this.spd = createVector(this.spdX,this.spdY);
	this.path = p5.Vector.sub(this.end, this.start);
	this.steps = random(150,350);
	
	this.spd = p5.Vector.div(this.path, this.steps);

}
Block.prototype.checkEnd = function() {
	this.mag = p5.Vector.sub(this.end, this.go).mag();
	//console.log(this.mag);
	if (abs(this.mag) <3){
		this.go = this.end.copy();
		this.spd.set(0,0);
	}
}

Block.prototype.display = function(x, y) {
	fill(this.col);
	noStroke();
	rect(x + this.go.x, y + this.go.y, this.blockDim.x, this.blockDim.y);
}

Block.prototype.getColor = function(pix, txt_width) {

	//var image = get(this.pos.x, this.pos.y, this.dim.x, this.dim.y)
	var w = 4* this.blockDim.x;
	var h = 4* this.blockDim.y;
	var pxs = this.blockDim.x * this.blockDim.y;
	var start = this.pos.y*txt_width*4 + this.pos.x*4;
	var vert = txt_width*4;
	//console.log(start);
	var red = 0;
	var green = 0; 
	var blue = 0; 
	var alpha = 0;
	//console.log(w, h, start);

	for (var i = 0; i<this.blockDim.y; i++ ){
		for (var j = 0; j<w; j+=4 ){
			red += pix[start+vert*i+j];
			green += pix[start+vert*i+j+1];
			blue += pix[start+vert*i+j+2];
			alpha += pix[start+vert*i+j+3];
		}
	}

	red = red/pxs;
	green = green/pxs;
	blue = blue/pxs;
	alpha = alpha/pxs;
	//console.log(red, green, blue, alpha);

	this.col = color(red, green, blue, alpha);
	//console.log(red(this.col));
}


