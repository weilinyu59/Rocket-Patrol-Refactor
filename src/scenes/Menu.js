class Menu extends Phaser.Scene {
  constructor() {
    super('menuScene')
  }

  preload() {
    //load images/title sprites
    this.load.image('rocket', './assets/rocket.png')
    this.load.image('rocket2', './assets/rocket2.png')
    this.load.image('spaceship', './assets/spaceship.png')
    this.load.image('spaceship2', './assets/spaceship2.0.png')
    this.load.image('starfield', './assets/starfield.png')
    this.load.spritesheet('explosion', './assets/explosion.png', {
      frameWidth: 64,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 9
    })
    // load audio
    this.load.audio('sfx-select', './assets/sfx-select.wav')
    this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
    this.load.audio('sfx-shot', './assets/sfx-shot.wav')
  }

  create() {
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
      frameRate: 30
    })

    let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }
    //display menu text
    this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
    menuConfig.backgroundColor = '#00ff00'
    menuConfig.color = '#000'
    this.add.text(game.config.width / 2, game.config.height / 2, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5)
    //define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    // this.scene.start('PlayScene')
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        spaceship2Speed: 4.5,
        gameTimer: 60000,
        numPlayers: -1,
      }
      this.sound.play('sfx-select')
      this.scene.start('SubmenuScene')
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        spaceship2Speed: 6,
        gameTimer: 45000,
        numPlayers: -1,
      }
      this.sound.play('sfx-select')
      this.scene.start('SubmenuScene')
    }
  }
}