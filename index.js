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
let player = new Player(kaito)

// Create enemy
let enemy = new Player(kenji)

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
  // Remove pre-game content at the start of the game
  startButton.style.display = 'none'
  document.querySelector('#title').style.display = 'none'

  // Display game elements at the start of the game
  const names = document.querySelectorAll('.char-name')
  names.forEach((name) => {
    names[0].innerHTML = player.name
    names[1].innerHTML = enemy.name
    name.style.display = 'inline'
  })

  document.querySelector('#health-bars').style.display = 'flex'

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
    player.velocity.x = -player.speed
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastPressedKey === 'd') {
    player.velocity.x = player.speed
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
    enemy.velocity.x = -enemy.speed
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastPressedKey === 'ArrowRight') {
    enemy.velocity.x = enemy.speed
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
  if (
    detectCollision({ rec1: player, rec2: enemy }) &&
    player.isAttacking &&
    player.currentFrame === player.sprites.attack1.totalFrames - 2
  ) {
    player.isAttacking = false

    if (parseInt(enemyHealthBar.style.width) <= player.damage) {
      enemy.switchSprite('death')
    }

    enemy.switchSprite('takeDamage')
    if (parseInt(enemyHealthBar.style.width) < player.damage) {
      const enemyHealthBarWidth =
        parseInt(enemyHealthBar.style.width) -
        parseInt(enemyHealthBar.style.width)
      enemyHealthBar.style.width = enemyHealthBarWidth + '%'
      enemy.switchSprite('death')
    } else {
      const enemyHealthBarWidth =
        parseInt(enemyHealthBar.style.width) - player.damage // Player 1 damage
      enemyHealthBar.style.width = enemyHealthBarWidth + '%'
    }
  }

  // Player miss attack
  if (
    player.isAttacking &&
    player.currentFrame === player.sprites.attack1.totalFrames - 2
  ) {
    player.isAttacking = false
  }

  // Enemy attacking check and damage
  if (
    detectCollision({ rec1: enemy, rec2: player }) &&
    enemy.isAttacking &&
    enemy.currentFrame === enemy.sprites.attack1.totalFrames - 2
  ) {
    enemy.isAttacking = false

    if (parseInt(playerHealthBar.style.width) <= enemy.damage) {
      player.switchSprite('death')
    }

    player.switchSprite('takeDamage')
    if (parseInt(playerHealthBar.style.width) < enemy.damage) {
      const playerHealthBarWidth =
        parseInt(playerHealthBar.style.width) -
        parseInt(playerHealthBar.style.width)
      playerHealthBar.style.width = playerHealthBarWidth + '%'
      player.switchSprite('death')
    } else {
      const playerHealthBarWidth =
        parseInt(playerHealthBar.style.width) - enemy.damage // Player 2 damage
      playerHealthBar.style.width = playerHealthBarWidth + '%'
    }
  }

  // Enemy miss attack
  if (
    enemy.isAttacking &&
    enemy.currentFrame === enemy.sprites.attack1.totalFrames - 2
  ) {
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
  // Player keys event
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastPressedKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastPressedKey = 'a'
        break
      case 'w':
        if (player.maxJumps != 2) {
          player.maxJumps++
          player.velocity.y = -10
        }
        break
      case ' ':
        if (player.image != player.sprites.attack1.image) {
          player.attack()
        }
        break
    }
  }
  // Enemy keys event
  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastPressedKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastPressedKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        if (enemy.maxJumps != 2) {
          enemy.maxJumps++
          enemy.velocity.y = -10
        }
        break
      case 'ArrowDown':
        if (enemy.image != enemy.sprites.attack1.image) {
          enemy.attack(true)
        }
        break
    }
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
const menu = document.querySelector('#display-menu')

// Initiate animations
startButton.addEventListener('click', () => {
  mainMenu.style.display = 'none'
  animate()
  decreaseTimer()
})

// Render background image
window.onload = () => {
  background.update()

  // Sound
  switchBtn.addEventListener('change', function () {
    const cutSound = document.querySelector('#cut-sound')
    const swordSound = document.querySelector('#cut-sound-enemy')
    if (this.checked) {
      audio.play()
      swordSound.muted = false
      cutSound.muted = false
    } else {
      audio.pause()
      swordSound.muted = true
      cutSound.muted = true
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

  // In-game reset button
  const ingameReset = document.querySelector('#stop')
  ingameReset.addEventListener('click', () => {
    window.location.reload()
  })
}

// Display main menu
const howToPlayBtn = document.querySelector('#menu-btn')
const menuHowToPlay = document.querySelector('#display-menu')
const selectPlayerMenu = document.querySelector('#select-player')
const mainMenu = document.querySelector('#main-menu')
const selectBtn = document.querySelector('#select-btn')

// Menu How to Play button
howToPlayBtn.addEventListener('click', () => {
  mainMenu.style.display = 'none'
  menuHowToPlay.style.display = 'block'
})

// How to Play 'ok' button
const okBtn = document.querySelector('#ok')
okBtn.addEventListener('click', () => {
  mainMenu.style.display = 'block'
  menuHowToPlay.style.display = 'none'
  document.querySelector('#select-player').style.display = 'none'
  startButton.style.display = 'inline'
})

const playerOptions = document.querySelector('#players-options')
const enemyOptions = document.querySelector('#enemies-options')

// Select fighter button
selectBtn.addEventListener('click', () => {
  mainMenu.style.display = 'none'
  selectPlayerMenu.style.display = 'flex'
  playerOptions.style.display = 'block'
  enemyOptions.style.display = 'none'
})

// Select fighter
const playerNames = document.querySelectorAll('.player-name')
playerNames.forEach((playerName) => {
  playerName.addEventListener('click', (event) => {
    switch (event.target.innerHTML) {
      case 'Samurai Kaito':
        startButton.style.display = 'inline'
        playerOptions.style.display = 'none'
        enemyOptions.style.display = 'block'
        document.querySelector('#title').style.display = 'inline'
        player = createPlayer(kaito)
        break
      case 'Kenji':
        startButton.style.display = 'inline'
        mainMenu.style.display = 'block'
        document.querySelector('#title').style.display = 'inline'
        document.querySelector('#select-player').style.display = 'none'
        enemy = createPlayer(kenji)
        break
      case 'Sir Arthur':
        startButton.style.display = 'inline'
        playerOptions.style.display = 'none'
        enemyOptions.style.display = 'block'
        document.querySelector('#title').style.display = 'inline'
        player = createPlayer(arthur)
        break
      case 'Oriel Warwicke':
        startButton.style.display = 'inline'
        mainMenu.style.display = 'block'
        document.querySelector('#title').style.display = 'inline'
        document.querySelector('#select-player').style.display = 'none'
        enemy = createPlayer(oriel)
        break
      case 'Gunvald':
        startButton.style.display = 'inline'
        playerOptions.style.display = 'none'
        enemyOptions.style.display = 'block'
        document.querySelector('#title').style.display = 'inline'
        player = createPlayer(gunvald)
        break
      case 'Ruairidh Doylei':
        startButton.style.display = 'inline'
        mainMenu.style.display = 'block'
        document.querySelector('#title').style.display = 'inline'
        document.querySelector('#select-player').style.display = 'none'
        enemy = createPlayer(ruairidh)
        break
    }
  })
})

// Fighters info menu
const fightersInfoBtn = document.querySelector('#fighters-info-btn')
fightersInfoBtn.addEventListener('click', () => {
  mainMenu.style.display = 'none'
  document.querySelector('#fighters-info').style.display = 'flex'
  document.querySelector('#title').style.display = 'none'

  const okFightersInfoBtn = document.querySelector('#ok-info-btn')
  okFightersInfoBtn.addEventListener('click', () => {
    mainMenu.style.display = 'block'
    document.querySelector('#fighters-info').style.display = 'none'
    document.querySelector('#title').style.display = 'inline'
  })
})
