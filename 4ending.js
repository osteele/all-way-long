class ConnectedParticles {

    constructor() {
        this.r = (random() * 10) - 2.5;
        this.radius = (height / 80) * (width / 80);
        this.x = (random() * ((width - this.r * 2) - (this.r * 2)) + this.r * 2);
        this.y = (random() * ((height - this.r * 2) - (this.r * 2)) + this.r * 2);

        this.xSpeed = random(-2, 2);
        this.ySpeed = random(-1, 1);
    }

    // creation of a particle.
    createParticle() {
        noStroke();
        fill(255, 214, 117);
        circle(this.x, this.y, this.r);
        // text("Final Project-Connection", 500, 500);
    }

    // setting the particle in motion.
    moveParticle() {
        if (this.x < 0 || this.x > width) {
            this.xSpeed *= -1;
        }
        if (this.y < 0 || this.y > height) {
            this.ySpeed *= -1;
        }

        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius + this.r) {

            if (mouseX < this.x && this.x < width - this.r * 10) {
                this.x += 10;
            }
            if (mouseX > this.x && this.x > this.r * 10) {
                this.x -= 10;
            }
            if (mouseY < this.y && this.y < height - this.r * 10) {
                this.y += -10;
            }
            if (mouseY > this.y && this.y > this.r * 10) {
                this.y -= 10;
            }
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    // text() {
    //     text("Final Project-Connection", 500, 500);
    // }

    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
    joinParticles(particles) {
        particles.forEach(element => {
            let dis = dist(this.x, this.y, element.x, element.y);
            if (dis < 85) {
                stroke('rgba(255,255,255,0.04)');
                line(this.x, this.y, element.x, element.y);
            }

        });
    }
}