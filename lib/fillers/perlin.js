import noise from '../noise_generator.js';
const perlinFactor = 0.8; //0.019;
const color = [ 219, 120, 34 ];

noise.seed(Math.random());

class PerlinNoise {

    constructor() {}

    draw({canvas, division, color}) {

        const colorString = `rgba(${color[0]},${color[1]},${color[2]},1)`;

        const ctx = canvas.getContext('2d');
        const threshold = 0.5;
        //const color = [ 255, 255, 255 ];
        for ( let x = 0; x < canvas.width * division.width; x+=1) {
            for ( let y = 0; y < canvas.height * division.height; y+=1) {
                const noiseValA = noise.perlin2(perlinFactor * 1 * ( x + division.left * canvas.width ), perlinFactor * 1 *  ( y + division.top * canvas.height));
                //console.log(x,y,noiseValA)
                const noiseVal = noiseValA > threshold ? 1 : 0;
                const fillColor = [ color[ 0 ] * noiseVal , color[ 1 ] * noiseVal, color[ 2 ] * noiseVal];

                ctx.fillStyle = `rgba(${fillColor[0]},${fillColor[1]},${fillColor[2]},1)`;
                ctx.fillRect(
                    x + division.left * canvas.width,
                    y + division.top * canvas.height,
                    1,
                    1,
                );
            }		
        }
    } 
}

export default PerlinNoise;
