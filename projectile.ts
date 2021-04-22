export class Projectile {
    x: number;
    y: number;

    ySpeed: number;
    xSpeed: number;

    radius: number;
    context: CanvasRenderingContext2D;

    constructor(x: number, y: number, ySpeed: number, xSpeed: number, radius: number, context:CanvasRenderingContext2D) {
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
        this.context.arc(this.x, this.y, this.radius, 0, 2* Math.PI, false);    
        this.context.stroke();
        this.context.strokeStyle = "black";
    }

    move(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}