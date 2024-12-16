class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    add(color) {
        return new Color(this.r + color.r,
            this.g + color.g,
            this.b + color.b);
    }

    multiply(scalar) {
        return new Color(
            this.r * scalar,
            this.g * scalar,
            this.b * scalar);
    }

    divide(scalar) {
        return new Color(
            this.r / scalar,
            this.g / scalar,
            this.b / scalar);
    }

    multiplyColor(color) {
        return new Color(
            this.r * color.r,
            this.g * color.g,
            this.b * color.b
        );
    }

    clamp() {
        this.r = Math.max(0, Math.min(this.r, 1));
        this.g = Math.max(0, Math.min(this.g, 1));
        this.b = Math.max(0, Math.min(this.b, 1));
    }
}