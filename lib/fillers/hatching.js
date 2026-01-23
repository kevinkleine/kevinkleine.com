class Hatching {
    constructor(spacing = 6, lineWidth = 1.5) {
        this.spacing = spacing;
        this.lineWidth = lineWidth;
    }

    draw({ canvas, division, color }) {
        const ctx = canvas.getContext('2d');

        const x = canvas.width * division.left;
        const y = canvas.height * division.top;
        const w = canvas.width * division.width;
        const h = canvas.height * division.height;

        // Fill background with lighter version of color
        const bgColor = [
            Math.min(255, color[0] + 60),
            Math.min(255, color[1] + 60),
            Math.min(255, color[2] + 60)
        ];
        ctx.fillStyle = `rgba(${bgColor[0]},${bgColor[1]},${bgColor[2]},1)`;
        ctx.fillRect(x, y, w, h);

        // Clip to division bounds
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},0.7)`;
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = 'round';

        const diagonal = Math.sqrt(w * w + h * h);
        const spacing = this.spacing;

        // Draw diagonal lines (top-left to bottom-right)
        for (let i = -diagonal; i < diagonal * 2; i += spacing) {
            ctx.beginPath();
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i - h, y + h);
            ctx.stroke();
        }

        // Draw cross-hatching (top-right to bottom-left)
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},0.4)`;
        for (let i = -diagonal; i < diagonal * 2; i += spacing * 1.5) {
            ctx.beginPath();
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i + h, y + h);
            ctx.stroke();
        }

        ctx.restore();
    }
}

export default Hatching;
