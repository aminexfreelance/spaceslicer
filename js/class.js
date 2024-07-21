class Player {
    constructor() {
        this.x = 0
        this.y = canvas.height/2
        this.radius = 40
        this.width = 50.1
        this.height = 50.1
		this.img = newImage('img/orange_ship.png')
    }
    update() {
       const dx = this.x - mouse.x 
       const dy = this.y - mouse.y 
	   const d = Math.round(gameSpeed)
       if (mouse.x != this.x) {
          this.x -= dx/(20-d)
       }
       if (mouse.y != this.y) {
          this.y -= dy/(20-d)
       }   
       this.draw()    
    }
    draw() {
      if (mouse.click) {
         c.lineWidth = 1
         c.strokeStyle = 'red'
         c.beginPath()
         c.moveTo(this.x, this.y)
         c.lineTo(canvas.width, this.y)
         c.stroke()
      }
	  c.drawImage(this.img,this.x - 50,this.y - 50,this.width*2,this.height*2)
    }
	reset() {
        this.x = 0
        this.y = canvas.height/2
	}
}

const bimg = newImage('img/round.png')

class Bullet {
	constructor() {
		this.x = player.x + player.radius
		this.y = player.y + player.radius / 15
		this.img = newImage('img/round.png')
		this.radius = 8
		this.speed = 30 + Math.random() * 10
	}
	update() {
		this.x += this.speed
        this.draw()
	}
	draw() {
		c.drawImage(bimg,this.x - 15,this.y - 17,this.radius*4,this.radius*4)
	}
}
class Enemy {
	constructor() {
		this.x = canvas.width*1.3; 
		this.y = Math.random() * (canvas.height-60) + 20;
		this.radius = 35 + Math.random() * 5; 
		this.speed = 5 + Math.random() * 3;
		this.img = Math.random()<=0.5?newImage('img/enemy1.png'):
		newImage('img/enemy2.png');
		this.counted = false;
	}
	update() {
		this.x -= this.speed + gameSpeed;
	}
	draw() {
      	c.drawImage(this.img,this.x - this.radius*1.2,this.y - this.radius*1.36,
      	this.radius*2.8,this.radius*2.8);
	}
}