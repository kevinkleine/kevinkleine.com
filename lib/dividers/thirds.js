const thirds_horizontal = d => {

    const newWidth = d.width / 3;

    return [
        {
            width: newWidth, 
            ...d
        },
        {
            left: d.left + newWidth,
            width: newWidth, 
            ...d
        },
        {
            ...d,
            left: d.left + newWidth * 2,
            width: newWidth
        }
    ];
};

const thirds_vertical = d => {

    const newHeight = d.height / 3;

    return [
        {
            height: newHeight, 
            ...d
        },
        {
            top: d.top + newHeight,
            height: newHeight, 
            ...d
        },
        {
            ...d,
            top: d.top + newHeight * 2,
            height: newHeight
        }
    ];
};

export default {
    thirds_horizontal,
    thirds_vertical
};
