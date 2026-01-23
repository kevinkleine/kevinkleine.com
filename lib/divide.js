import Division from './division.js';

/**
 * @param {Object} settings
 * @param {Function[]} dividers
 * @param {number} steps
 */

const divide = ({dividers, steps = 5, rand, leftTopBias}) => {

    // start with main division: the entire painting
    let divisions = [
        new Division({
            left: 0,
            width: 1,
            top: 0,
            height: 1,
            divisionStep : 0
        })
    ];

    for ( let step = 0; step < steps; step += 1 ) {

        //console.log('step', step);

        let stepDivisions = [];

        for( let division of divisions ) {
            const divider = dividers[ rand.random_int( 0, dividers.length - 1 ) ];
            const newDivisions =  divider.fn(division, leftTopBias);
            newDivisions.forEach( nd => nd.step = step + 1 );
            stepDivisions = [ ...newDivisions, ...stepDivisions ];
        }

        divisions = [ ...divisions, ...stepDivisions ];
    }

    divisions.forEach( (nd, i) => nd.index = i );

    return divisions; 
}

export default divide;
