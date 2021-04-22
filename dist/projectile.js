export class Projectile {
    constructor(x, y, ySpeed, xSpeed, radius, context) {
        this.x = x;
        this.y = y;
        this.ySpeed = ySpeed;
        this.xSpeed = xSpeed;
        this.radius = radius;
        this.context = context;
    }
    draw() {
        this.context.strokeStyle = "white";
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.stroke();
        this.context.strokeStyle = "black";
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=projectile.js.map