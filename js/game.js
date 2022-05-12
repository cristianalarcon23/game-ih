class Game{
  constructor(context) {
    this.ctx = context;
    this.virus = new Player (460, 420, 80, 80);
    this.health = 60;
    this.points = 0;
    this.droplets = [];
    this.enemies = [];
    this.friends = [];
    this.bullets = [new Bullet (((this.virus.x + this.virus.x + this.virus.width) / 2) - 11, 420, 23, 23)];
    this.intervalFall = undefined;
    this.intervalGame = undefined;
    this.intervalCrossing = undefined;
    this.intervalFriendsCrossing = undefined;
    this.level = undefined;
  }

  //draw all images//

  _drawVirus () {
    this.ctx.drawImage(imgVirus, this.virus.x, this.virus.y, this.virus.width, this.virus.height);
  }

  _drawBullet () {
    this.bullets[0].shootBullet();
    this.bullets.forEach((elem) => {
      this.ctx.drawImage(imgBullet, ((elem.x + elem.x + elem.width) / 2) - 11, elem.y, 23, 23);
    })
  }

  _drawDroplets () {
    this.droplets.forEach((elem) => {
      this.ctx.drawImage(elem.image, elem.x, (elem.y - 15), elem.width, elem.height);
    })
  }

  _drawEnemies () {
    this.enemies.forEach((elem) => {
      this.ctx.drawImage(elem.image, elem.x, elem.y, elem.width, elem.height);
    })
  }

  _drawFriends () {
    this.friends.forEach((elem) => {
      this.ctx.drawImage(elem.image, elem.x, elem.y, elem.width, elem.height);
    })
  }

//generate all images//

  _generateDroplets () {
    const newObject = new Droplet (90, 90);
    newObject._assignObjects();
    this.droplets.push(newObject);
  }

  _generateEnemies () {
    const newEnemy = new Enemy (75, 75);
    newEnemy._assignEnemies();
    this.enemies.push(newEnemy);
  }

  _generateFriends () {
    const newFriend = new Friend (75, 75);
    newFriend._assignFriends ();
    this.friends.push(newFriend);
  }

  _generateBullet () {
   if (this.bullets[0].isBulletOffScreen()) {
     this.bullets.splice(0, 1);
      const newBullet = new Bullet (((this.virus.x + this.virus.x + this.virus.width) / 2) - 11, 420, 23, 23);
      this.bullets.push(newBullet);
    }
}

//check if out screen all objects//

_checkIfOutScreen () {
  this.droplets.forEach((elem) => {
    if (elem.y > 600) {
      let index = this.droplets.indexOf(elem);
      this.droplets.splice(index, 1);
    }
  })
}

_checkIfEnemyIsOut () {
  this.enemies.forEach((elem) => {
    if (elem.x > 1100) {
      let index = this.enemies.indexOf(elem);
      this.enemies.splice(index, 1);
    }
  })
}

_checkIfFriendIsOut () {
  this.friends.forEach((elem) => {
    if (elem.x < -100) {
      let index = this.friends.indexOf(elem);
      this.friends.splice(index, 1);
    }
  })
}


// control assigns//

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.virus.moveLeft();
          break;
        case 'ArrowRight':
          this.virus.moveRight();
          break;
        case 'Space':
          shootSound.play();
          this.bullets[0].shootBullet();
          this._generateBullet();
        default:
          break;
      }
    });
  }

  //check collisions//

  _checkDropletCollision() {
    this.droplets.forEach((elem) => {
      if (
        (this.virus.x >= elem.x && this.virus.x <= elem.x + elem.width || 
        this.virus.x + this.virus.width >= elem.x && this.virus.x + this.virus.width <= elem.x + elem.width || 
        elem.x >= this.virus.x && elem.x <= this.virus.x + this.virus.width) && 
        (this.virus.y >= elem.y && this.virus.y <= elem.y + elem.height || 
          this.virus.y + this.virus.height >= elem.y && this.virus.y + this.virus.height <= elem.y + elem.height || 
          elem.y >= this.virus.y && elem.y <= this.virus.y + this.virus.height)
      ) {
        dropSound.play();
        this.health = this.health - 10;
        if (this.health <= 0) {
          this._gameOver();
        }
        let index = this.droplets.indexOf(elem);
        this.droplets.splice(index, 1);
      }
    })
  }

  _checkEnemyCollision() {
    this.enemies.forEach((elem) => {
      if (
        (this.bullets[0].x >= elem.x && this.bullets[0].x <= elem.x + elem.width || 
        this.bullets[0].x + this.bullets[0].width >= elem.x && this.bullets[0].x + this.bullets[0].width <= elem.x + elem.width || 
        elem.x >= this.bullets[0].x && elem.x <= this.bullets[0].x + this.bullets[0].width) && 
        (this.bullets[0].y >= elem.y && this.bullets[0].y <= elem.y + elem.height || 
          this.bullets[0].y + this.bullets[0].height >= elem.y && this.bullets[0].y + this.bullets[0].height <= elem.y + elem.height || 
          elem.y >= this.bullets[0].y && elem.y <= this.bullets[0].y + this.bullets[0].height)
      ) {
        crySound.play();
        this.points = this.points + 10;
        if (this.points >= 50) {
          this._gameWon();
        }
        let index = this.enemies.indexOf(elem);
        this.enemies.splice(index, 1);
      }
    })
  }

  _checkFriendCollision() {
    this.friends.forEach((elem) => {
      if (
        (this.bullets[0].x >= elem.x && this.bullets[0].x <= elem.x + elem.width || 
        this.bullets[0].x + this.bullets[0].width >= elem.x && this.bullets[0].x + this.bullets[0].width <= elem.x + elem.width || 
        elem.x >= this.bullets[0].x && elem.x <= this.bullets[0].x + this.bullets[0].width) && 
        (this.bullets[0].y >= elem.y && this.bullets[0].y <= elem.y + elem.height || 
          this.bullets[0].y + this.bullets[0].height >= elem.y && this.bullets[0].y + this.bullets[0].height <= elem.y + elem.height || 
          elem.y >= this.bullets[0].y && elem.y <= this.bullets[0].y + this.bullets[0].height)
      ) {
        wrongSound.play();
        this.points = this.points - 10;
        let index = this.friends.indexOf(elem);
        this.friends.splice(index, 1);
      }
    })
  }

  //scores//

  _writeHealthPoints () {
    this.ctx.fillStyle = 'white';
    this.ctx.font = "18px Arial"
    this.ctx.fillText(`Health Points: ${this.health}`, 840, 490)
  }
  _writeReputationPoints () {
    this.ctx.fillStyle = 'white';
    this.ctx.font = "18px Arial"
    this.ctx.fillText(`Reputation Points: ${this.points}`, 15, 490)
  }

  //finishing game//

  _gameWon () {
    gwSound.play();
    clearInterval(this.intervalCrossing);
    clearInterval(this.intervalFall);
    clearInterval(this.intervalFriendsCrossing);
    this._clean();
    const losePage = document.getElementById('lose-page');
    losePage.style = 'display: none';
    const winPage = document.getElementById('win-page');
    winPage.style = 'display: flex';
    const canvas = document.getElementById('canvas');
    canvas.style = 'display: none';
  }

  _gameOver () {
    goSound.play();    
    this.droplets = [];
    clearInterval(this.intervalCrossing);
    clearInterval(this.intervalFall);
    clearInterval(this.intervalFriendsCrossing);
    const losePage = document.getElementById('lose-page');
    losePage.style = 'display: flex';
    const canvas = document.getElementById('canvas');
    canvas.style = 'display: none';
  }

  //necessary functions to update canvas//

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 500);
  }

  _update() {
    this._clean();
    this._drawVirus();
    this._drawBullet();
    this._writeHealthPoints();
    this._writeReputationPoints();
    this._drawDroplets();
    this._drawEnemies();
    this._drawFriends();
    this._checkDropletCollision();
    this._checkFriendCollision();
    this._checkEnemyCollision();
    this._checkIfOutScreen();
    this._checkIfEnemyIsOut();
    this._checkIfFriendIsOut();
    let counterFall = 0;
    this.intervalFall = setInterval(() => { 
      if (counterFall < this.droplets.length) {
        this.droplets[counterFall]._fallObjects();
        counterFall++;
      }
    }, 1750);
    let counterCross = 0;
    this.intervalCrossing = setInterval(() => { 
      if (counterCross < this.enemies.length) {
        this.enemies[counterCross]._crossingEnemies();
        counterCross++;
      }
    }, 2000);
    let counterCrossFriend = 0;
    this.intervalFriendsCrossing = setInterval(() => { 
      if (counterCrossFriend < this.friends.length) {
        this.friends[counterCrossFriend]._crossingFriends();
        counterCrossFriend++;
      }
    }, 1750);

    window.requestAnimationFrame(() => this._update());
  }

  _updateMedium() {
    this._clean();
    this._drawVirus();
    this._drawBullet();
    this._writeHealthPoints();
    this._writeReputationPoints();
    this._drawDroplets();
    this._drawEnemies();
    this._drawFriends();
    this._checkDropletCollision();
    this._checkFriendCollision();
    this._checkEnemyCollision();
    this._checkIfOutScreen();
    this._checkIfEnemyIsOut();
    this._checkIfFriendIsOut();
    let counterFall = 0;
    this.intervalFall = setInterval(() => { 
      if (counterFall < this.droplets.length) {
        this.droplets[counterFall]._fallObjectsMedium();
        counterFall++;
      }
    }, 1500);
    let counterCross = 0;
    this.intervalCrossing = setInterval(() => { 
      if (counterCross < this.enemies.length) {
        this.enemies[counterCross]._crossingEnemiesMedium();
        counterCross++;
      }
    }, 1000);
    let counterCrossFriend = 0;
    this.intervalFriendsCrossing = setInterval(() => { 
      if (counterCrossFriend < this.friends.length) {
        this.friends[counterCrossFriend]._crossingFriendsMedium();
        counterCrossFriend++;
      }
    }, 1000);

    window.requestAnimationFrame(() => this._updateMedium());
  }

  _updateIron() {
    this._clean();
    this._drawVirus();
    this._drawBullet();
    this._writeHealthPoints();
    this._writeReputationPoints();
    this._drawDroplets();
    this._drawEnemies();
    this._drawFriends();
    this._checkDropletCollision();
    this._checkFriendCollision();
    this._checkEnemyCollision();
    this._checkIfOutScreen();
    this._checkIfEnemyIsOut();
    this._checkIfFriendIsOut();
    let counterFall = 0;
    this.intervalFall = setInterval(() => { 
      if (counterFall < this.droplets.length) {
        this.droplets[counterFall]._fallObjectsIron();
        counterFall++;
      }
    }, 1000);
    let counterCross = 0;
    this.intervalCrossing = setInterval(() => { 
      if (counterCross < this.enemies.length) {
        this.enemies[counterCross]._crossingEnemiesIron();
        counterCross++;
      }
    }, 1000);
    let counterCrossFriend = 0;
    this.intervalFriendsCrossing = setInterval(() => { 
      if (counterCrossFriend < this.friends.length) {
        this.friends[counterCrossFriend]._crossingFriendsIron();
        counterCrossFriend++;
      }
    }, 2000);

    window.requestAnimationFrame(() => this._updateIron());
  }


  start() {
    this._assignControls();
    this.intervalGame = setInterval(() => {
      this._generateDroplets();
      this._generateEnemies();
      this._generateFriends();
    }, 1500);
    this._update();
  }

  startMedium() {
    this._assignControls();
    this.health = 40;
    this.intervalGame = setInterval(() => {
      this._generateDroplets();
      this._generateEnemies();
      this._generateFriends();
    }, 1500);
    this._updateMedium();
  }

  startIron() {
    this._assignControls();
    this.health = 20;
    this.intervalGame = setInterval(() => {
      this._generateDroplets();
      this._generateEnemies();
      this._generateFriends();
    }, 1500);
    this._updateIron();
  }

}