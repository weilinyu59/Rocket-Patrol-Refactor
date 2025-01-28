class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene')
    }

    create() {
        //place tile sprite
        console.log(game.settings.numPlayers)
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        //Green UI Background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        // add rocket (p1 & p2)

        if(game.settings.numPlayers === 1) {
            this.p1Rocket = new Rocket(this, game.config.width / 1.5, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        } else {
            this.p2Rocket = new Rocket2(this, game.config.width / 4, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0)
            this.p1Rocket = new Rocket(this, game.config.width / 1.5, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        }
    
        //add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0)
        this.ship04 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship2', 0, 50).setOrigin(0, 0)
        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
        //initialize score
        this.p1Score = 0
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)
        // GAME OVER flag
        this.gameOver = false

        //display the timer on the screen
        this.remainingTime = game.settings.gameTimer / 1000
        this.timerText = this.add.text(game.config.width / 2, (borderUISize + borderPadding)*1.5, `Time: ${this.remainingTime}`, {
            fontSize: '28px',
            color: '#843605',
        }).setOrigin(0, 0)

        //time event that counts down every second
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true,
        })

    }

    updateTimer() {
        //Decrease the timer every second

        this.remainingTime -- 

        //Update the timer text
        this.timerText.setText(`Time: ${this.remainingTime}`)

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        scoreConfig.fixedWidth = 0

        if(this.remainingTime <= 0) {
            this.timerEvent.remove()
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or (B) for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true;
        }
        
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyB)) {
            this.scene.start("menuScene")
        }


        this.starfield.tilePositionX -= 4
        this.ship04.movespeed = game.settings.spaceship2Speed

        if (game.settings.numPlayers === 1) {

            if (!this.gameOver){
                this.p1Rocket.update()

                this.ship01.update()
                this.ship02.update()
                this.ship03.update()
                this.ship04.update()
            }


            if (this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset()
                this.shipExplode(this.ship03)
            }
            if (this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset()
                this.shipExplode(this.ship02)
            }
            if (this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset()
                this.shipExplode(this.ship01)
            }
            if (this.checkCollision(this.p1Rocket, this.ship04)) {
                this.p1Rocket.reset()
                this.shipExplode(this.ship04)
            }

            if(this.p1Rocket.y <= borderUISize * 3 + borderPadding) {
                this.remainingTime -= 2
            }

        }

        if (game.settings.numPlayers === 2) {

            if (!this.gameOver) {
            
                this.p1Rocket.update()
                this.p2Rocket.update()  
                                              // update rocket sprite
                this.ship01.update()           // update spaceships (x3)
                this.ship02.update()
                this.ship03.update()
                this.ship04.update()
            }

            if (this.checkCollision(this.p1Rocket, this.ship03)) {
                this.p1Rocket.reset()
                this.shipExplode(this.ship03)
            }
            if (this.checkCollision(this.p1Rocket, this.ship02)) {
                this.p1Rocket.reset()
                this.shipExplode(this.ship02)
            }
            if (this.checkCollision(this.p1Rocket, this.ship01)) {
                this.p1Rocket.reset()
                this.shipExplode(this.ship01)
            }
            if (this.checkCollision(this.p1Rocket, this.ship04)) {
                this.p1Rocket.reset()
                this.shipExplode(this.ship04)
            }
    
            if (this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset()
                this.shipExplode(this.ship03)
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset()
                this.shipExplode(this.ship02)
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset()
                this.shipExplode(this.ship01)
            }
            if (this.checkCollision(this.p2Rocket, this.ship04)) {
                this.p2Rocket.reset()
                this.shipExplode(this.ship04)
            }

            if(this.p1Rocket.y <= borderUISize * 3 + borderPadding || this.p2Rocket.y <= borderUISize * 3 + borderPadding) {
                this.remainingTime -= 2
            }
    
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB cheking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false
        }
    }


    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
            ship.reset()                         // reset ship position
            ship.alpha = 1                       // make ship visible again
            boom.destroy()                       // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.remainingTime += 2
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx-explosion')
    }
}