let timer = 60
let moment

// Timer function that calls winner function
function decreaseTimer() {
  if (timer > 0) {
    moment = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    winner(moment)
  }
}

// Players helth bars
const playerHealthBar = document.querySelector('#playerHealthBar')
const enemyHealthBar = document.querySelector('#enemyHealthBar')

// Verify who wins and display
function winner(moment) {
  clearTimeout(moment)
  document.querySelector('#display-result').style.display = 'flex'
  document.querySelector('#reset-btn').style.display = 'flex'
  if (
    parseInt(playerHealthBar.style.width) ===
    parseInt(enemyHealthBar.style.width)
  ) {
    document.querySelector('#display-result').innerHTML = 'Tie'
  } else if (
    parseInt(playerHealthBar.style.width) > parseInt(enemyHealthBar.style.width)
  ) {
    document.querySelector('#display-result').innerHTML = 'Samurai Mack Wins!'
  } else if (
    parseInt(playerHealthBar.style.width) < parseInt(enemyHealthBar.style.width)
  ) {
    document.querySelector('#display-result').innerHTML = 'Kenji Wins!'
  }
}

// Collision verification for attacks
function detectCollision({ rec1, rec2 }) {
  return (
    rec1.attackHitBox.position.x + rec1.attackHitBox.width >= rec2.position.x &&
    rec1.attackHitBox.position.x <= rec2.position.x + rec2.width &&
    rec1.attackHitBox.position.y + rec1.attackHitBox.height >=
      rec2.position.y &&
    rec1.attackHitBox.position.y <= rec2.position.y + rec2.height
  )
}
