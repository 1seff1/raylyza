class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        new Vec2(
        this.x + vector.x,
        this.y + vector.y);
    }

    minus(vector) {
        return new Vec2(
            this.x - vector.x,
            this.y - vector.y);
    }

    multiply(scalar)
    {
        return new Vec2(
            this.x * scalar,
            this.y * scalar);
    }

    divide(scalar)
    {
        return new Vec2(
            this.x / scalar,
            this.y / scalar);
    }

    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize() {
        const length = this.length();
        return this.divide(length);
    }
}