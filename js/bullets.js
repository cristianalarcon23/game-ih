class Bullet {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shootInterval = undefined;

    }

    shootBullet () {
        this.shootInterval = setInterval(() => {
            if (this.y < -15) {
                clearInterval(this.shootInterval);
            } else {
                this.y = this.y - 12;
            }
        }, 200);
    }

    isBulletOffScreen () {
            return this.y <= -this.height;
          }
    }
