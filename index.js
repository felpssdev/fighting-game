const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Gravitional force
const gForce = 0.4

// Create canvas screen
c.fillRect(0, 0, canvas.width, canvas.height)

// Create background image object
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: 'img/background.png'
})

// Creation of player
const player = new Player({
    position: {
        x: 300,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    bodyColor: 'blue',
    offSet: {
        x: 0,
        y: 0
    }
})

// Creation of enemy
const enemy = new Player({
    position: {
        x: 700,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    bodyColor: 'red',
    offSet: {
        x: -50,
        y: 0
    }
})

// Keys object, all keys that I used to make movements
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

// Collision verification for attacks
function detectCollision({ rec1, rec2 }) {
    return (
        rec1.attackHitBox.position.x + rec1.attackHitBox.width >= rec2.position.x && 
        rec1.attackHitBox.position.x <= rec2.position.x + rec2.width && 
        rec1.attackHitBox.position.y + rec1.attackHitBox.height >= rec2.position.y &&
        rec1.attackHitBox.position.y <= rec2.position.y + rec2.height
    )
}

// Players helth bars
const playerHealthBar = document.querySelector('#playerHealthBar')
const enemyHealthBar = document.querySelector('#enemyHealthBar')

// Verify who wins and display
function winner(moment) {
    clearTimeout(moment)
    document.querySelector('#display-result').style.display = 'flex'
    if (parseInt(playerHealthBar.style.width) === parseInt(enemyHealthBar.style.width)) {
        document.querySelector('#display-result').innerHTML = 'Tie'
    } else if (parseInt(playerHealthBar.style.width) > parseInt(enemyHealthBar.style.width)) {
        document.querySelector('#display-result').innerHTML = 'Player Wins!'
    } else if (parseInt(playerHealthBar.style.width) < parseInt(enemyHealthBar.style.width)) {
        document.querySelector('#display-result').innerHTML = 'Enemy Wins!'
    }
}

let timer = 60
let moment

// Timer function that calls winner function
function decreaseTimer() {
    if (timer > 0) {
        moment = setTimeout(decreaseTimer, 1000)
        timer --
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        winner(moment)
    }
}

const startButton = document.querySelector('#start')

// Game start
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
    } else if (keys.d.pressed && player.lastPressedKey === 'd') {
        player.velocity.x = 3
    }

// Enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastPressedKey === 'ArrowLeft') {
        enemy.velocity.x = -3
    } else if (keys.ArrowRight.pressed && enemy.lastPressedKey === 'ArrowRight') {
        enemy.velocity.x = 3
    }

// Detect collision

// Player attacking check
    if (detectCollision({rec1: player, rec2: enemy }) && player.isAttacking) {
        player.isAttacking = false
        const enemyHealthBarWidth = parseInt(enemyHealthBar.style.width) - 10
        enemyHealthBar.style.width = enemyHealthBarWidth + '%'
    }

// Enemy attacking check
    if (detectCollision({rec1: enemy, rec2: player }) && enemy.isAttacking) {
        enemy.isAttacking = false
        const playerHealthBarWidth = parseInt(playerHealthBar.style.width) - 10
        playerHealthBar.style.width = playerHealthBarWidth + '%'
    }

// End the game based on health
   if (parseInt(playerHealthBar.style.width) <= 0 || parseInt(enemyHealthBar.style.width) <= 0) {
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

// Initiate animations
startButton.addEventListener('click', () => {
    animate()
    decreaseTimer()
})

// Render background image
window.onload = () => {
    background.update()
}