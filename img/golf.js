import {World, Actor} from "https://gymburgdorf.github.io/simhelpers/simhelpers.js"


let world = new World({
	h: 100,
	unit: "m",
	img: "img/Himmel.jpg",
})

world.createAxis({
	minUnits: {x: 0, y:0},
	color: "#fff",
	step: 20
})

let golfschlaeger = new Actor({
	img: "img/Golfschlaeger.png",
	x: 5,
	y: 10,
	hUnits: 20
});

let fahne = new Actor({
	img: "img/Fahne.png",
	x: 120,
	y: 6,
	hUnits: 20
});

//let ground = new Actor({

//})



let golfball = new Actor({
	img: "img/Golfball.png",
	x: 10,
	y: 5,
	wUnits: 2
});

let gravitation = 9.81
let k = 0.5 * 0.45 * 1.2 * 0.00145
let groundResistance = 0.7
let rollResistance = 0.5



let massGolfball = 0.043

let speedX = 1
let speedY = 0.5

let tim = 0
let isFlying = false
let finished = false

let v = 0
let airResistance = 0

function reset() {
	tim=0
	isFlying = false
	finished = false
	
}

window.addEventListener("keydown", tastedown);
window.addEventListener("keyup", tasteup);

function tastedown(event) {
	if (!isFlying){
		if (event.key==' '){
			tim += 1
		}
	}
	
	if (event.key=='r'){
		finished = true
		reset()
	}
} 

function tasteup(event) {
	if (!isFlying){
		if (event.key==' '){
			golfball.vx = tim * speedX
			golfball.vy = tim * speedY
			isFlying = true
		}
	}
}

function distance(obj1, obj2) {
	dx = obj1.x - obj2.x
	dy = obj1.y - obj2.y
	return (dx**2 + dy**2)**0.5
}



function checkGround(vx, vy){
	if(golfball.y < 2){
		golfball.y = 2
		vy *= -1
		vy *= groundResistance
		vx *= rollResistance
	} 
	return vy
}

function checkHole() {
	if(golfball.x < (fahne.x + 5) && golfball.x > (fahne.x - 5)){
		if(golfball.y < (fahne.y + 5) && golfball.y > (fahne.y - 5)){
			return true
		}
	}
	return false	
}

function holeInOne(){
	golfball.vx = 0
	golfball.vy = -5
	if(golfball.y <= -5){
		golfball.y = -5
		golfball.vy = 0
		finished = true
	}
}
	


function loop(dt) {
	if (finished){
		reset()
	}
	if(isFlying) {
		golfball.vy -= gravitation*dt 
		v = (golfball.vx**2 + golfball.vy**2)**0.5
		airResistance = k * v**2
		golfball.vx -= airResistance * golfball.vx / v / massGolfball * dt
		golfball.vy -= airResistance * golfball.vy / v / massGolfball * dt
		golfball.vy = checkGround(golfball.vx, golfball.vy)
		golfball.x += golfball.vx * dt
		golfball.y += golfball.vy * dt
		if(checkHole()){
			holeInOne()
		}
	}

	world.render()

}

world.addTicker(loop)