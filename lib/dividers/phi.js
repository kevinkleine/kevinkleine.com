import constants from '../constants.js';

const phi_horizontal_left = d => {

    const largePart = constants.phi * d.width;

    return [
        {
            ...d,
            width: largePart
        },
        {
            ...d,
            left: largePart,
            width: d.width - largePart
        }
    ];
};

const phi_horizontal_right = d => {

    const largePart = constants.phi * d.width;

    return [
        {
            ...d,
            width: d.width - largePart
        },
        {
            ...d,
            left: d.width - largePart,
            width: largePart
        }
    ];
};


const phi_vertical_top = d => {

    const largePart = constants.phi * d.height;

    return [
        {
            ...d,
            height: largePart
        },
        {
            ...d,
            top: largePart,
            height: d.height - largePart
        }
    ];
};

const phi_vertical_bottom = d => {

    const largePart = constants.phi * d.height;

    return [
        {
            ...d,
            height: d.height - largePart
        },
        {
            ...d,
            top: d.height - largePart,
            height: largePart
        }
    ];
};

export default {
    phi_horizontal_left,
    phi_horizontal_right,
    phi_vertical_top,
    phi_vertical_bottom
};
