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
	x: 3,
	y: 19,
	hUnits: 20
});

let fahne = new Actor({
	img: "img/Fahne.png",
	x: 140,
	y: 18,
	hUnits: 20
});

let ground = new Actor({
	img: "img/Boden.jpg",
	x: 50,
	y: 5,
	hUnits: 10,
	wUnits: 200
})



let golfball = new Actor({
	img: "img/Golfball.png",
	x: 10,
	y: 10,
	wUnits: 2
});


let animation = new Actor({
	img: "img/Hole in One.png",
	x: 200,
	y: 200,
	hUnits: 50,
	wUnits: 70,
})

let vector = new Actor({
	img: "img/Vector.png",
	x: 10,
	y: 10,
	hUnits: 10,
	autorotate: false
	
})

vector.setAnchor({x: 0, y: 0.5})


let gravitation = 9.81
let k = 0.5 * 0.45 * 1.2 * 0.00145
let groundResistance = 0.7
let rollResistance = 0.9

let v = 0
let airResistance = 0

let massGolfball = 0.043
let speedX = 1
let speedY = 0.5

let tim = 0
let isFlying = false
let finished = false

let startet = false

function reset() {
	location.reload()
}

window.addEventListener("keydown", tastedown);
window.addEventListener("keyup", tasteup);

function tastedown(event) {
	if (!isFlying){
		if (event.key==' '){
			tim += 1
			startet = true
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
			golfball.vx = tim * speedX * Math.cos(vector.rotation)
			golfball.vy = tim * speedY * Math.sin(vector.rotation)
			isFlying = true
		}
	}
}

function vectorRotation(){
	vector.rotation += 0.1
	console.log(vector.rotation)
}

function groundCalculation(){
	golfball.vy *= -1
	golfball.vy *= groundResistance
	golfball.vx *= rollResistance
}



function checkGround(){
	if(golfball.y < 10){
		golfball.y = 10
		groundCalculation()
	}
}

function checkHole() {
	if(golfball.x < (fahne.x -4) && golfball.x > (fahne.x -5)){
		if(golfball.y <= 10.5){
			
			//if golfball.vx > 10{
			//}
			return true
		}
	}
	return false
}


function stopbounce(){
	if(golfball.vy > -2 && golfball.vy < 0 && golfball.y < 10.5 ){
		golfball.vy = 0
	}
}

let shadows = []

function loop(dt) {
	if(isFlying) {
		golfball.vy -= gravitation*dt 
		shadows.push(new Actor({
			img: "img/Linie.png",
			x: golfball.x,
			y: golfball.y,
			opacity: 0.2,
			wUnits: 1
		}));
		
		v = (golfball.vx**2 + golfball.vy**2)**0.5
		airResistance = k * v**2
		golfball.vx -= airResistance * golfball.vx / v / massGolfball * dt
		golfball.vy -= airResistance * golfball.vy / v / massGolfball * dt
		console.log(golfball.vx)
		checkGround()
		golfball.x += golfball.vx * dt
		golfball.y += golfball.vy * dt
		stopbounce()
		if(checkHole()){
			golfball.vx = 0
			golfball.vy = -5
			animation.y = 50
			animation.x = 70
			if(golfball.y <= -10){
				golfball.y = -10
				golfball.vy = 0
			}
		}
	}

	else {
		if (!startet){
			vectorRotation()
		}
	}

	world.render()

}

world.addTicker(loop)