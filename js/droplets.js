class Droplet {
    constructor (width, height) {
        this.x = Math.floor(Math.random() * (920 - 4) + 5);
        this.y = -90;
        this.width = width;
        this.height = height;
        this.fallInterval = undefined;
        this.role = undefined;
        this.image = undefined;
    }

    _fallObjects () {
        this.fallInterval = setInterval(() => {
            if (this.y > 520) {
                clearInterval(this.fallInterval);
            } else {
                this.y = this.y + 2;
            }
        }, 3000);
    }

    _fallObjectsMedium () {
        this.fallInterval = setInterval(() => {
            if (this.y > 520) {
                clearInterval(this.fallInterval);
            } else {
                this.y = this.y + 4;
            }
        }, 2000);
    }

    _fallObjectsIron () {
        this.fallInterval = setInterval(() => {
            if (this.y > 520) {
                clearInterval(this.fallInterval);
            } else {
                this.y = this.y + 4;
            }
        }, 2000);
    }


    _assignObjects () {
        const assignment = Math.floor(Math.random() * 2);
        switch (assignment) {
            case 0 :
                this.role = "mask";
                this.image = imgMask;
                break;
            case 1 : 
                this.role = "hydrogel";
                this.image = hydroImg;
                this.width = this.width + 10;
                this.height = this.height + 10;
                break;
        }
    }


} 