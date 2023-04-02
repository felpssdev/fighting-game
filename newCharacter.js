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
        x: 180,
        y: 80,
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
          x: 60,
          y: 50,
        },
        width: 120,
        height: 50,
      },
      damage: 13,
      name: 'Sir Arthur'
}

const samuraiMack = {
    position: {
      x: 300,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    bodyColor: 'blue',
    imageSrc: './img/samuraiMack/Idle.png',
    totalFrames: 8,
    scale: 2.2,
    offSet: {
      x: 215,
      y: 118,
    },
    sprites: {
      idle: {
        imageSrc: './img/samuraiMack/Idle.png',
        totalFrames: 8,
      },
      run: {
        imageSrc: './img/samuraiMack/Run.png',
        totalFrames: 8,
      },
      jump: {
        imageSrc: './img/samuraiMack/Jump.png',
        totalFrames: 2,
      },
      fall: {
        imageSrc: './img/samuraiMack/Fall.png',
        totalFrames: 2,
      },
      attack1: {
        imageSrc: './img/samuraiMack/Attack1.png',
        totalFrames: 6,
      },
      takeDamage: {
        imageSrc: './img/samuraiMack/Take Hit.png',
        totalFrames: 4,
      },
      death: {
        imageSrc: './img/samuraiMack/Death.png',
        totalFrames: 6,
      },
    },
    attackBox: {
      offSet: {
        x: 90,
        y: 50,
      },
      width: 120,
      height: 50,
    },
    damage: 15,
    name: 'Samurai Mack'
  }

  const kenji = {
    position: {
      x: 700,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    bodyColor: 'red',
    imageSrc: './img/kenji/Idle.png',
    totalFrames: 4,
    scale: 2.2,
    offSet: {
      x: 215,
      y: 130,
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
        y: 50,
      },
      width: 130,
      height: 50,
    },
    damage: 10,
    name: 'Kenji'
  }
  