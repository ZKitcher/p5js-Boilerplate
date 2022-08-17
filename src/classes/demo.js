class Demo {
    constructor() {
        this.length1 = height / 3;
        this.length2 = height / 3;
        this.mass1 = 20;
        this.mass2 = 10;
        this.angle1 = PI / 2;
        this.angle2 = PI / random(1.9, 2.1);
        this.angle1Velocity = 0;
        this.angle2Velocity = 0;
        this.cx = width / 2;
        this.cy = height - (this.length1 + this.length2 + 100);

        this.g = 1;
        this.px2 = -1;
        this.py2 = -1;

        this.x1;
        this.y1;
        this.x2;
        this.y2;

        this.image = createGraphics(width, height);
        this.image.background(51);
        this.image.translate(this.cx, this.cy);

        this.startColor = this.randomColour();
        this.newColor = this.randomColour();
        this.amt = 0;
    }

    run() {
        this.update();
        this.render();
    }

    update() {
        let num1 = -this.g * (2 * this.mass1 + this.mass2) * sin(this.angle1);
        let num2 = -this.mass2 * this.g * sin(this.angle1 - 2 * this.angle2);
        let num3 = -2 * sin(this.angle1 - this.angle2) * this.mass2;
        let num4 = this.angle2Velocity * this.angle2Velocity * this.length2 + this.angle1Velocity * this.angle1Velocity * this.length1 * cos(this.angle1 - this.angle2);
        let den = this.length1 * (2 * this.mass1 + this.mass2 - this.mass2 * cos(2 * this.angle1 - 2 * this.angle2));
        let a1_a = (num1 + num2 + num3 * num4) / den;

        num1 = 2 * sin(this.angle1 - this.angle2);
        num2 = (this.angle1Velocity * this.angle1Velocity * this.length1 * (this.mass1 + this.mass2));
        num3 = this.g * (this.mass1 + this.mass2) * cos(this.angle1);
        num4 = this.angle2Velocity * this.angle2Velocity * this.length2 * this.mass2 * cos(this.angle1 - this.angle2);
        den = this.length2 * (2 * this.mass1 + this.mass2 - this.mass2 * cos(2 * this.angle1 - 2 * this.angle2));
        let a2_a = (num1 * (num2 + num3 + num4)) / den;

        this.x1 = this.length1 * sin(this.angle1);
        this.y1 = this.length1 * cos(this.angle1);

        this.x2 = this.x1 + this.length2 * sin(this.angle2);
        this.y2 = this.y1 + this.length2 * cos(this.angle2);

        this.angle1Velocity += a1_a;
        this.angle2Velocity += a2_a;
        this.angle1 += this.angle1Velocity;
        this.angle2 += this.angle2Velocity;
    }

    randomColour() {
        return color(random(25, 255), random(25, 255), random(25, 255))
    }

    render() {
        push()
        imageMode(CORNER);
        image(this.image, 0, 0, width, height);

        translate(this.cx, this.cy);
        stroke(0);
        strokeWeight(3);

        line(0, 0, this.x1, this.y1);
        line(this.x1, this.y1, this.x2, this.y2);
        fill(255);
        ellipse(this.x1, this.y1, this.mass1, this.mass1);
        ellipse(this.x2, this.y2, this.mass2, this.mass2);

        const rainbow = lerpColor(this.startColor, this.newColor, this.amt)
        this.image.stroke(rainbow);
        this.amt += 0.01;

        if (this.amt >= 1) {
            this.amt = 0.0;
            this.startColor = this.newColor;
            this.newColor = this.randomColour();
        }

        if (frameCount > 1) this.image.line(this.px2, this.py2, this.x2, this.y2);

        textAlign(CENTER);
        textSize(30);
        fill(rainbow)
        strokeWeight(1);
        text('p5.js Boilerplate DEMO', 0, -100)

        this.px2 = this.x2;
        this.py2 = this.y2;
        pop()
    }
}
