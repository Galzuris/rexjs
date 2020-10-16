class RexJS {
    constructor(canvas) {
        this.keys = [];
        this.canvas = canvas;
        this.mainCtx = canvas.getContext('2d');
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        canvas.width = this.width;
        canvas.height = this.height;

        this.bufferCanvas = document.createElement('canvas');
        this.bufferCanvas.width = canvas.width;
        this.bufferCanvas.height = canvas.height;
        this.ctx = this.bufferCanvas.getContext('2d');

        this.updateFunction = null;
        this.inputFunction = null;
        this.clearColor = '#000000';
        this.ctx.lineWidth = 1;

        this.startupTime = new Date();
        this.currentTime = new Date();
        this.deltaTime = 0;

        let context = this;
        this.drawLoop = setInterval(() => {
            let last = context.currentTime;
            context.currentTime = new Date();
            context.deltaTime = (context.currentTime.getTime() - last.getTime()) / 1000;

            if (context.updateFunction) {
                context.updateFunction();
            }
        }, 5);

        document.addEventListener('keydown', (e) => {
            let oldValue = context.keys[e.code] ?? false;
            context.keys[e.code] = true;
            if (!oldValue) {
                if (context.inputFunction) {
                    context.inputFunction(e.code.substr(3), 'down');
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            let oldValue = context.keys[e.code] ?? true;
            context.keys[e.code] = false;
            if (oldValue) {
                if (context.inputFunction) {
                    context.inputFunction(e.code.substr(3), 'up');
                }
            }
        })
    }

    getDrawContext() {
        return this.ctx;
    }

    getTimeDelta() {
        return this.deltaTime;
    }

    setUpdateFunction(f) {
        this.updateFunction = f;
    }

    setInputFunction(f) {
        this.inputFunction = f;
    }

    setColor(color) {
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
    }

    fillRect(x, y, w, h) {
        this.ctx.fillRect(x, y, w, h);
    }

    drawRect(x, y, w, h) {
        this.ctx.strokeRect(x, y, w, h);
    }

    keyPressed(code) {
        return this.keys['Key' + code] ?? false;
    }

    clear() {
        let fs = this.ctx.fillStyle;
        let ss = this.ctx.strokeStyle;
        this.setColor(this.clearColor);
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = fs;
        this.ctx.strokeStyle = ss;
    }

    clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    repaint() {
        this.mainCtx.drawImage(this.bufferCanvas, 0, 0);
    }
}

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addVector(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    multiply(number) {
        return new Vector2(this.x * number, this.y * number);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalized() {
        let m = this.magnitude();
        if (m === 0) {
            return this;
        } else {
            return new Vector2(this.x / m, this.y / m);
        }
    }
}