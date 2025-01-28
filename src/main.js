//Name : Weilin Yu
//Modification's Title : Rocket Patrol II : Double Down
//Approximate # of hours to complete : 9 hours
//    Chosen Mods : 
//Implement the 'FIRE' UI text from the original game (1) 
//Allow the player to control the Rocket after it's fired (1)
//Display the time remaining (in seconds) on the screen (3)
//Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//Implement an alternating two-player mode (5)
//Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
//Citation: ChatGPT ganerated (this.timerEvent, updateTimer() ) I made some changes on updatedTimer() based on my own code


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play , submenu]
}

let game = new Phaser.Game(config)

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3


//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyA, keyD, keyW, keyB

