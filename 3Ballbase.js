class Ballbase {

    constructor() {
        this.angle = 0;
        this.offset = 60;
        this.scalar = 30;
        this.speed = 3;
        this.radius = 80
    }

    wave() {
        this.angle += this.speed;
    }
    // update() {
    //     // this.angle += this.speed;
    //     for (let i = 0; i < 4; i++) {
    //         this.angle += this.speed;
    //         let y = this.offset + sin(this.angle + 0.4 * i) * this.scalar;
    //         let d = dist(mouseX, mouseY, 200 + 300 * i, 300 + y)
    //         if (d < 80) {

    //             fill(255, 220, 105);
    //             ellipse(200 + 300 * i, 300 + y, 90, 90)
    //             text(data.projects[i].name, 130 + 300 * i, 400 + y)
    //             text(data.projects[i].text, 100, 100);

    //             let textHeight = textAscent() + textDescent();
    //             // let textX = object.x;
    //             // let textY = object.y + object.radius + 2 * textHeight;
    //             stroke('yellow');
    //             strokeWeight(3);
    //             line(200 + 300 * i, 300 + y + 80, 200 + 300 * i, 300 + y + 80 + 2 * textHeight);
    //             text("This circle represents something or other", 200 + 300 * i + 3, 300 + y + 80 + 2 * textHeight);
    //         }

    //     }
    // }



    displayLine() {
        for (let i = 0; i < 200; i++) {
            let y = this.offset + sin(this.angle + 40 * i) * this.scalar;
            stroke("white");
            strokeWeight(2);
            point(10 * i, 300 + y)
        }

    }


    // checkMouseIsHovered() {
    //     return dist(mouseX, mouseY, this.x, this.y) < this.radius;

    // }


    displayBall() {
        for (let i = 0; i < 4; i++) {
            let y = this.offset + sin(this.angle + 40 * i) * this.scalar;
            fill(30)
            ellipse(width / 5 * (i + 1), 180 + y, this.radius, this.radius)
            fill(30)
            text(data.projects[i].name, width / 5 * (i + 1) - 50, 100 + y)

            let d = dist(mouseX, mouseY, width / 5 * (i + 1), 180 + y)
            if (d < 80) {
                push();
                noStroke();
                fill(252, 181, 136);
                ellipse(width / 5 * (i + 1), 180 + y, this.radius + 10, this.radius + 10)
                text(data.projects[i].name, width / 5 * (i + 1) - 50, 100 + y)
                //text(data.projects[i].text, 100, 100);
                pop();

                let textHeight = textAscent() + textDescent();
                push();
                stroke(252, 181, 136);
                // strokeWeight(3);
                line(width / 5 * (i + 1), 250 + y, width / 5 * (i + 1), 250 + y + 2 * textHeight);
                pop();
                fill(252, 181, 136)
                push()
                textFont("Baloo2");
                textSize(15)
                text(data.projects[i].text, width / 5 * (i + 1) - 100, 280 + y + 2 * textHeight);
                pop()


                if (i == 3 && mouseIsPressed) {
                    page = 'ending';
                    // datavisState = false;
                    // brokenParticlesState = true;
                    // console.log(page)
                    // console.log(datavisState)
                    // brokenParticlesState = true;

                }
            }


        }

    }





}