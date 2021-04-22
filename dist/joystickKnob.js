export class JoyStickKnob {
    constructor(x, y, radius, context) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.context = context;
        this.isDragged = false;
    }
    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "red";
        this.context.fill();
    }
    move(nx, ny) {
        this.x = nx;
        this.y = ny;
    }
}
//# sourceMappingURL=joystickKnob.js.map