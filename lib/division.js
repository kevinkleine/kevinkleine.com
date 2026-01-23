class Division {
    constructor({ left = 0, top = 0, width = 1, height = 1, divisionStep = 0, index = 0 }) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.divisionStep = divisionStep;
        this.index = index;
        this.area = this.width * this.height;
    }
}

export default Division;
