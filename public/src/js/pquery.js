var instances = [];
var socket;

var sketch = function(p){

	var canvas;
	// var clients = [];
	var marbles = [];

	socket = io.connect();

	p.setup = function(){
		socket.on('mouse_was_clicked', function(d){
			console.log("client-side mouse_was_clicked received");
			p.createMarble(d.x,d.y);
		})

		this.canvas = p.createCanvas(p.windowWidth, p.windowHeight);
		this.canvas.parent('view');
		this.canvas.position(0,0);
	}
	
	p.draw = function(){
		p.background(p.color(255));
		marbles.forEach(function(e,idx){
			// e.display();
			p.fill(255, 0, 0);
			p.ellipse(e.x, e.y, e.w, e.w);
		});
	}

	p.mouseClicked = function(){
		var data = { x: p.mouseX, y: p.mouseY };
		socket.emit('mouse_was_clicked', data);

		// We can comment this back in and just use normal socket.emit server side
		// p.createMarble(data);
	}

	p.createMarble = function(x,y){
		var tmp = new Marble(x,y);
		marbles.push(tmp);
		console.log("Pushed marble client side");
	}

	class Marble {
		constructor(x,y){
			this.x = x;
			this.y = y;
			this.w = 100;
		}

		display(){
			p.noStroke();
			p.fill(255, 0, 0);
			p.ellipse(this.x, this.y, this.w, this.w);
		}
	}

}


var gamewindow = new p5(sketch);