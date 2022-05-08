class Game{
  constructor(context) {
    this.ctx = context;
    this.virus = new Player (500, 430, 40, 40);
    this.health = 100;
    this.points = 0;
    this.droplets = [];
    this.enemies = [];
    this.intervalFall = undefined;
    this.intervalGame = undefined;
    this.intervalCrossing = undefined;
  }

  _drawVirus () {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.virus.x, this.virus.y, this.virus.width, this.virus.height);
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

  _generateEnemies () {
    const newEnemy = new Enemy (60, 60);
    newEnemy._assignEnemies();
    console.log(newEnemy);
    this.enemies.push(newEnemy);
  }

  _generateDroplets () {
    const newObject = new Droplet (60, 60);
    newObject._assignObjects();
    this.droplets.push(newObject);
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
        default:
          break;
      }
    });
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

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 500);
  }

  _update() {
    this._clean();
    this._drawVirus();
    this._writeHealthPoints();
    this._writeReputationPoints();
    this._drawDroplets();
    this._drawEnemies();
    let counterFall = 0;
    this.intervalFall = setInterval(() => { 
      if (counterFall < this.droplets.length) {
        this.droplets[counterFall]._fallObjects();
        counterFall++;
      }
    }, 1500);
    let counterCross = 0;
    this.intervalCrossing = setInterval(() => { 
      if (counterCross < this.enemies.length) {
        this.enemies[counterCross]._crossingEnemies();
        counterCross++;
      }
    }, 2500);
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this.intervalGame = setInterval(() => {
      this._generateDroplets();
      this._generateEnemies();
    }, 1000);
    this._update();
  }




}