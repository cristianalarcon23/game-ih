class Enemy {
    constructor (width, height) {
        this.x = -70;
        this.y = 20;
        this.width = width;
        this.height = height;
        this.fallInterval = undefined;
        this.role = undefined;
    }

    _crossingEnemies () {
        this.fallInterval = setInterval(() => {
            if (this.x > 1000) {
                clearInterval(this.fallInterval);
            } else {
                this.x = this.x + 1;
            }
        }, 300);
    }


    _assignEnemies () {
        const assignment = Math.floor(Math.random() * 3);
        switch (assignment) {
            case 1 :
                this.role = "negationist";
                break;
            case 2 : 
                this.role = "flatearthbeliever";
                break;
            default : 
                this.role = "negationist";
                break;
        }
    }


} 