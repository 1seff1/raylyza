class Lambertian {
    constructor(albedo) {
        this.albedo = albedo;
    }

    scatter(rayIn, hitRecord, attenuation, scattered) {
        let scatterDirection = hitRecord.normal.add(randomUnitVector());

        if (scatterDirection.nearZero()) {
            scatterDirection = hitRecord.normal;
        }

        scattered = new Ray(hitRecord.p, scatterDirection);
        attenuation = this.albedo;
        
        return {
            scatter: true,
            scattered: scattered,
            attenuation: attenuation
        }
    }
}

class Metal {
    constructor(albedo, fuzz) {
        this.albedo = albedo;
        this.fuzz = fuzz;
    }

    scatter(rayIn, hitRecord, attenuation, scattered) {
        let reflected = rayIn.direction.reflect(hitRecord.normal);
        reflected = reflected.normalize().add(randomUnitVector().multiply(this.fuzz));
        scattered = new Ray(hitRecord.p, reflected);
        attenuation = this.albedo;
        
        return {
            scatter: scattered.direction.dot(hitRecord.normal) > 0,
            scattered: scattered,
            attenuation: attenuation
        }
    }
}