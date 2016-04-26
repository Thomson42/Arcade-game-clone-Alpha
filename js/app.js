// Enemies our player must avoid
var Enemy = function(x, y, speed, width, height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 90;
    this.speed = Math.floor(100 + (Math.random()*400) + 1);
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < 505){
        this.x = this.x + this.speed * dt;
    }

    else {
        this.x = 0;
        this.speed = Math.floor(100 + (Math.random()*400) + 1);

    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy0 = new Enemy(-100, 310);

var enemy1 = new Enemy(-100, 50);

var enemy2 = new Enemy(-100, 225);

var enemy3 = new Enemy(-100, 140);

// Now write your own player class    

var Player = function() {
    this.x = 200;
    this.y = 400;
    this.width = 90;
    this.height = 90;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(){
};
Player.prototype.handleInput =function(inputKeys){
    switch(inputKeys) {
        case'left' :
        if(this.x - 101 < 0) {
            this.x = 0;
        }
        
        else{
            this.x -= 101;
        }
        break;
        
        case'right' :
        if(this.x + 101 >=404) {
            this.x = 404;
        }
        else{
            this.x +=101;
        }
        break;
        
        case 'up' :
        if(this.y - 85 < 0) {
            this.y = -15;
        }
        else{
            this.y -= 85;
        }

        break;

        case 'down':
        if(this.y + 85 >= 404){
            this.y = 404;
        }

        else{
            this.y += 85;
        }
        break;
       

    }
};
Player.prototype.checkCollisons = function() {
    if (this.x < Enemy.x + Enemy.width &&
        this.x + this.width > Enemy.x &&
        this.y < Enemy.y + Enemy.height &&
        this.height + this.y > Enemy.y) {
        this.reset();
    console.log('collision detected!');
        }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};
var player = new Player(); 
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];

allEnemies.push(enemy0,enemy1,enemy2,enemy3);


// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
