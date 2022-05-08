class Game{
  constructor(context) {
    this.ctx = context;
    this.virus = new Player (500, 430, 40, 40);
    this.health = 100;
    this.points = 0;
    this.droplets = [];
    this.intervalFall = undefined;
    this.intervalGame = undefined;
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

  _generateDroplets () {
    const newObject = new Droplet (60, 60);
    newObject._assignObjects();
    console.log(newObject);
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
    let counter = 0;
    this.intervalFall = setInterval(() => { 
      if (counter < this.droplets.length) {
        this.droplets[counter]._fallObjects();
        counter++;
      }
    }, 2000);
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this.intervalGame = setInterval(() => {
      this._generateDroplets();
    }, 2000);
    this._update();
  }




}