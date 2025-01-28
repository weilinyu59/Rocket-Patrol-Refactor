class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        //add object to existing scene
        scene.add.existing(this) //add to exising, displaylist, updatelist
        this.scene = scene
        this.isFiring = false   //to keep track of rocket's firing status
        this.moveSpeed = 2   //rocket speed in pixel/frame
        this.sfxShot = scene.sound.add('sfx-shot')

    }

    update() {
        //left/right movement
        if (!this.isFiring) {
            if (keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }
        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }
        //if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
            if (keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }
        }

        //reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
            this.scene.remainingTime -= 3
        }
    }

    //reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}