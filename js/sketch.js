
//var x, y, spdX, spdY;
var count = 200;
var pos = [];
var spd = [];
var radii = [];
var gravity = [];
var friction, damping;

function setup(){
	var myCanvas = createCanvas(200,200);
	myCanvas.position(15,15);
	// x = width/2;
	// y = height/2;
	// spdX = 1.2;
	// spdY = 2.3;

	for (var i = 0; i<count; i++){
		pos.push(new p5.Vector(width/2,0));
		spd.push(new p5.Vector(-2 + Math.random()*4, Math.random()*2));
		radii.push(5+Math.random()*5);
		gravity.push(random(.01,.06));
		friction = 0.875;
		damping = 0.786;
	}
	//console.log(pos);
}


function draw(){
	background(144,191,96);
	fill(67,115,19);

	for (var i = 0; i<count; i++){
		ellipse(pos[i].x, pos[i].y, radii[i]*2 ,radii[i]*2);
		pos[i].x += spd[i].x;
		spd[i].y += gravity[i];
		pos[i].y += spd[i].y;
		checkCollisions(pos[i], spd[i], radii[i])
	}
}

function checkCollisions(pos, spd, rad){
	if(pos.x > width-rad){
		spd.x *= -1;
	} else if (pos.x < rad){
		spd.x *= -1;
	}

	if(pos.y > height-rad){
		pos.y = height-rad;
		spd.y *= -1;
		spd.y *= damping;
		spd.x *= friction;
	} 

}