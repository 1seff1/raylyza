class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    pointAt(t) {
        const inTimeT = this.direction.multiply(t);
        return this.origin.add(inTimeT);
    }
}