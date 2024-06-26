function buildWorld() {
	
	world = new World({
		hUnits: 10,
		coords: {step: 4},
		unit: "m",
		minUnits: {x: 0, y:0},
		img: "img/Himmel.jpg",
		fontColor: "#ffffff"
	});

	console.log("i")
	
	golfschläger = new Actor({img: "img/Golfschläger.png", x: 1, y:1, wUnits:1});
	golfball = new Actor({img: "img/Golfball.png", x: 1, y: 1, wUnits: 1});
	
}

function setup() {
	size = 1
	t = 0;
	dt = 0.016;  
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
	
	if(isFlying) {
		fussball.vy = fussball.vy  - 9.81*dt 
	}
	
	fussball.x += fussball.vx * dt
	fussball.y += fussball.vy * dt
	world.update();
}
