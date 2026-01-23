class Concentric {
    constructor(rings = 12, style = 'circle') {
        this.rings = rings;
        this.style = style; // 'circle' or 'rectangle'
    }

    draw({ canvas, division, color }) {
        const ctx = canvas.getContext('2d');

        const x = canvas.width * division.left;
        const y = canvas.height * division.top;
        const w = canvas.width * division.width;
        const h = canvas.height * division.height;

        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const maxRadius = Math.max(w, h) * 0.7;

        // Clip to division bounds
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        // Fill background
        ctx.fillStyle = `rgba(${color[0] * 0.2},${color[1] * 0.2},${color[2] * 0.2},1)`;
        ctx.fillRect(x, y, w, h);

        // Draw concentric shapes from outside in
        for (let i = this.rings; i >= 0; i--) {
            const ratio = i / this.rings;
            const radius = maxRadius * ratio;

            // Alternate between color variations
            const brightness = i % 2 === 0 ? 1 : 0.6;
            const alpha = 0.8 + (1 - ratio) * 0.2;

            const ringColor = [
                Math.min(255, color[0] * brightness),
                Math.min(255, color[1] * brightness),
                Math.min(255, color[2] * brightness)
            ];

            ctx.fillStyle = `rgba(${ringColor[0]},${ringColor[1]},${ringColor[2]},${alpha})`;

            if (this.style === 'circle') {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Rectangle mode - draw rotated squares
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate((i * Math.PI) / 12);
                ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
                ctx.restore();
            }
        }

        // Add a highlight dot in the center
        const highlightColor = [
            Math.min(255, color[0] + 100),
            Math.min(255, color[1] + 100),
            Math.min(255, color[2] + 100)
        ];
        ctx.fillStyle = `rgba(${highlightColor[0]},${highlightColor[1]},${highlightColor[2]},0.9)`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * 0.05, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

export default Concentric;
