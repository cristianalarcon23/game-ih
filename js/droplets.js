class Droplet {
    constructor (width, height) {
        this.x = Math.floor(Math.random() * (940 - 4) + 5);
        this.y = -60;
        this.width = width;
        this.height = height;
        this.fallInterval = undefined;
        this.role = undefined;
    }

    _fallObjects () {
        this.fallInterval = setInterval(() => {
            if (this.y > 500) {
                clearInterval(this.fallInterval);
            } else {
                this.y = this.y + 1;
            }
        }, 300);
    }


    _assignObjects () {
        const assignment = Math.floor(Math.random() * 4);
        switch (assignment) {
            case 1 :
                this.role = "mask";
                break;
            case 2 : 
                this.role = "certificate";
                break;
            case 3 : 
                this.role = "hydrogel";
                break;
            default : 
                this.role = "mask";
                break;
        }
    }


} 