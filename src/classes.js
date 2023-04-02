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
    this.frameHold = 5 // Animation speed
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
    sprites,
    attackBox = {
        offSet: {}, width: undefined, height: undefined
    },
    damage,
    name
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
      offSet: attackBox.offSet,
      width: attackBox.width,
      height: attackBox.height,
    }
    this.isAttacking
    this.currentFrame = 0
    this.framesElapsed = 0
    this.frameHold = 12
    this.sprites = sprites
    this.dead = false
    this.maxJumps = 0
    this.damage = damage
    this.name = name

    // Create image for each sprite
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  // Allow players to respect 'gravity' by always
  // pulling them down if they're not on the page's
  // 'ground' using gForce variable declared ahead, and so, change their position with
  // velocity atribute
  update() {
    this.draw()

    // Enable character animation
    if (!this.dead) {
      this.animateFrames()
    }
    // Attack hitboxes
    this.attackHitBox.position.x = this.position.x + this.attackHitBox.offSet.x
    this.attackHitBox.position.y = this.position.y + this.attackHitBox.offSet.y
    
    // Allow velocity
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // Gravity effect
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
      this.velocity.y = 0
      this.maxJumps = 0
    } else {
      this.velocity.y += gForce
    }
  }

  // Atacking method
  attack(enemy) {
    this.switchSprite('attack1')
    this.isAttacking = true

    // Atacking sounds
    const cutSound = document.querySelector('#cut-sound')
    const swordSound = document.querySelector('#cut-sound-enemy')

    if (enemy) {
        if (!swordSound.muted) {
            swordSound.play()
        }
    } else {
        if (!cutSound.muted) {
            cutSound.play()
        }
    }
  }

  // Sprite options
  switchSprite(sprite) {
    // Grants that no other action interrupt death animation
    if (
        this.image === this.sprites.death.image
      ) {
        if (this.currentFrame === this.sprites.death.totalFrames - 2) {
            this.dead = true
        }
        return
      }

    // Grants that no other action interrupt attack animation
    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrame < this.sprites.attack1.totalFrames - 1
    ) {
      return
    }

    // Grants that no other action interrupt take damage animation
    if (
        this.image === this.sprites.takeDamage.image &&
        this.currentFrame < this.sprites.takeDamage.totalFrames - 1
      ) {
        return
      }

    switch (sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image
          this.totalFrames = this.sprites.idle.totalFrames
          this.currentFrame = 0
        }
        break
      case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image
          this.totalFrames = this.sprites.jump.totalFrames
          this.currentFrame = 0
        }
        break
      case 'run':
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image
          this.totalFrames = this.sprites.run.totalFrames
          this.currentFrame = 0
        }
        break
      case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image
          this.totalFrames = this.sprites.fall.totalFrames
          this.currentFrame = 0
        }
        break
      case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image
          this.totalFrames = this.sprites.attack1.totalFrames
          this.currentFrame = 0
        }
        break
      case 'takeDamage':
        if (this.image !== this.sprites.takeDamage.image) {
          this.image = this.sprites.takeDamage.image
          this.totalFrames = this.sprites.takeDamage.totalFrames
          this.currentFrame = 0
        }
        break
      case 'death':
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image
          this.totalFrames = this.sprites.death.totalFrames
          this.currentFrame = 0
        }
        break
    }
  }
}
