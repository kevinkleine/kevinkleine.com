class Waves {
    constructor(amplitude = 15, frequency = 0.03, layers = 8) {
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.layers = layers;
    }

    draw({ canvas, division, color }) {
        const ctx = canvas.getContext('2d');

        const x = canvas.width * division.left;
        const y = canvas.height * division.top;
        const w = canvas.width * division.width;
        const h = canvas.height * division.height;

        // Clip to division
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        // Dark background
        ctx.fillStyle = `rgba(${color[0] * 0.15},${color[1] * 0.15},${color[2] * 0.15},1)`;
        ctx.fillRect(x, y, w, h);

        const waveSpacing = h / this.layers;
        const phaseOffset = Math.random() * Math.PI * 2;

        // Draw wave layers from back to front
        for (let layer = 0; layer < this.layers; layer++) {
            const layerRatio = layer / this.layers;
            const baseY = y + layer * waveSpacing + waveSpacing * 0.5;
            
            // Color gets brighter toward front
            const brightness = 0.3 + layerRatio * 0.7;
            const alpha = 0.6 + layerRatio * 0.4;
            
            ctx.fillStyle = `rgba(${color[0] * brightness},${color[1] * brightness},${color[2] * brightness},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(x - 10, y + h + 10);

            // Draw wave path
            const amp = this.amplitude * (0.5 + layerRatio * 0.5);
            const freq = this.frequency * (1 + layer * 0.1);
            const phase = phaseOffset + layer * 0.8;

            for (let px = x - 10; px <= x + w + 10; px += 3) {
                const waveY = baseY + Math.sin(px * freq + phase) * amp;
                ctx.lineTo(px, waveY);
            }

            ctx.lineTo(x + w + 10, y + h + 10);
            ctx.closePath();
            ctx.fill();
        }

        // Add some foam/highlight on top waves
        ctx.fillStyle = `rgba(255,255,255,0.3)`;
        for (let i = 0; i < 3; i++) {
            const topLayer = this.layers - 1 - i;
            const baseY = y + topLayer * waveSpacing + waveSpacing * 0.5;
            const amp = this.amplitude * (0.5 + (topLayer / this.layers) * 0.5);
            const freq = this.frequency * (1 + topLayer * 0.1);
            const phase = phaseOffset + topLayer * 0.8;

            for (let px = x; px < x + w; px += 20 + Math.random() * 30) {
                const waveY = baseY + Math.sin(px * freq + phase) * amp;
                ctx.beginPath();
                ctx.arc(px, waveY - 2, 2 + Math.random() * 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }
}

export default Waves;
