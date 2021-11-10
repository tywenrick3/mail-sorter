let mode;
let messages = [];
let mailblocks = [];
let input;
let button;
let selected;

class Mail {
	constructor(x, y, w = 50, h = 25, color = 'red') {
		this.dragging = false; // Is the object being dragged?
		this.rollover = false; // Is the mouse over the ellipse?
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.offsetX = 0;
		this.offsetY = 0;
		this.color = color;
		this.id = floor(random(0, 2));
	}

	over() {
		// Is mouse over object
		if (
			mouseX > this.x &&
			mouseX < this.x + this.w &&
			mouseY > this.y &&
			mouseY < this.y + this.h
		) {
			this.rollover = true;
		} else {
			this.rollover = false;
		}
	}

	update() {
		if (this.dragging) {
			this.x = mouseX + this.offsetX;
			this.y = mouseY + this.offsetY;
		}
	}

	show() {
		stroke(0);
		// Different fill based on state
		if (this.id != 1) {
			this.color = 'pink';
		} else {
			this.color = 'purple';
		}
		fill(this.color);
		rect(this.x, this.y, this.w, this.h);
	}

	pressed() {
		if (
			mouseX > this.x &&
			mouseX < this.x + this.w &&
			mouseY > this.y &&
			mouseY < this.y + this.h
		) {
			this.dragging = true;
			this.offsetX = this.x - mouseX;
			this.offsetY = this.y - mouseY;
		}
	}

	released() {
		this.dragging = false;
	}
}

//^^^^^Objects^^^^^

function setup() {
	createCanvas(800, 600);
	reset();
}

function draw() {
	if (mode == 0) {
		//startscreen
		start();
	}
	if (mode == 1) {
		//main
		main();
	}
}

function start() {
	background(222);
	textAlign(CENTER);
	fill('blue');
	textSize(72);
	textFont('adage-script-jf, sans-serif');
	text('mail', width / 2, height / 2);
	textFont('input-serif, serif');
	textSize(20);
	text('Press Enter to get sorting', width / 2, height / 2 + 250);
}

function main() {
	noStroke();
	textStyle(NORMAL);
	background('white');
	fill('blue');
	textFont('adage-script-jf, sans-serif');
	textSize(18);
	text('press esc to reset', width / 2, height / 2 + 280);
	textSize(20);
	//bins
	fill('pink');
	rect(10, height - 60, 100, 50);
	fill('white');
	text('New York', 60, height - 30);
	fill('purple');
	rect(width - 110, height - 60, 100, 50);
	fill('white');
	text('California', width - 60, height - 30);

	for (let i = 0; i < mailblocks.length; i++) {
		mailblocks[i].over();
		mailblocks[i].update();
		mailblocks[i].show();
	}
	if (mailblocks.length == 0) {
		rectMode(CENTER);
		fill('blue');
		rect(width / 2, height / 2, 200, 100);
		fill('white');
		text('Sorting Master!', width / 2, height / 2 + 10);
	}
}

function mousePressed() {
	for (let i = 0; i < mailblocks.length; i++) {
		selected = i;
		mailblocks[i].pressed();
	}
}

function mouseReleased() {
	for (let i = 0; i < mailblocks.length; i++) {
		mailblocks[i].released();
		if (mailblocks[i].y > height - 50) {
			mailblocks.splice(i, 1);
		}
	}
}

function keyPressed() {
	if (keyCode == 13 && mode == 0) {
		mode = 1;
	}
	if (keyCode == 27 && mode == 1) {
		reset();
	}
}

function reset() {
	while (mailblocks.length != 0) {
		mailblocks.pop();
	}
	mode = 0;
	background('black');
	const mailnum = floor(random(50, 100));
	for (let i = 0; i < mailnum; i++) {
		mailblocks.push(
			new Mail(
				floor(random(50, width - 50)),
				floor(random(50, height - 100))
			)
		);
	}
}
