class Game{
  constructor(context) {
    this.ctx = context;
    this.virus = new Player (500, 430, 40, 40);
    this.health = 100;
    this.points = 0;
    this.droplets = [];
    this.enemies = [];
    this.friends = [];
    this.bullets = [new Bullet (((this.virus.x + this.virus.x + this.virus.width) / 2), 430, 5, 15)];
    this.intervalFall = undefined;
    this.intervalGame = undefined;
    this.intervalCrossing = undefined;
    this.intervalFriendsCrossing = undefined;
  }

  _drawVirus () {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.virus.x, this.virus.y, this.virus.width, this.virus.height);
  }

  _drawBullet () {
    this.bullets[0].shootBullet();
    this.bullets.forEach((elem) => {
      this.ctx.fillStyle = "yellow";
      this.ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
    })
  }

  _generateBullet () {
      if (this.bullets[0].isBulletOffScreen()) {
        this.bullets.splice(0, 1);
        const newBullet = new Bullet (((this.virus.x + this.virus.x + this.virus.width) / 2), 430, 5, 15);
        this.bullets.push(newBullet);
      }
  }


  _drawDroplets () {
    this.droplets.forEach((elem) => {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
    })
  }

  _drawEnemies () {
    this.enemies.forEach((elem) => {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
    })
  }

  
  _drawFriends () {
    this.friends.forEach((elem) => {
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
    })
  }

  _generateDroplets () {
    const newObject = new Droplet (70, 70);
    newObject._assignObjects();
    this.droplets.push(newObject);
  }

  _generateEnemies () {
    const newEnemy = new Enemy (60, 60);
    newEnemy._assignEnemies();
    this.enemies.push(newEnemy);
  }

  _generateFriends () {
    const newFriend = new Friend (60, 60);
    newFriend._assignFriends ();
    this.friends.push(newFriend);
  }

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
          this.bullets[0].shootBullet();
          this._generateBullet();
        default:
          break;
      }
    });
  }

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
        this.points = this.points + 10;
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
        this.points = this.points - 10;
        let index = this.friends.indexOf(elem);
        this.friends.splice(index, 1);
      }
    })
  }

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

  _gameOver () {
    clearInterval(this.intervalCrossing);
    clearInterval(this.intervalFall);
    clearInterval(this.intervalFriendsCrossing);
    const losePage = document.getElementById('lose-page');
    losePage.style = 'display: flex';
    const canvas = document.getElementById('canvas');
    canvas.style = 'display: none';
  }

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
    let counterFall = 0;
    this.intervalFall = setInterval(() => { 
      if (counterFall < this.droplets.length) {
        this.droplets[counterFall]._fallObjects();
        counterFall++;
      }
    }, 1000);
    let counterCross = 0;
    this.intervalCrossing = setInterval(() => { 
      if (counterCross < this.enemies.length) {
        this.enemies[counterCross]._crossingEnemies();
        counterCross++;
      }
    }, 1800);
    let counterCrossFriend = 0;
    this.intervalFriendsCrossing = setInterval(() => { 
      if (counterCrossFriend < this.friends.length) {
        this.friends[counterCrossFriend]._crossingFriends();
        counterCrossFriend++;
      }
    }, 1600);

    window.requestAnimationFrame(() => this._update());
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

}