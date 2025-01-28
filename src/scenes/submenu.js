class submenu extends Phaser.Scene {
    constructor() {
        super('SubmenuScene')
    }

    create() {

        let submenuConfig = {
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

        this.add.text(game.config.width / 2, game.config.height / 2 - (borderUISize + borderPadding) * 2, 'P1 - Use <--> to move & (UP) to fire', submenuConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 - (borderUISize + borderPadding), 'P2 - Use A D to move & (W) to fire', submenuConfig).setOrigin(0.5)

        submenuConfig.backgroundColor = '#00fd88'
        submenuConfig.color = '#000'

        this.add.text(game.config.width / 2, game.config.height / 2, 'Press A for 2 players D for 1 player', submenuConfig).setOrigin(0.5)

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            game.settings.numPlayers = 2
            this.sound.play('sfx-select')
            this.scene.start('PlayScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            game.settings.numPlayers = 1
            this.sound.play('sfx-select')
            this.scene.start('PlayScene')
        }
    }

}