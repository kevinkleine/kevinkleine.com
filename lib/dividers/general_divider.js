import Division from '../division.js';
/*
 * Factory fuction to convert an array of fractions into divider functions
 * @function
 * @param {number[]} fractions
 * @returns {Function}
 */

const makeDivider = (fractions,posVarName,lengthVarName) => 
    function divide(d, leftTopBias) {
        //console.log('division', d)
        const createdDivisions = [];

        for (let [index, fraction] of fractions.entries()) {

            //console.log(index,fraction)

            const useOriginBias = leftTopBias && Math.random() > 0.2;
            const position = index === 0
                ? (useOriginBias ? 0 : d[posVarName])
                : createdDivisions[index - 1][posVarName] + createdDivisions[index - 1][lengthVarName];

            const newDivision = new Division({
                ...d,
                [posVarName]: position,
                [lengthVarName]: d[lengthVarName] * fraction,
            });

            createdDivisions.push(newDivision);
        }
        //console.log(createdDivisions);
        return createdDivisions;
    }


export const makeHorizontalDivider = fractions => 
    makeDivider(fractions, 'left', 'width');

export const makeVerticalDivider = fractions =>
    makeDivider(fractions, 'top', 'height');
