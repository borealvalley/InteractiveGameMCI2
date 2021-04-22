import { Cannon } from "./cannon.js"
import { Joystick } from "./joystick.js";
import { Projectile } from "./projectile.js";

function Init() {


    let canvas = <HTMLCanvasElement>document.getElementById("canvas");

    // Initialize document
    canvas.height = 800;
    canvas.width = window.innerWidth;

    let context = <CanvasRenderingContext2D>canvas.getContext("2d");
    let cannon = new Cannon(100, 100, "#FFF", context);
    let joystick1 = new Joystick(canvas.width * 0.15, canvas.height * 0.90, 30, context);
    let joystick2 = new Joystick(canvas.width * 0.85, canvas.height * 0.90, 30, context);
    let score = 0;

    let shotTimer: number = Date.now();
    let ongoingTouches: Touch[] = [];
    let ongoingProjectiles: Projectile[] = [];

    console.log("Game is initialized");
    // game loop
    function loop() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        // CANNON SECTION
        if (joystick2.getAngleOfKnob() != 0) {
            cannon.alpha = joystick2.getAngleOfKnob();
        }
        cannon.draw();

        let decodedJoyStick1 = decodeJoyStickKnobToMultiplicator(joystick1);
        if (decodedJoyStick1 != undefined) {
            cannon.move(cannon.x + cannon.speedX * decodedJoyStick1.decodedX, cannon.y + cannon.speedY * decodedJoyStick1.decodedY);
        }
        if (joystick2.isTouched == true && Date.now() - shotTimer >= cannon.shotFrequency) {
            cannon.shoot(ongoingProjectiles, joystick2);
            shotTimer = Date.now();
        }
        // JOYSTICK SECTION
        joystick1.draw();
        joystick2.draw();

        // PROJECTILE SECTION
        for (let i = 0; i < ongoingProjectiles.length; i++) {
            let projectile = ongoingProjectiles[i];
            projectile.move(projectile.x + projectile.xSpeed, projectile.y + projectile.ySpeed);
            if(projectile.x > canvas.width || projectile.x < 0 || projectile.y > canvas.height || projectile.y < 0)
                ongoingProjectiles.splice(i,1);
            projectile.draw();
        }
    }

    // wait for browser
    function animate() {
        loop();

        window.requestAnimationFrame(animate);
    }

    function setFingers(touches: TouchList) {
        for (let t = 0; t < touches.length; t++) {


            let touch = touches.item(t);

            if (touch != null) {
                ongoingTouches.push(touch);
                if (checkIfOnKnobJoystick(joystick1, touch)) {
                    joystick1.knob.move(touch.pageX, touch.pageY);
                    joystick1.isTouched = true;
                }
                if (checkIfOnKnobJoystick(joystick2, touch)) {
                    joystick2.knob.move(touch.pageX, touch.pageY);
                    joystick2.isTouched = true;
                }
            }
        }
    }

    function moveFingers(touches: TouchList) {
        for (let t = 0; t < touches.length; t++) {

            let touch = touches.item(t);

            if (touch != null) {
                if (touch.pageX < canvas.width / 2 - 10) {
                    joystick1.knob.move(touch.pageX, touch.pageY);
                    if (joystick1.knob.x > canvas.width / 2 - 10 || joystick1.knob.y < canvas.height / 2)
                        joystick1.resetJoystickKnob();
                } if (touch.pageX > canvas.width / 2 + 10) {
                    joystick2.knob.move(touch.pageX, touch.pageY);
                    if (joystick2.knob.x < canvas.width / 2 + 10 || joystick2.knob.y < canvas.height / 2)
                        joystick2.resetJoystickKnob();
                }
            }
        }
    }

    function rmFingers(touches: TouchList) {
        for (let t = 0; t < touches.length; t++) {

            let touch = touches.item(t);
            if (touch != null) {
                if (touch.pageX < canvas.width / 2) {
                    joystick1.resetJoystickKnob();
                } if (touch.pageX > canvas.width / 2) {
                    joystick2.resetJoystickKnob();
                }
                ongoingTouches.splice(t, 1);

            }
        }
    }

    canvas.addEventListener("touchstart", (evt) => {
        evt.preventDefault();
        setFingers(evt.changedTouches)
    }, true);


    canvas.addEventListener("touchmove", (evt) => {
        evt.preventDefault();
        moveFingers(evt.changedTouches);
    }, true);

    canvas.addEventListener("touchend", (evt) => {
        evt.preventDefault();
        rmFingers(evt.changedTouches);
    }, true);

    animate();

    // check if touch is on knobstick
    function checkIfOnKnobJoystick(joystick: Joystick, touch: any) {
        if (Math.sqrt((touch.pageX - joystick.knob.x) * (touch.pageX - joystick.knob.x) + (touch.pageY - joystick.knob.y) * (touch.pageY - joystick.knob.y)) < joystick.knob.radius) { // check if touch was in joystick
            console.log("touched!");
            return true;
        }

        return false;
    }

    // decode difference of x and y coordinates to a number between -1 and 1
    function decodeJoyStickKnobToMultiplicator(joystick: Joystick) {
        let delta = joystick.getKnobDelta();

        let decodedX = delta.deltaX * (1 / joystick.radius);
        let decodedY = delta.deltaY * (1 / joystick.radius);

        if (decodedX >= 1) {
            decodedX = 1;
        } else if (decodedX < -1) {
            decodedX = -1;
        }

        if (decodedY >= 1) {
            decodedY = 1;
        } else if (decodedY < -1) {
            decodedY = -1;
        }


        return { decodedX, decodedY };
    }

}

window.onload = Init;