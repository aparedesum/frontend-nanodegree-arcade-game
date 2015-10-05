//Super class
var Character = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    Character.call(this, x, y, 'images/enemy-bug.png');
    this.speed = getSpeed();
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;
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

Enemy.prototype.checkCollision = function(player) {

    var result = false;

    //Axis-Aligned Bounding Box
    if (this.x < player.x + 100 &&
        this.x + 100 > player.x &&
        this.y < player.y + 80 &&
        80 + this.y > player.y) {
        result = true;
    }

    if (result) {
        player.resetInitialPosition();
        if (player.score > 0) {
            player.addScore(-10);
        }
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    Character.call(this, x, y, 'images/char-boy.png');
    this.score = 0;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Enemy;
Player.prototype.update = function() {
    //It prevents from moving beyond the boundaries    
    if (this.y > 380) {
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
        this.resetInitialPosition();
        this.addScore(100);
    }
};

Player.prototype.render = function() {
    ctx.font = '30pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.clearRect(0, 0, 200, 50);
    ctx.fillText("Score: " + this.score, 100, 40);
    ctx.strokeText("Score: " + this.score, 100, 40);
};

Player.prototype.resetInitialPosition = function() {
    this.x = 202.5;
    this.y = 380;
};

Player.prototype.addScore = function(value) {
    this.score += value;
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

var player = new Player(202.5, 380);

var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(0, getY()));
}

function getY() {
    return (Math.floor(Math.random() * 3) * 80) + 60;
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