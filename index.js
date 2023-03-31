const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Gravitional force
const gForce = 0.225

// Create game's screen
c.fillRect(0, 0, canvas.width, canvas.height)

// Players model
class Sprite {

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
        }, 100)
    }
}

// Creation of player
const player = new Sprite({
    position: {
        x: 0,
        y: 0
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
const enemy = new Sprite({
    position: {
        x: 400,
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

// Game start
function animate() {

// Animation loop that keep everything running
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
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
    if (detectCollision({ rec1: player, rec2: enemy }) && player.isAttacking) {
        player.isAttacking = false
        console.log('touched');
    }

// Enemy attacking check
    if (detectCollision({ rec1: enemy, rec2: player }) && enemy.isAttacking) {
        enemy.isAttacking = false
        console.log('touched by enemy');
    }
}

// Initiate function
animate()

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
