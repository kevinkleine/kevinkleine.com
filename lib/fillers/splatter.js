class Splatter {
    constructor(density = 500, maxSize = 15) {
        this.density = density;
        this.maxSize = maxSize;
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

        // Light background
        ctx.fillStyle = `rgba(${Math.min(255, color[0] + 100)},${Math.min(255, color[1] + 100)},${Math.min(255, color[2] + 100)},0.2)`;
        ctx.fillRect(x, y, w, h);

        // Calculate splatter count based on area
        const area = w * h;
        const count = Math.floor((area / 10000) * this.density);

        // Create main splatters
        for (let i = 0; i < count; i++) {
            const px = x + Math.random() * w;
            const py = y + Math.random() * h;
            
            // Size follows power law (mostly small, few large)
            const size = Math.pow(Math.random(), 2.5) * this.maxSize + 1;
            
            // Color variation
            const brightness = 0.6 + Math.random() * 0.5;
            const alpha = 0.3 + Math.random() * 0.5;
            
            const dropColor = [
                Math.min(255, color[0] * brightness),
                Math.min(255, color[1] * brightness),
                Math.min(255, color[2] * brightness)
            ];

            ctx.fillStyle = `rgba(${dropColor[0]},${dropColor[1]},${dropColor[2]},${alpha})`;
            
            // Draw main drop (slightly irregular circle)
            this.drawSplat(ctx, px, py, size);
            
            // Occasionally add spray around larger drops
            if (size > this.maxSize * 0.5 && Math.random() > 0.6) {
                this.drawSpray(ctx, px, py, size, dropColor);
            }
        }

        // Add some drips from random points
        const dripCount = Math.floor(count * 0.02);
        for (let i = 0; i < dripCount; i++) {
            const px = x + Math.random() * w;
            const py = y + Math.random() * h * 0.3;
            const dripLength = 20 + Math.random() * 80;
            
            const brightness = 0.6 + Math.random() * 0.4;
            const dropColor = [
                Math.min(255, color[0] * brightness),
                Math.min(255, color[1] * brightness),
                Math.min(255, color[2] * brightness)
            ];
            
            this.drawDrip(ctx, px, py, dripLength, dropColor);
        }

        ctx.restore();
    }

    drawSplat(ctx, x, y, size) {
        ctx.beginPath();
        const points = 8 + Math.floor(Math.random() * 5);
        for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const r = size * (0.8 + Math.random() * 0.4);
            const px = x + Math.cos(angle) * r;
            const py = y + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
    }

    drawSpray(ctx, x, y, size, color) {
        const sprayCount = 5 + Math.floor(Math.random() * 10);
        for (let i = 0; i < sprayCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = size + Math.random() * size * 2;
            const spraySize = 1 + Math.random() * 3;
            
            ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${0.3 + Math.random() * 0.4})`;
            ctx.beginPath();
            ctx.arc(x + Math.cos(angle) * dist, y + Math.sin(angle) * dist, spraySize, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawDrip(ctx, x, y, length, color) {
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},0.6)`;
        ctx.lineWidth = 2 + Math.random() * 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Wobbly drip path
        let currentY = y;
        const wobble = 3;
        while (currentY < y + length) {
            currentY += 10;
            const wx = x + (Math.random() - 0.5) * wobble;
            ctx.lineTo(wx, currentY);
        }
        ctx.stroke();
        
        // Drip end bulge
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},0.7)`;
        ctx.beginPath();
        ctx.arc(x, y + length, 3 + Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default Splatter;
