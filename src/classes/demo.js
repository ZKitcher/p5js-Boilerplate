// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/093-double-pendulum.html

class Demo {
    constructor() {
        this.r1 = random(200, 400);
        this.r2 = random(150, 400);
        this.m1 = random(10, 30);
        this.m2 = random(10, 30);
        this.a1 = PI / 2;
        this.a2 = PI / 2;
        this.a1_v = 0;
        this.a2_v = 0;
        this.cx = width / 2;
        this.cy = height - (this.r1 + this.r2 + 100);

        this.g = 1;
        this.px2 = -1;
        this.py2 = -1;

        this.x1;
        this.y1;
        this.x2;
        this.y2;

        this.buffer = createGraphics(width, height);
        this.buffer.background(51);
        this.buffer.translate(this.cx, this.cy);

        this.startColor = this.randomColour();
        this.newColor = this.randomColour();
        this.amt = 0;
    }

    run() {
        this.update();
        this.render();
    }

    update() {
        let num1 = -this.g * (2 * this.m1 + this.m2) * sin(this.a1);
        let num2 = -this.m2 * this.g * sin(this.a1 - 2 * this.a2);
        let num3 = -2 * sin(this.a1 - this.a2) * this.m2;
        let num4 = this.a2_v * this.a2_v * this.r2 + this.a1_v * this.a1_v * this.r1 * cos(this.a1 - this.a2);
        let den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
        let a1_a = (num1 + num2 + num3 * num4) / den;

        num1 = 2 * sin(this.a1 - this.a2);
        num2 = (this.a1_v * this.a1_v * this.r1 * (this.m1 + this.m2));
        num3 = this.g * (this.m1 + this.m2) * cos(this.a1);
        num4 = this.a2_v * this.a2_v * this.r2 * this.m2 * cos(this.a1 - this.a2);
        den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
        let a2_a = (num1 * (num2 + num3 + num4)) / den;

        this.x1 = this.r1 * sin(this.a1);
        this.y1 = this.r1 * cos(this.a1);

        this.x2 = this.x1 + this.r2 * sin(this.a2);
        this.y2 = this.y1 + this.r2 * cos(this.a2);

        this.a1_v += a1_a;
        this.a2_v += a2_a;
        this.a1 += this.a1_v;
        this.a2 += this.a2_v;
    }

    randomColour() {
        return color(random(25, 255), random(25, 255), random(25, 255))
    }

    render() {
        push()
        imageMode(CORNER);
        image(this.buffer, 0, 0, width, height);

        translate(this.cx, this.cy);
        stroke(0);
        strokeWeight(3);


        line(0, 0, this.x1, this.y1);
        line(this.x1, this.y1, this.x2, this.y2);
        fill(255);
        ellipse(this.x1, this.y1, this.m1, this.m1);
        ellipse(this.x2, this.y2, this.m2, this.m2);


        const rainbow = lerpColor(this.startColor, this.newColor, this.amt)
        this.buffer.stroke(rainbow);
        this.amt += 0.01;

        if (this.amt >= 1) {
            this.amt = 0.0;
            this.startColor = this.newColor;
            this.newColor = this.randomColour();
        }

        if (frameCount > 1) this.buffer.line(this.px2, this.py2, this.x2, this.y2);
        
        textAlign(CENTER);
        textSize(30);
        fill(rainbow)
        strokeWeight(1);
        text('p5js Boiler DEMO', 0, -100)

        this.px2 = this.x2;
        this.py2 = this.y2;
        pop()
    }
}
