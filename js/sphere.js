class Sphere {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    hit(ray, tMin, tMax, hitRecord) {
        const sphereCenter = this.center.minus(ray.origin);
        const a = ray.direction.lengthSquared();
        const h = ray.direction.dot(sphereCenter);
        const c = sphereCenter.lengthSquared() - this.radius ** 2;
        const discriminant = h ** 2 - a * c;

        if (discriminant < 0) {
            return false;
        }

        var sqrtd = Math.sqrt(discriminant);

        let root = (h - sqrtd) / a;

        if (root <= tMin || tMax <= root) {
            root = (h + sqrtd) / a;

            if (root <= tMin || tMax <= root) {
                return false;
            }
        }

        hitRecord.t = root;
        hitRecord.p = ray.pointAt(hitRecord.t);
        const outwardNormal = hitRecord.p.minus(this.center).divide(this.radius);
        hitRecord.setFaceNormal(ray, outwardNormal);

        return true;
    }
}