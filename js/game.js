const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let score = 0
let gameFrame = 0
let gameSpeed = 0.1
let gameOver = false
let ammo = 6
 
let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x: canvas.width/8, 
    y: canvas.height/2,
    click: false
}
window.addEventListener('mousemove',event =>{
  mouse.x = event.x - canvasPosition.left 
  mouse.y = event.y - canvasPosition.top 
})
window.addEventListener('mousedown',() => {mouse.click = true})
window.addEventListener('mouseup',() => {mouse.click = false})
window.addEventListener('keyup',ev=> {if (ev.key == ' ') createBullet();})

const BG = {
	x1: 0, x2: canvas.width,x3: 0,x4: canvas.width, y: 0,
	width: canvas.width, height: canvas.height,
	img1: newImage('img/space_1/layer-1.png'),
	img2: newImage('img/space_1/layer-2.png')
}
const player = new Player()
const bulletArray = []
const enemyArray = []

function handleBackGround() {
	BG.x1 -= gameSpeed/3
    BG.x2 -= gameSpeed/3
    if (BG.x1 <= -BG.width) BG.x1 = BG.width
    if (BG.x2 <= -BG.width) BG.x2 = BG.width
	c.drawImage(BG.img1,BG.x1,BG.y,BG.width,BG.height)
	c.drawImage(BG.img1,BG.x2,BG.y,BG.width,BG.height)
	BG.x3 -= gameSpeed/2.95
    BG.x4 -= gameSpeed/2.95
    if (BG.x3 <= -BG.width) BG.x3 = BG.width
    if (BG.x4 <= -BG.width) BG.x4 = BG.width
	c.drawImage(BG.img2,BG.x3,BG.y,BG.width,BG.height)
	c.drawImage(BG.img2,BG.x4,BG.y,BG.width,BG.height)
}

function createBullet() {
	if (ammo <= 0) return
	if (ammo > 0) {
		playAudio('audio/shoot.wav',1)
		bulletArray.push(new Bullet())
		ammo--
		if (ammo < 0) ammo = 0		
	}
}

function handleBullet() { 
	for (let i = 0; i < bulletArray.length; i++) {
		bulletArray[i].update()
		if (bulletArray[i].x > canvas.width + 20) {
        	bulletArray.splice(i,1)
 		}
	}
	if (gameFrame % 70 == 0) ammo++
  	if (ammo > 6) ammo = 6
}

function handleEnemy() {
  if (gameFrame % (110-Math.round(gameSpeed)) == 0) enemyArray.push(new Enemy())
	for (let i = 0; i < enemyArray.length; i++) {
		enemyArray[i].update()
		enemyArray[i].draw()
		if (enemyArray[i].x < 0 - enemyArray[i].radius*1.5) {
			enemyArray.splice(i,1)
			i--
			gameOver = true
			
		}
	}
}  
function handleCollision() {
	for (let i=0;i<bulletArray.length;i++) {
		for (let j=0;j<enemyArray.length;j++) {
			if (collison(bulletArray[i],enemyArray[j])) {
				if (!enemyArray[j].counted) {
					score++
					playAudio('audio/explosion.flac')
					enemyArray[j].counted = true
					enemyArray.splice(j,1) 
					bulletArray.splice(i,1)
					break
       	    	} 	
			}
		}
	}
} 

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  handleBackGround();
  player.update();
  handleEnemy();
  handleBullet();
  handleCollision();
  
  gameFrame++
  gameSpeed+=0.001 
  c.font = '40px Consolas'
  c.fillStyle = 'white';
  c.fillText(`score:${score}`,10,40);
  displayAmmo()
 if (!gameOver) requestAnimationFrame(animate)
 if (gameOver) handleGameOver()
}

function handleGameOver() {
  playAudio('audio/gameover.wav',3)
  c.fillStyle = 'rgba(0,0,0,0.4)'
  c.fillRect(0,0,canvas.width,canvas.height)
  c.fillStyle = 'red'
  c.font = '90px Consolas'
  c.fillText(`GAME OVER`, canvas.width/2.8, canvas.height/2)
  setTimeout(() => {
	window.location.href='index.html'
  }, 2000)  
  const best = JSON.parse(localStorage.getItem('best')) || 0
  if (score > best) localStorage.setItem('best',JSON.stringify(score))
}
function displayAmmo() {
	c.font = '20px Consolas'
	c.fillText('🟡'.repeat(ammo),canvas.width-180,40)
}

window.addEventListener('load',animate)
