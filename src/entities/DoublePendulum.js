import { EVENTS } from "../core/events.js";
import { GameObject } from "../core/GameObject.js";

export default class DoublePendulum extends GameObject {
    constructor(p, scene) {
        super(p, scene);
        this.length1 = Math.round(this.p.height / 3);
        this.length2 = Math.round(this.p.height / 3);
        this.mass1 = 20;
        this.mass2 = 10;
        this.angle1 = this.p.PI / 2;
        this.angle2 = this.p.PI / this.p.random(1.9, 2.1);
        this.angle1Velocity = 0;
        this.angle2Velocity = 0;
        this.cx = this.p.width / 2;
        this.cy = this.p.height - (this.length1 + this.length2 + 100);

        this.g = 1;
        this.px2 = -1;
        this.py2 = -1;

        this.x1;
        this.y1;
        this.x2;
        this.y2;

        this.image = this.p.createGraphics(this.p.width, this.p.height);
        this.image.translate(this.cx, this.cy);

        this.colours = [
            this.p.color(255, 0, 0),
            this.p.color(255, 255, 0),
            this.p.color(0, 255, 0),
            this.p.color(0, 255, 255),
            this.p.color(0, 0, 255),
            this.p.color(255, 0, 255),
        ]

        this.colourIndex = 0;
        this.startColor = this.colours[this.colourIndex];
        this.newColor = this.colours[this.colourIndex + 1];
        this.amt = 0;

        // Listen to the frame event to update and render the pendulum
        this.listen(EVENTS.FRAME, this.update, EVENTS.UPDATE);
        this.listen(EVENTS.FRAME, this.render, EVENTS.RENDER);
    }


    update({ p, deltaTime, frameCount }) {
        let num1 = -this.g * (2 * this.mass1 + this.mass2) * p.sin(this.angle1);
        let num2 = -this.mass2 * this.g * p.sin(this.angle1 - 2 * this.angle2);
        let num3 = -2 * p.sin(this.angle1 - this.angle2) * this.mass2;
        let num4 = this.angle2Velocity * this.angle2Velocity * this.length2 + this.angle1Velocity * this.angle1Velocity * this.length1 * p.cos(this.angle1 - this.angle2);
        let den = this.length1 * (2 * this.mass1 + this.mass2 - this.mass2 * p.cos(2 * this.angle1 - 2 * this.angle2));
        let a1_a = (num1 + num2 + num3 * num4) / den;

        num1 = 2 * p.sin(this.angle1 - this.angle2);
        num2 = (this.angle1Velocity * this.angle1Velocity * this.length1 * (this.mass1 + this.mass2));
        num3 = this.g * (this.mass1 + this.mass2) * p.cos(this.angle1);
        num4 = this.angle2Velocity * this.angle2Velocity * this.length2 * this.mass2 * p.cos(this.angle1 - this.angle2);
        den = this.length2 * (2 * this.mass1 + this.mass2 - this.mass2 * p.cos(2 * this.angle1 - 2 * this.angle2));
        let a2_a = (num1 * (num2 + num3 + num4)) / den;

        this.x1 = this.length1 * p.sin(this.angle1);
        this.y1 = this.length1 * p.cos(this.angle1);

        this.x2 = this.x1 + this.length2 * p.sin(this.angle2);
        this.y2 = this.y1 + this.length2 * p.cos(this.angle2);

        this.angle1Velocity += a1_a;
        this.angle2Velocity += a2_a;

        const limit = 0.09;
        if (Math.abs(this.angle1Velocity) > limit && Math.abs(this.angle2Velocity) > limit) {
            this.angle1Velocity *= 0.99;
            this.angle2Velocity *= 0.99;
        }

        this.angle1 += this.angle1Velocity;
        this.angle2 += this.angle2Velocity;
    }

    render({ p, deltaTime, frameCount }) {
        p.push()
        p.imageMode(p.CORNER);
        p.image(this.image, 0, 0, p.width, p.height);

        p.translate(this.cx, this.cy);
        p.stroke(0);
        p.strokeWeight(3);

        p.line(0, 0, this.x1, this.y1);
        p.line(this.x1, this.y1, this.x2, this.y2);
        p.fill(255);
        p.ellipse(this.x1, this.y1, this.mass1, this.mass1);
        p.ellipse(this.x2, this.y2, this.mass2 * 1.5, this.mass2 * 1.5);

        const rainbow = p.lerpColor(this.startColor, this.newColor, this.amt)
        this.image.stroke(rainbow);
        this.amt += 0.01;

        if (this.amt >= 1) {
            this.amt = 0.0;
            this.colourIndex++;
            if (this.colourIndex === this.colours.length) this.colourIndex = 0;
            this.startColor = this.colours[this.colourIndex];
            this.newColor = this.colours[this.colourIndex === this.colours.length - 1 ? 0 : this.colourIndex + 1];
        }

        if (frameCount > 1) this.image.line(this.px2, this.py2, this.x2, this.y2);

        p.textAlign(p.CENTER);
        p.textSize(30);
        p.fill(rainbow)
        p.strokeWeight(1);
        p.text('p5.js Boilerplate DEMO', 0, -100)

        this.px2 = this.x2;
        this.py2 = this.y2;
        p.pop()
    }
}
