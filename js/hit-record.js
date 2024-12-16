class HitRecord {
    constructor(p, t) {
        this.p = p;
        this.t = t;
        this.normal = new Vec3(0, 0, 0);
        this.material = null;
        this.frontFace = false;
    }

    pointAt(t) {
        const inTimeT = this.direction.multiply(t);
        return this.origin.add(inTimeT);
    }

    setFaceNormal(ray, outwardNormal) {
        this.frontFace = ray.direction.dot(outwardNormal) < 0;
        this.normal = this.frontFace ? outwardNormal : outwardNormal.multiply(-1.0);
    }
}