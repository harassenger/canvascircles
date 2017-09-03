var canvas = document.getElementById("mainCanvas");
var c = canvas.getContext("2d");


var winH = window.innerWidth / 2;
var winW = window.innerWidth / 2;

function canvasResize() {
	if(window.innerWidth / 2 >= 400) {
		winW = 400;
		winH = 400;
	} else {
		winW = window.innerWidth / 2;
		winH = window.innerWidth / 2;
	}
};

canvasResize();


canvas.height = winH;
canvas.width = winW;


// c.beginPath();
// c.arc(100, 100, 50, 0, 2*Math.PI);
// c.stroke();

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var maxRadius = 50;

var mouse = {
	x: undefined,
	y: undefined
}

canvas.addEventListener('mousemove', function(event) {
	mouse.x = event.x - canvas.offsetLeft;
	mouse.y = event.y - canvas.offsetTop;
	// console.log(mouse);
});

canvas.addEventListener('mouseleave', function() {
	mouse.x = undefined
	mouse.y = undefined
});

window.addEventListener('resize', function() {
	location.reload();
});

function Circle(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = color;

	this.draw = function() {
		// console.log('circle');

		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		c.strokeStyle = this.color;
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {	
		if(this.x + this.radius > winW || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if(this.y + this.radius > winH - 50 || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x+=this.dx;
		this.y+=this.dy;

		// Interactivity
		if (mouse.x - this.x <  maxRadius && mouse.x - this.x > - maxRadius && mouse.y - this.y <  maxRadius && mouse.y - this.y > - maxRadius) {
			if(this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.draw();
	}
}


var circleArray = [];

for(var i=0; i<300; i++) {
	var radius = (Math.random() * 6) + 1;
	var x = Math.random() * (winW - radius * 2) + radius;
	var y = Math.random() * (winH - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 4;
	var dy = (Math.random() - 0.5) * 4;

	circleArray.push(new Circle(x, y, dx, dy, radius, getRandomColor()));
}

// console.log(radius);

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, winW, winH);

	for(var i=0; i<circleArray.length; i++) {
		circleArray[i].update();
	}

}

//Calling
animate();
























