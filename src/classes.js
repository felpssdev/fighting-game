class Sprite {
  // Contains every properties of them
  constructor({
    position,
    imageSrc,
    scale = 1,
    totalFrames = 1,
    offSet = { x: 0, y: 0 },
  }) {
    this.position = position
    this.height = 150
    this.width = 50
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.totalFrames = totalFrames
    this.currentFrame = 0
    this.framesElapsed = 0
    this.frameHold = 7 // Animation speed
    this.offSet = offSet
  }

  draw() {
    c.drawImage(
      // Sprite animation
      this.image,
      this.currentFrame * (this.image.width / this.totalFrames),
      0,
      this.image.width / this.totalFrames,
      this.image.height,
      this.position.x - this.offSet.x,
      this.position.y - this.offSet.y,
      (this.image.width / this.totalFrames) * this.scale,
      this.image.height * this.scale
    )
  }

  // Enable Sprite animation
  animateFrames() {
    this.framesElapsed++

    if (this.framesElapsed % this.frameHold === 0) {
      if (this.currentFrame < this.totalFrames - 1) {
        this.currentFrame++
      } else {
        this.currentFrame = 0
      }
    }
  }

  update() {
    this.draw()
    this.animateFrames()
  }
}

class Player extends Sprite {
  // Contains every properties of them
  constructor({
    position,
    velocity,
    bodyColor,
    imageSrc,
    scale = 1,
    totalFrames = 1,
    offSet = { x: 0, y: 0 },
  }) {
    // Inherit Sprite's properties
    super({
      position,
      imageSrc,
      scale,
      totalFrames,
      offSet,
    })

    this.velocity = velocity
    this.height = 150
    this.width = 50
    this.lastPressedKey
    this.bodyColor = bodyColor

    // Atack box!
    this.attackHitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offSet,
      width: 100,
      height: 50,
    }
    this.isAttacking
    this.currentFrame = 0
    this.framesElapsed = 0
    this.frameHold = 9
  }

  // Allow players to respect 'gravity' by always
  // pulling them down if they're not on the page's
  // 'ground' using gForce variable declared ahead, and so, change their position with
  // velocity atribute
  update() {
    this.draw()

    // Enable character animation
    this.animateFrames()

    // Invert enemy's attack
    this.attackHitBox.position.x = this.position.x + this.attackHitBox.offSet.x
    this.attackHitBox.position.y = this.position.y

    // Allow velocity
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // Gravity effect
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
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
