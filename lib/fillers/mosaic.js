class Mosaic {
    constructor(tileSize = 20, gapSize = 2, irregularity = 0.3) {
        this.tileSize = tileSize;
        this.gapSize = gapSize;
        this.irregularity = irregularity;
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

        // Grout background (dark gray)
        ctx.fillStyle = `rgba(40,35,30,1)`;
        ctx.fillRect(x, y, w, h);

        const tileW = this.tileSize;
        const tileH = this.tileSize;
        const gap = this.gapSize;
        const irreg = this.irregularity;

        // Draw tiles
        for (let ty = y - tileH; ty < y + h + tileH; ty += tileH + gap) {
            // Offset alternating rows for brick-like pattern
            const rowOffset = (Math.floor((ty - y) / (tileH + gap)) % 2) * (tileW / 2);
            
            for (let tx = x - tileW + rowOffset; tx < x + w + tileW; tx += tileW + gap) {
                // Random variation in tile position
                const offsetX = (Math.random() - 0.5) * tileW * irreg * 0.3;
                const offsetY = (Math.random() - 0.5) * tileH * irreg * 0.3;
                
                // Random variation in tile size
                const sizeVar = 1 - Math.random() * irreg * 0.2;
                const tw = tileW * sizeVar;
                const th = tileH * sizeVar;
                
                // Color variation for each tile
                const colorVar = 0.7 + Math.random() * 0.5;
                const tileColor = [
                    Math.min(255, color[0] * colorVar),
                    Math.min(255, color[1] * colorVar),
                    Math.min(255, color[2] * colorVar)
                ];
                
                // Slight rotation for irregularity
                ctx.save();
                ctx.translate(tx + offsetX + tw/2, ty + offsetY + th/2);
                ctx.rotate((Math.random() - 0.5) * irreg * 0.15);
                
                // Draw tile with slight rounded corners
                ctx.fillStyle = `rgba(${tileColor[0]},${tileColor[1]},${tileColor[2]},1)`;
                this.roundRect(ctx, -tw/2, -th/2, tw, th, 2);
                ctx.fill();
                
                // Add subtle highlight on top-left edge
                ctx.fillStyle = `rgba(255,255,255,0.15)`;
                ctx.fillRect(-tw/2, -th/2, tw, 2);
                ctx.fillRect(-tw/2, -th/2, 2, th);
                
                // Add subtle shadow on bottom-right edge
                ctx.fillStyle = `rgba(0,0,0,0.2)`;
                ctx.fillRect(-tw/2, th/2 - 2, tw, 2);
                ctx.fillRect(tw/2 - 2, -th/2, 2, th);
                
                ctx.restore();
            }
        }

        ctx.restore();
    }

    roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }
}

export default Mosaic;
