const padFactor = 5;

let dim = {};

function a() {}

const setDimensions = (target) => {
    target.outerSquare = Math.min(window.innerWidth, window.innerHeight);
    const pad = target.outerSquare * 0.05;
    target.innerPos = {
        width: target.outerSquare / phi,
        left: pad,
        top: pad,
        bottom: pad
    };
    return target;
};

function setup() {
    let height = 850;
    let width = 1200;
    // setDimensions(dim);
    // createCanvas(dim.outerSquare, dim.outerSquare);
    createCanvas(width, height);
    console.log('hoi')
    noLoop();
};

const perlinFactor = 0.019;
const color = [ 219, 120, 34 ];


function draw() {
    background(219, 130, 34);
    noStroke();
    let x, xd;
    const threshold = 0.7;
    for ( x = 0; x < width; x+=1) {
		for (var y = 0; y < height; y+=1) {
			const noiseValA = noise(perlinFactor * x / 3, perlinFactor * y);
            //console.log(noiseValA)
            const noiseVal = noiseValA > threshold ? noiseValA : 0.6 - noiseValA / 15;
            const fillColor = [ color[ 0 ] * noiseVal , color[ 1 ] * noiseVal, color[ 2  ]];
            fill(...fillColor);
            rect(x, y, 1, 1);
        }		
    }
    return;
    const bgLinePath = Array(width).fill(0).map((i,n) => noise(n * 0.01));
    for ( let y = 0 ; y < height ; y += 10  ) {
        for (  x = 0 ; x < height ; x += 10  ) {
            fill(255,255,255,200);
            circle( x,y + y * bgLinePath[x],1);
        }
    }
    return;
    
    let xp = height - height / ((1 + Math.sqrt(5)) / 2) - 50;
    let xdp = 0;
    let dt = 0.001;
    let m = 0.05;
    // for (let i = 0; i < width - 100; i++) {
    //     let yt = i;
    //     //   let xt = 100 * Math.sin(0.01 * i) + 500;
    //     let xt = abs((i % 200) - 100) - 50 + height - height / ((1 + Math.sqrt(5)) / 2);
    //     fill(2550);
    //     stroke(2550);
    //     circle(yt + 50, xt, 4);
    // }
    xt = createPath(width, 200);
    fill(2550);
    stroke(2550);
    for (let i = 0; i < width - 100; i++) {
        circle(i + 50, xt[i], 4);
    }

     [x, xd] = createStroke(xt, xp, xdp, dt, m, 3000, 1, .8, 5);
    fill(0);
    stroke(0);
    for (let i = 0; i < width - 100; i++) {
        circle(i + 50, x[i], Math.max(0.01, 15 - 0.1 * Math.sqrt(Math.abs(xd[i]))));
    }
}

function createPath(N, _height) {
    let x = []
    for (let i = 0; i < N; i++) {
        x[i] = abs((i % _height) - _height / 2) - _height / 2 + height / 3;
    }
    return x
}

function createArray(N) {
    let x = []
    for (let i = 0; i < N; i++) {
        x[i] = i;
    }
    return x
}

function createStroke(xt, xstart, xdstart, dt, m, Fmax, kp, ki, kd) {
    let ei = 0;
    let e = [0];
    let xd = [xdstart];
    let x = [xstart];
    for (let i = 1; i < xt.length; i++) {
        e[i] = xt[i] - x[i - 1];
        ei = ei + e[i];
        let u = kp * (e[i]) + kd * (e[i] - e[i - 1]) / dt + ki * ei;
        // limit force
        u = Math.sign(u) * Math.min(abs(u), Fmax);
        //     velocity state
        xd[i] = xd[i - 1] + u * dt / m;
        //     position state
        x[i] = x[i - 1] + dt * xd[i - 1];
    }

    return [x, xd]
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
