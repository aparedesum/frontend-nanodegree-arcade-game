// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = getY();
    this.speed = getSpeed();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = 0;
        this.y = getY();
        this.speed = getSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function (player){
    
    var result = true;
    
    if (this.x + 100 <= player.x) {
           result = false;
    }else if (this.y + 80 <= player.y) {
         result = false;
    } else if (this.x >= player.x + 100) {
         result = false;
    } else if (this.y >= player.y + 80) {
         result = false;
    }

    if(result){
        player.x = 202.5;
        player.y = 380;
        
        if(player.score > 0) {
            player.score -= 10;            
        }        
    }
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';    
    this.x = 202.5;
    this.y = 380;
    this.score = 0;
};

Player.prototype.update = function(){
    //It prevents from moving beyond the boundaries    
    if (this.y > 380 ) {
        this.y = 380;
    }

    if (this.x > 500) {
        this.x -= 100;
    }
    
    if (this.x < 0) {
        this.x += 100;
    }    

    // When y = 0, it means you win and reset to initial position.
    if (this.y < 50) {
        this.x = 202.5;
        this.y = 380; 
        this.score += 100;
    }
};

Player.prototype.render = function(){
    ctx.font = '30pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.clearRect(0, 0, 200, 50);
    ctx.fillText("Score: " + this.score, 100, 40);
    ctx.strokeText("Score: " + this.score , 100, 40);
};

Player.prototype.handleInput = function(keyValue) {
    if (keyValue == 'left') {
        this.x -= 100;
    }
    if (keyValue == 'up') {
        this.y -= 80;
    }
    if (keyValue == 'right') {
        this.x += 100;
    }
    if (keyValue == 'down') {
        this.y += 80;
    }    
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = new Array();
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy()) ;

function getY() {
    return (Math.floor(Math.random() * 3) * 80 ) + 60;
}

function getSpeed() {
    return (Math.random() * 500) + 50;
}

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
