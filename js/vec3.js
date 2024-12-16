class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector) {
        return new Vec3(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z);
    }

    minus(vector) {
        return new Vec3(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z);
    }

    multiply(scalar) {
        return new Vec3(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar);
    }

    divide(scalar) {
        return new Vec3(
            this.x / scalar,
            this.y / scalar,
            this.z / scalar);
    }

    length() {
        return Math.sqrt(this.lengthSquared());
    }

    lengthSquared() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    normalize() {
        const length = this.length();
        return this.divide(length);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector) {
        return new Vec3(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y - vector.x,
            
        );
    }

    nearZero() {
        const s = 1e-8;
        return Math.abs(this.x) < s && Math.abs(this.y) < s && Math.abs(this.z) < s;
    }

    reflect(n) {
        return this.minus(n.multiply(2 * this.dot(n)));
    }

}