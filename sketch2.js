var vsq = [];
var hsq = [];
var spdX = 1;
var spdhX = -1;
var count = 10;
var counth = 9;
var w = 10;

function setup(){
	var myCanvas = createCanvas(200,200);
	myCanvas.position(15,35);
	// x = width/2;
	// y = height/2;
	// spdX = 1.2;
	// spdY = 2.3;

	for (var i = 0; i<count; i++){
		vsq.push(new p5.Vector(0,2*i*w));

	}

	for (var i = 0; i<counth; i++){
		hsq.push(new p5.Vector(width, w + 2*i*w));

	}


	//console.log(pos);
}


function draw(){
	background(144,191,96);
	fill(67,115,19);

	for (var i = 0; i<count; i++){
		rect(vsq[i].x, vsq[i].y, w ,w);
		vsq[i].x += spdX;

		checkCollisions(vsq[i],w);
	}
	for (var i = 0; i<counth; i++){
		rect(hsq[i].x, hsq[i].y, w ,w);
		hsq[i].x += spdhX;

		checkCollisionsh(hsq[i], w);
	}

}

function checkCollisions(pos, w){
	console.log(pos.x);
	if(pos.x > width-w){
		pos.x = width - w;
		spdX *= -1;
	} else if (pos.x < 0){
		pos.x = 0;
		spdX *= -1;
	}

}


function checkCollisionsh(pos, w){
	console.log(pos.x);
	if(pos.x > width-w){
		pos.x = width - w;
		spdhX *= -1;
	} else if (pos.x < 0){
		pos.x = 0;
		spdhX *= -1;
	}

}