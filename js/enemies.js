class Enemy {
    constructor (width, height) {
        this.x = -70;
        this.y = 20;
        this.width = width;
        this.height = height;
        this.fallInterval = undefined;
        this.role = undefined;
        this.image = undefined;
    }

    _crossingEnemies () {
        this.fallInterval = setInterval(() => {
            if (this.x > 1000) {
                clearInterval(this.fallInterval);
            } else {
                this.x = this.x + 1;
            }
        }, 600);
    }


    _assignEnemies () {
        const assignment = Math.floor(Math.random() * 2);
        console.log(assignment);
        switch (assignment) {
            case 0 :
                this.role = "bose";
                this.image = imgBose;
                break;
            case 1 : 
                this.role = "putin";
                this.image = imgPutin;
                break;
        }
    }



} 