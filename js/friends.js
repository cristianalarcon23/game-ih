class Friend {
    constructor (width, height) {
        this.x = 1000;
        this.y = 100;
        this.width = width;
        this.height = height;
        this.fallInterval = undefined;
        this.role = undefined;
    }

    _crossingFriends () {
        this.fallInterval = setInterval(() => {
            if (this.x < -60) {
                clearInterval(this.fallInterval);
            } else {
                this.x = this.x - 1;
            }
        }, 300);
    }


    _assignFriends () {
        const assignment = Math.floor(Math.random() * 3);
        switch (assignment) {
            case 1 :
                this.role = "fernandosimon";
                break;
            case 2 : 
                this.role = "whopresident";
                break;
            default : 
                this.role = "fernandosimon";
                break;
        }
    }


} 