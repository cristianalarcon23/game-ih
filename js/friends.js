class Friend {
    constructor (width, height) {
        this.x = 1000;
        this.y = 100;
        this.width = width;
        this.height = height;
        this.fallInterval = undefined;
        this.role = undefined;
        this.image = undefined;
    }

    _crossingFriends () {
        this.fallInterval = setInterval(() => {
            if (this.x < -75) {
                clearInterval(this.fallInterval);
            } else {
                this.x = this.x - 4;
            }
        }, 1200);
    }

    _crossingFriendsMedium () {
        this.fallInterval = setInterval(() => {
            if (this.x < -75) {
                clearInterval(this.fallInterval);
            } else {
                this.x = this.x - 6;
            }
        }, 1400);
    }

    _crossingFriendsIron () {
        this.fallInterval = setInterval(() => {
            if (this.x < -75) {
                clearInterval(this.fallInterval);
            } else {
                this.x = this.x - 6;
            }
        }, 1200);
    }


    _assignFriends () {
        const assignment = Math.floor(Math.random() * 2);
        switch (assignment) {
            case 0 :
                this.role = "friends";
                this.image = imgFriends;
                break;
            case 1 : 
                this.role = "friends2";
                this.image = imgFriends2;
                break;
        }
    }


} 