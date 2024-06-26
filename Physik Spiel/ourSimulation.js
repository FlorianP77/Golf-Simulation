function buildWorld() {
	
	world = new World({
		hUnits: 10,
		coords: {step: 4},
		unit: "m",
		minUnits: {x: 0, y:0},
		img: "img/Stadion.jpg",
		fontColor: "#ffffff"
	});
	basel = new Actor({img: "img/Basel.png", x: 1675, y: 5, hUnits: 2});
	fan = new Actor({img: "img/Fan.png", x: 1, y: 5.2, wUnits: 2});
	fussball = new Actor({img: "img/Fussball.png", x: 1.2, y: 4.2, wUnits: 0.3});
	explosion = new Actor({img: "img/Explosion.png", x: -100 , y: -100, wUnits: 1});
	exploded=false
	size=1
}

function setup() {
	basel.x=16.75;
	basel.y=5;
	fussball.x=1.2;
	fussball.y=4.2;
	explosion.x=-100;
	explosion.y=-100;
	explosion.resize(1/(1.01**size))
	size=1
	t = 0;
	dt = 0.016;  
	fussball.vx = 0;
	fussball.vy = 0; 
	basel.vy = 5;
	tim=0
	isFlying = false
	finished = false
}


window.addEventListener("keydown", tastedown);
window.addEventListener("keyup", tasteup);

function tastedown(event) {
	if (event.key==' '){
		tim+=1
	}
	if (event.key=='r'){
		finished = true
		exploded=false
		setup()
	}
} 

function tasteup(event) {
	if (event.key==' '){
		fussball.vx=tim*1.03
		fussball.vy=tim*0.5
		isFlying = true
	}
}

function distance(obj1, obj2) {
	dx = obj1.x - obj2.x
	dy = obj1.y - obj2.y
	return (dx**2 + dy**2)**0.5
}

function loop() {
	if(finished) return

	basel.y += basel.vy*dt
	if (basel.y>9 || basel.y<0.5){
		basel.vy=-basel.vy
	}
	if(isFlying) {
		fussball.vy = fussball.vy  - 9.81*dt 
	}
	fussball.x += fussball.vx * dt
	fussball.y += fussball.vy * dt
	if (distance(fussball, basel)<1) {
		explosion.x=basel.x
		explosion.y=basel.y
		basel.x=100
		basel.y=100
		exploded=true
	}
	if(exploded) {
		explosion.resize(1.01)
		size+=1
	}
	world.update();
}
