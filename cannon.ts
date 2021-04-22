import { Joystick } from "./joystick.js";
import { Projectile } from "./projectile.js"
export class Cannon {
    x: number;
    y: number;

    speedX: number;

    speedY: number;
    colour = "";
    context: CanvasRenderingContext2D;
    alpha: number;

    shotFrequency: number;
    shotSpeed: number;
    path: Path2D;

    constructor(x: number, y: number, colour: string, context: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.alpha = 0;
        this.speedX = 1;
        this.speedY = 1;
        this.shotSpeed = 1;
        this.shotFrequency = 100;
        this.context = context;
        this.path = new Path2D();
    }

    createPath2D() {
        this.path = new Path2D();
        this.path.arc(0, 0, 15, 0, 2 * Math.PI, false);
        this.path.rect(-10, -20, 20, 20);
    }
    draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(-this.alpha);
        this.context.fillStyle = this.colour;
        this.createPath2D();
        this.context.stroke(this.path);
        this.context.fill(this.path);
        this.context.restore();
    }

    shoot(ongoingProjectiles: Projectile[], joystick:Joystick) {
        let angle = joystick.getAngleOfKnob();

        let maxSpeedX = -Math.cos(angle); // get the right angle for the shots to hit
        let maxSpeedY = -Math.sin(angle);

        let projectile = new Projectile(this.x, this.y, this.speedX*maxSpeedX, this.speedY * maxSpeedY, 5, this.context)
        ongoingProjectiles.push(projectile);
    }

    move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    rotate(alpha: number) {
        this.alpha = alpha;
    }
}
