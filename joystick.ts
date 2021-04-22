import { JoyStickKnob } from "./joystickKnob.js";
export class Joystick {
    x: number;
    y: number;
    radius: number;

    isTouched: boolean;
    context: CanvasRenderingContext2D;
    knob: JoyStickKnob;



    constructor(x: number, y: number, radius: number, context: CanvasRenderingContext2D) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.isTouched = false;
        this.context = context;
        this.knob = new JoyStickKnob(this.x, this.y, this.radius * 0.35, this.context);

    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "grey";
        this.context.fill();
        this.context.stroke();
        this.knob.draw();
    }

    resetJoystickKnob() {
        this.knob.x = this.x;
        this.knob.y = this.y;
        this.isTouched = false;
    }

    getAngleOfKnob() {
        let xDif = this.knob.x - this.x;
        let yDif = this.knob.y - this.y;

        let alpha = 0;

        let hypothenuse = Math.sqrt(xDif ** 2 + yDif ** 2);

        if (hypothenuse === 0)
            return 0;

        if (xDif < 0) {
            alpha = Math.asin(yDif / hypothenuse);
        } else {
            alpha = Math.PI - Math.asin(yDif / hypothenuse);
        }
        return alpha + Math.PI / 2;
    }

    // get Coordinates of knob if knob is too far away take it to the maximum of joystick radius
    getKnobDelta() {
        let deltaX = this.knob.x - this.x;
        let deltaY = this.knob.y - this.y;

        return { deltaX, deltaY };
    }
}