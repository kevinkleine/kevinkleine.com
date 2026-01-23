class Marker {
    constructor(strokeWidth = 8, messiness = 0.6) {
        this.strokeWidth = strokeWidth;
        this.messiness = messiness; // 0-1, how wobbly/imperfect
    }

    draw({ canvas, division, color }) {
        const ctx = canvas.getContext('2d');

        const x = canvas.width * division.left;
        const y = canvas.height * division.top;
        const w = canvas.width * division.width;
        const h = canvas.height * division.height;

        // Clip to division bounds
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        // Light background (paper)
        ctx.fillStyle = `rgba(${Math.min(255, color[0] + 120)},${Math.min(255, color[1] + 120)},${Math.min(255, color[2] + 120)},0.3)`;
        ctx.fillRect(x, y, w, h);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const strokeW = this.strokeWidth * (1 + Math.random() * 0.3);
        const spacing = strokeW * 0.7;
        const messiness = this.messiness;

        // Random angle for stroke direction (0 = horizontal, PI/2 = vertical)
        const angle = Math.random() * Math.PI;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Calculate bounds for the rotated fill
        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const diagonal = Math.sqrt(w * w + h * h);

        // Draw continuous back-and-forth path like actually coloring with a marker
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},0.5)`;
        ctx.lineWidth = strokeW;

        let isFirstPoint = true;
        let goingForward = true;
        let lastX, lastY;

        for (let offset = -diagonal / 2 - strokeW; offset < diagonal / 2 + strokeW; offset += spacing) {
            const rowOffset = (Math.random() - 0.5) * messiness * strokeW * 0.5;
            const perpOffset = offset + rowOffset;
            
            // Start and end points along the stroke direction
            const startDist = -diagonal / 2 - strokeW * 0.5 + (Math.random() - 0.5) * strokeW * messiness;
            const endDist = diagonal / 2 + strokeW * 0.5 + (Math.random() - 0.5) * strokeW * messiness;

            // Convert to canvas coordinates
            const startX = centerX + cos * startDist - sin * perpOffset;
            const startY = centerY + sin * startDist + cos * perpOffset;
            const endX = centerX + cos * endDist - sin * perpOffset;
            const endY = centerY + sin * endDist + cos * perpOffset;

            if (goingForward) {
                if (isFirstPoint) {
                    ctx.moveTo(startX, startY);
                    isFirstPoint = false;
                } else {
                    // Curved transition from previous row
                    ctx.quadraticCurveTo(lastX, lastY, startX, startY);
                }
                
                // Wobbly line across
                this.addWobblySegment(ctx, startX, startY, endX, endY, strokeW, messiness);
                lastX = endX;
                lastY = endY;
            } else {
                ctx.quadraticCurveTo(lastX, lastY, endX, endY);
                
                // Wobbly line across (backwards)
                this.addWobblySegment(ctx, endX, endY, startX, startY, strokeW, messiness);
                lastX = startX;
                lastY = startY;
            }
            
            goingForward = !goingForward;
        }

        ctx.stroke();

        // Second pass - slightly offset for better coverage
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},0.35)`;
        ctx.lineWidth = strokeW * 0.85;

        isFirstPoint = true;
        goingForward = Math.random() > 0.5;

        for (let offset = -diagonal / 2 - strokeW + spacing * 0.4; offset < diagonal / 2 + strokeW; offset += spacing * 1.3) {
            const rowOffset = (Math.random() - 0.5) * messiness * strokeW * 0.4;
            const perpOffset = offset + rowOffset;
            
            const startDist = -diagonal / 2 - strokeW * 0.3 + (Math.random() - 0.5) * strokeW * messiness;
            const endDist = diagonal / 2 + strokeW * 0.3 + (Math.random() - 0.5) * strokeW * messiness;

            const startX = centerX + cos * startDist - sin * perpOffset;
            const startY = centerY + sin * startDist + cos * perpOffset;
            const endX = centerX + cos * endDist - sin * perpOffset;
            const endY = centerY + sin * endDist + cos * perpOffset;

            if (goingForward) {
                if (isFirstPoint) {
                    ctx.moveTo(startX, startY);
                    isFirstPoint = false;
                } else {
                    ctx.quadraticCurveTo(lastX, lastY, startX, startY);
                }
                this.addWobblySegment(ctx, startX, startY, endX, endY, strokeW, messiness * 0.7);
                lastX = endX;
                lastY = endY;
            } else {
                ctx.quadraticCurveTo(lastX, lastY, endX, endY);
                this.addWobblySegment(ctx, endX, endY, startX, startY, strokeW, messiness * 0.7);
                lastX = startX;
                lastY = startY;
            }
            
            goingForward = !goingForward;
        }

        ctx.stroke();
        ctx.restore();
    }

    addWobblySegment(ctx, x1, y1, x2, y2, strokeWidth, messiness) {
        const dist = Math.abs(x2 - x1);
        const segments = Math.max(4, Math.floor(dist / 25));
        
        for (let i = 1; i <= segments; i++) {
            const t = i / segments;
            const targetX = x1 + (x2 - x1) * t;
            const targetY = y1 + (y2 - y1) * t;
            
            // Add wobble - more vertical wobble than horizontal
            const wobbleY = (Math.random() - 0.5) * messiness * strokeWidth * 0.6;
            
            ctx.lineTo(targetX, targetY + wobbleY);
        }
    }
}

export default Marker;
