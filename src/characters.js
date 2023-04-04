// Players

const arthur = {
  position: {
    x: 300,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/Arthur/Idle.png',
  totalFrames: 8,
  scale: 2.2,
  offSet: {
    x: 170,
    y: 100,
  },
  sprites: {
    idle: {
      imageSrc: './img/Arthur/Idle.png',
      totalFrames: 8,
    },
    run: {
      imageSrc: './img/Arthur/Run.png',
      totalFrames: 8,
    },
    jump: {
      imageSrc: './img/Arthur/Jump.png',
      totalFrames: 2,
    },
    fall: {
      imageSrc: './img/Arthur/Fall.png',
      totalFrames: 2,
    },
    attack1: {
      imageSrc: './img/Arthur/Attack1.png',
      totalFrames: 4,
    },
    takeDamage: {
      imageSrc: './img/Arthur/Take Hit.png',
      totalFrames: 4,
    },
    death: {
      imageSrc: './img/Arthur/Death.png',
      totalFrames: 6,
    },
  },
  attackBox: {
    offSet: {
      x: 58,
      y: 50,
    },
    width: 100,
    height: 50,
  },
  height: 130,
  damage: 13,
  name: 'Sir Arthur',
  speed: 2.6,
}

const kaito = {
  position: {
    x: 300,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/kaito/Idle.png',
  totalFrames: 8,
  scale: 2.2,
  offSet: {
    x: 200,
    y: 148,
  },
  sprites: {
    idle: {
      imageSrc: './img/kaito/Idle.png',
      totalFrames: 8,
    },
    run: {
      imageSrc: './img/kaito/Run.png',
      totalFrames: 8,
    },
    jump: {
      imageSrc: './img/kaito/Jump.png',
      totalFrames: 2,
    },
    fall: {
      imageSrc: './img/kaito/Fall.png',
      totalFrames: 2,
    },
    attack1: {
      imageSrc: './img/kaito/Attack1.png',
      totalFrames: 6,
    },
    takeDamage: {
      imageSrc: './img/kaito/Take Hit.png',
      totalFrames: 4,
    },
    death: {
      imageSrc: './img/kaito/Death.png',
      totalFrames: 6,
    },
  },
  attackBox: {
    offSet: {
      x: 90,
      y: 20,
    },
    width: 120,
    height: 50,
  },
  height: 120,
  damage: 14,
  name: 'Samurai Kaito',
  speed: 3,
}

const gunvald = {
  position: {
    x: 300,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/Gunvald/Idle.png',
  totalFrames: 10,
  scale: 3.4,
  offSet: {
    x: 250,
    y: 190,
  },
  sprites: {
    idle: {
      imageSrc: './img/Gunvald/Idle.png',
      totalFrames: 10,
    },
    run: {
      imageSrc: './img/Gunvald/Run.png',
      totalFrames: 8,
    },
    jump: {
      imageSrc: './img/Gunvald/Jump.png',
      totalFrames: 3,
    },
    fall: {
      imageSrc: './img/Gunvald/Fall.png',
      totalFrames: 3,
    },
    attack1: {
      imageSrc: './img/Gunvald/Attack3.png',
      totalFrames: 8,
    },
    takeDamage: {
      imageSrc: './img/Gunvald/Take hit.png',
      totalFrames: 3,
    },
    death: {
      imageSrc: './img/Gunvald/Death.png',
      totalFrames: 7,
    },
  },
  attackBox: {
    offSet: {
      x: 30,
      y: 60,
    },
    width: 170,
    height: 50,
  },
  height: 150,
  damage: 22,
  name: 'Gunvald',
  speed: 2,
}

// Enemies

const kenji = {
  position: {
    x: 700,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/kenji/Idle.png',
  totalFrames: 4,
  scale: 2.2,
  offSet: {
    x: 200,
    y: 160,
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      totalFrames: 4,
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      totalFrames: 8,
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      totalFrames: 2,
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      totalFrames: 2,
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      totalFrames: 4,
    },
    takeDamage: {
      imageSrc: './img/kenji/Take hit.png',
      totalFrames: 3,
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      totalFrames: 7,
    },
  },
  attackBox: {
    offSet: {
      x: -160,
      y: 40,
    },
    width: 130,
    height: 50,
  },
  height: 120,
  damage: 8,
  name: 'Kenji',
  speed: 3.5,
}

const oriel = {
  position: {
    x: 700,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/oriel/Idle.png',
  totalFrames: 11,
  scale: 2.2,
  offSet: {
    x: 170,
    y: 130,
  },
  sprites: {
    idle: {
      imageSrc: './img/oriel/Idle.png',
      totalFrames: 11,
    },
    run: {
      imageSrc: './img/oriel/Run.png',
      totalFrames: 8,
    },
    jump: {
      imageSrc: './img/oriel/Jump.png',
      totalFrames: 3,
    },
    fall: {
      imageSrc: './img/oriel/Fall.png',
      totalFrames: 3,
    },
    attack1: {
      imageSrc: './img/oriel/Attack1.png',
      totalFrames: 7,
    },
    takeDamage: {
      imageSrc: './img/oriel/Take Hit.png',
      totalFrames: 4,
    },
    death: {
      imageSrc: './img/oriel/Death.png',
      totalFrames: 11,
    },
  },
  attackBox: {
    offSet: {
      x: -55,
      y: 25,
    },
    width: 60,
    height: 50,
  },
  height: 110,
  damage: 17,
  name: 'Oriel',
  speed: 3.3
}

const ruairidh = {
  position: {
    x: 700,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/Ruairidh/Idle.png',
  totalFrames: 10,
  scale: 2.2,
  offSet: {
    x: 110,
    y: 72,
  },
  sprites: {
    idle: {
      imageSrc: './img/Ruairidh/Idle.png',
      totalFrames: 10,
    },
    run: {
      imageSrc: './img/Ruairidh/Run.png',
      totalFrames: 8,
    },
    jump: {
      imageSrc: './img/Ruairidh/Going Up.png',
      totalFrames: 3,
    },
    fall: {
      imageSrc: './img/Ruairidh/Going Down.png',
      totalFrames: 3,
    },
    attack1: {
      imageSrc: './img/Ruairidh/Attack1.png',
      totalFrames: 7,
    },
    takeDamage: {
      imageSrc: './img/Ruairidh/Take Hit.png',
      totalFrames: 3,
    },
    death: {
      imageSrc: './img/Ruairidh/Death.png',
      totalFrames: 11,
    },
  },
  attackBox: {
    offSet: {
      x: -105,
      y: 30,
    },
    width: 112,
    height: 50,
  },
  height: 110,
  damage: 10,
  name: 'Ruairidh',
  speed: 4.2
}
