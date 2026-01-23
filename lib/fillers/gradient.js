class Gradient {
    constructor() {}

    draw({ canvas, division, color }) {
        const ctx = canvas.getContext('2d');

        const x = canvas.width * division.left;
        const y = canvas.height * division.top;
        const w = canvas.width * division.width;
        const h = canvas.height * division.height;

        // Create diagonal gradient from corner to corner
        const gradient = ctx.createLinearGradient(x, y, x + w, y + h);

        // Main color at start
        gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},1)`);
        
        // Darker midpoint
        const midColor = [
            Math.max(0, color[0] * 0.6),
            Math.max(0, color[1] * 0.6),
            Math.max(0, color[2] * 0.6)
        ];
        gradient.addColorStop(0.5, `rgba(${midColor[0]},${midColor[1]},${midColor[2]},0.9)`);
        
        // Lighter end with hue shift
        const endColor = [
            Math.min(255, color[0] * 1.2 + 30),
            Math.min(255, color[1] * 0.9),
            Math.min(255, color[2] * 1.1 + 20)
        ];
        gradient.addColorStop(1, `rgba(${endColor[0]},${endColor[1]},${endColor[2]},1)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);
    }
}

export default Gradient;
