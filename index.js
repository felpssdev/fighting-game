const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Gravitional force
const gForce = 0.4

// Create canvas screen
c.fillRect(0, 0, canvas.width, canvas.height)

// Create background image
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: 'img/background.png',
})

// Create player
const player = new Player({
  position: {
    x: 300,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  bodyColor: 'blue',
  offSet: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/samuraiMack/Idle.png',
  totalFrames: 8,
  scale: 2.2,
  offSet: {
    x: 215,
    y: 118
  },
  sprites: {
    idle: {
        imageSrc: './img/samuraiMack/Idle.png',
        totalFrames: 8
    },
    run: {
        imageSrc: './img/samuraiMack/Run.png',
        totalFrames: 8
    },
    jump: {
        imageSrc: './img/samuraiMack/Jump.png',
        totalFrames: 2
    },
    fall: {
        imageSrc: './img/samuraiMack/Fall.png',
        totalFrames: 2
    },
    attack1: {
        imageSrc: './img/samuraiMack/Attack1.png',
        totalFrames: 6
    }
  },
  attackBox: {
    offSet: {
        x: 90,
        y: 50
    },
    width: 120,
    height: 50
  }
})

// Create enemy
const enemy = new Player({
  position: {
    x: 700,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  bodyColor: 'red',
  offSet: {
    x: -50,
    y: 0,
  },
  imageSrc: './img/kenji/Idle.png',
  totalFrames: 4,
  scale: 2.2,
  offSet: {
    x: 215,
    y: 130
  },
  sprites: {
    idle: {
        imageSrc: './img/kenji/Idle.png',
        totalFrames: 4
    },
    run: {
        imageSrc: './img/kenji/Run.png',
        totalFrames: 8
    },
    jump: {
        imageSrc: './img/kenji/Jump.png',
        totalFrames: 2
    },
    fall: {
        imageSrc: './img/kenji/Fall.png',
        totalFrames: 2
    },
    attack1: {
        imageSrc: './img/kenji/Attack1.png',
        totalFrames: 4
    }
  },
  attackBox: {
    offSet: {
        x: -160,
        y: 50
    },
    width: 130,
    height: 50
  }
})

// All keys that I used to make movements
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
}

const startButton = document.querySelector('#start')

// Animation loop and game start
function animate() {
  // Remove button at start of the game
  startButton.style.display = 'none'

  // Animation loop that keep everything running
  window.requestAnimationFrame(animate)
  background.update()
  player.update()
  enemy.update()

  // Set players to stop untill an event is listened
  player.velocity.x = 0
  enemy.velocity.x = 0

  // Handle bug that if D was pressed while A is pressed,
  // the character would not listen to that event

  // Player movement
  if (keys.a.pressed && player.lastPressedKey === 'a') {
    player.velocity.x = -3
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastPressedKey === 'd') {
    player.velocity.x = 3
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // Player jump
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastPressedKey === 'ArrowLeft') {
    enemy.velocity.x = -3
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastPressedKey === 'ArrowRight') {
    enemy.velocity.x = 3
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  // Enemy jump
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // Detect collision
  // Player attacking check and damage
  if (detectCollision({ rec1: player, rec2: enemy }) && player.isAttacking && player.currentFrame === 4) {
    player.isAttacking = false
    if (parseInt(enemyHealthBar.style.width) < 13) {
        const enemyHealthBarWidth = parseInt(enemyHealthBar.style.width) - 9 // Bug Mack doesnt kill when enemy's life is bellow 13 health solved
        enemyHealthBar.style.width = enemyHealthBarWidth + '%'
    } else {
        const enemyHealthBarWidth = parseInt(enemyHealthBar.style.width) - 13
        enemyHealthBar.style.width = enemyHealthBarWidth + '%'
    }
  }

  // Player miss attack
  if (player.isAttacking && player.currentFrame === 4) {
    player.isAttacking = false
  }

  // Enemy attacking check and damage
  if (detectCollision({ rec1: enemy, rec2: player }) && enemy.isAttacking && enemy.currentFrame === 2) {
    enemy.isAttacking = false
    const playerHealthBarWidth = parseInt(playerHealthBar.style.width) - 10
    playerHealthBar.style.width = playerHealthBarWidth + '%'
  }

  // Enemy miss attack
  if (enemy.isAttacking && enemy.currentFrame === 2) {
    enemy.isAttacking = false
  }

  // End the game based on health
  if (
    parseInt(playerHealthBar.style.width) <= 0 ||
    parseInt(enemyHealthBar.style.width) <= 0
  ) {
    winner(moment)
  }
}

// Allow players to move on keydown events
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    // Player keys event
    case 'd':
      keys.d.pressed = true
      player.lastPressedKey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      player.lastPressedKey = 'a'
      break
    case 'w':
      player.velocity.y = -10
      break
    case ' ':
      player.attack()
      break

    // Enemy keys event
    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastPressedKey = 'ArrowRight'
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastPressedKey = 'ArrowLeft'
      break
    case 'ArrowUp':
      enemy.velocity.y = -10
      break
    case 'ArrowDown':
      enemy.attack()
      break
  }
})

// Event that allow players to stop the movement
// on keyup event
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    // Player movement keys
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break

    // Enemy movement keys
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})

const switchBtn = document.querySelector('#switch-sound')
const audio = document.querySelector('#music-theme')

// Initiate animations
startButton.addEventListener('click', () => {
  animate()
  decreaseTimer()
})

// Render background image
window.onload = () => {
  background.update()

  // Sound
  switchBtn.addEventListener('change', function () {
    if (this.checked) {
      audio.play()
    } else {
      audio.pause()
    }
  })

  // Prevent checkbox to uncheck when 'space' is pressed
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      event.preventDefault()
    }
  })

  // Replay audio
  audio.addEventListener('ended', function () {
    this.currentTime = 0
    this.play()
  })

  // Reset the game by reloading the page
  const resetBtn = document.querySelector('#reset-btn')
  resetBtn.addEventListener('click', () => {
    window.location.reload()
  })
}
