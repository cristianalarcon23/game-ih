class Game{
  constructor(context) {
    this.ctx = context;
    this.virus = new Player (500, 460, 40, 40);
    this.health = 100;
  }

  _drawVirus () {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(this.virus.x, this.virus.y, this.virus.width, this.virus.height);
  }

  _assignControls() {
    // Controles del teclado
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

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 500);
  }

  _update() {
    this._clean();
    this._drawVirus();
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this._update();
  }




}