//import Filler from './filler.js';

class SolidColor {
    constructor(color) {
        this.color = color;
    }

    draw({canvas, division, color}) {

        const colorString = `rgba(${color[0]},${color[1]},${color[2]},1)`;

        const ctx = canvas.getContext('2d');

        ctx.fillStyle = colorString || this.color;
        ctx.fillRect(
            canvas.width * division.left,
            canvas.height * division.top,
            canvas.width * division.width,
            canvas.height * division.height,
        );
    }
}

export default SolidColor;
