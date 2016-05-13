// Enemy bugs our player must avoid
var Enemy = function(x, y, speed, width, height) {
    // Variables applied to each of our instances go here
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speed = Math.floor(100 + (Math.random() * 400) + 1); //this alows for the bugs to radomly select a new speed on start.
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 505) { // this alows for bugs to randomly slect a new speed on x value reset
        this.x = this.x + this.speed * dt;
    } else {
        this.x = 0;
        this.speed = Math.floor(100 + (Math.random() * 400) + 1);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The 4 bug objects are created here
var enemy0 = new Enemy(-100, 310);

var enemy1 = new Enemy(-100, 50);

var enemy2 = new Enemy(-100, 225);

var enemy3 = new Enemy(-100, 140);

//The constructor for the star goal for the player is made here
var Star = function() {
    this.x = 200;
    this.y = -5;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/Star.png';

};
//enpty update function for star nessary for engien
Star.prototype.update = function() {

};
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//evocing new star object
var star = new Star();

// Player class constructor  
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.sprite = 'images/char-boy.png';
};
//Used to generate realtime updates on hitting bugs or the goal
Player.prototype.update = function() {
    this.checkCollisons();
    this.checkWin();
};
//Used to conver player input into character action.
Player.prototype.handleInput = function(inputKeys) {
    switch (inputKeys) {
        case 'left':
            if (this.x - 101 < 0) {
                this.x = 0;
            } else {
                this.x -= 101;
            }
            break;

        case 'right':
            if (this.x + 101 >= 404) {
                this.x = 404;
            } else {
                this.x += 101;
            }
            break;

        case 'up':
            if (this.y - 85 < 0) {
                this.y = -15;
            } else {
                this.y -= 85;
            }

            break;

        case 'down':
            if (this.y + 85 >= 404) {
                this.y = 404;
            } else {
                this.y += 85;
            }
            break;


    }
};
//When evoced by Player.update made to reset the game pice position.
Player.prototype.checkCollisons = function() {
    allEnemies.forEach(function(enemy) {

        if (this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.height + this.y > enemy.y) {
            this.reset();
            console.log('collision detected!');
        }
    }, player);
};
//Renders the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Sets starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
//When evoced by Player.update will prompt the you win sign.
Player.prototype.checkWin = function() {
    if (this.x < star.x + star.width &&
        this.x + this.width > star.x &&
        this.y < star.y + star.height &&
        this.height + this.y > star.y) {
        star.sprite = 'images/You Win.png';
        star.x = 100;
        star.y = 150;
        console.log('You Win!');
    }
};
//Makes the new player object.
var player = new Player();

//All enemy objects are placed in an array called allEnemies for collison checking
var allEnemies = [];

allEnemies.push(enemy0, enemy1, enemy2, enemy3);




// This listens for key presses and sends the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
