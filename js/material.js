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
    constructor(albedo) {
        this.albedo = albedo;
    }

    scatter(rayIn, hitRecord, attenuation, scattered) {
        const reflected = rayIn.direction.reflect(hitRecord.normal);
        scattered = new Ray(hitRecord.p, reflected);
        attenuation = this.albedo;
        
        return {
            scatter: true,
            scattered: scattered,
            attenuation: attenuation
        }
    }
}