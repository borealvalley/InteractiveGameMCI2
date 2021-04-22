export class JoyStickKnob {
    x: number;
    y: number;
    radius: number;
    isDragged: boolean;

    context: CanvasRenderingContext2D;


    constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D) {
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

    move(nx: number, ny: number) {
        this.x = nx;
        this.y = ny;
    }
}