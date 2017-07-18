
//constants
var w = 10;
var count_max = 11;
var speed = 3;

//arrays
var cols = [];
var spds = new Array(2*count_max-1);

//working variables
var y_top;
var x_pos;
var reset = 0;



function setup(){
	var myCanvas = createCanvas(210,210);
	myCanvas.position(30,20);

	for (var i = 0; i<count_max; i++){
		//counts.push(i+1);
		cols.push(new Array(i+1));
		y_top = (count_max - (i+1)) * w;
		x_pos = w*(i);
		spds[i] = speed - speed*((i+1)/count_max);
		for (var j = 0; j<i+1; j++){


			cols[i][j] = new p5.Vector(x_pos, y_top + 2*j*w);
		}
	}


	for (var i = count_max-1; i>0; i--){
		//counts.push(i);
		cols.push( new Array(i));
		y_top = (count_max - i) * w;
		x_pos = w*count_max + (count_max - i - 1)*w;
		spds[2*count_max - i-1] = -(speed - speed*((i)/count_max));
		for (var j = 0; j<i; j++){
			cols[2*count_max - i-1][j] = new p5.Vector(x_pos, y_top + 2*j*w);
		}
	}

	cols_start = new Array(2*count_max-1);
	for (var i = 0; i< cols.length; i++){
		cols_start[i] = cols[i].slice();
	}


	console.log(cols.length);
}


function draw(){
	background(144,191,96);
	fill(67,115,19);


    for (var i = 0; i<count_max; i++){
		for (var j = 0; j<i+1; j++){

			var last = i;
			rect(cols[i][j].x, cols[i][j].y, w, w);
			cols[i][j].x += spds[i];

			checkCollisions(cols[i][j],w, i, last);
		}
	}

	for (var i = count_max-1; i>0; i--){
		for (var j = 0; j<i; j++){
			var last = i-1;
			rect(cols[2*count_max - i-1][j].x, cols[2*count_max - i-1][j].y, w, w);
			cols[2*count_max - i-1][j].x += spds[2*count_max - i-1];
			checkCollisions_b(cols[2*count_max - i-1][j],w, i, last);
		}
	}
}

function checkCollisions(pos, w, i , j){
	if(pos.x > width-w){
		pos.x = 2*width - 2*w - pos.x;
		spds[i] *= -1;

	} else if ((pos.x < 0) && (i==0) && (reset != 0)){
		console.log(reset);
		reset++;
		reset = reset % 5;
		pos.x = Math.abs(pos.x);
		spds[i] *= -1;
	} else if ((pos.x < 0) && (i==0) && (reset == 0)){
		console.log(reset);
		reset++;
		for (var i = 0; i< cols.length; i++){
				console.log(cols[i]);
				cols[i] = cols_start[i].slice();
				console.log(cols[i]);
		}
		spds[i] *= -1;

    } else if ((pos.x < 0) && (i>0) ){
		pos.x = Math.abs(pos.x);
		spds[i] *= -1;
    }
}


function checkCollisions_b(pos, w, i , j){
	if(pos.x > width-w){
		pos.x = 2*width - 2*w - pos.x;
		spds[2*count_max - i-1] *= -1;
	} else if (pos.x < 0){
		pos.x = Math.abs(pos.x);
		spds[2*count_max - i-1] *= -1;	

		
	}

}
