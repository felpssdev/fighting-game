class Player {

// Contains every properties of them
    constructor({ position, velocity, bodyColor, offSet }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastPressedKey
        this.bodyColor = bodyColor

// Atack box!
        this.attackHitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offSet,
            width: 100,
            height: 50
        }
        this.isAttacking
    }

// 'Draw' players body
    draw() {
        c.fillStyle = this.bodyColor
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

// 'Drawing' attack box
        if(this.isAttacking) {
            c.fillStyle = 'yellow'
            c.fillRect(this.attackHitBox.position.x, 
            this.attackHitBox.position.y, 
            this.attackHitBox.width, 
            this.attackHitBox.height)
        }
    }

// Allow players to respect 'gravity' by always
// pulling them down if they're not on the page's
// 'ground' using gForce variable declared ahead, and so, change their position with
// velocity atribute
    update() {
        this.draw()

// Invert enemy's attack
        this.attackHitBox.position.x = this.position.x + this.attackHitBox.offSet.x
        this.attackHitBox.position.y = this.position.y

// Allow velocity
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

// Gravity effect
        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gForce
        }
    }

// Atacking method
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 300)
    }
}

class Sprite {
// Contains every properties of them
    constructor({ position, imageSrc }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
       c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}





