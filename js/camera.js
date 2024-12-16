class Camera {
    constructor() {
        this.aspectRatio = 1;
        this.canvas = null;
        this.width = 0;
        this.height = 0;
        this.pixel00Location = new Vec3(0, 0, 0);
        this.pixelDeltaU = new Vec3(0, 0, 0);
        this.pixelDeltaV = new Vec3(0, 0, 0);
        this.imageData = null;
        this.cameraCenter = new Vec3(0, 0, 0);
        this.context = null;
        this.samplesPerPixel = 10.0;
        this.pixelSamplesScale = 1.0 / this.samplesPerPixel;
        this.maxDepth = 10;
    }

    initialize() {
        this.aspectRatio = 16.0 / 9.0;
        this.canvas = document.getElementById("canvas");
        this.width = this.canvas.width;
        this.height = Math.max(Math.floor(this.width / this.aspectRatio), 1);

        this.context = this.canvas.getContext("2d");
        this.imageData = this.context.createImageData(this.width, this.height);

        const viewportHeight = 2.0;
        const viewportWidth = viewportHeight * (this.width / this.height);

        // Camera
        const focalLength = 1.0;
        this.cameraCenter = new Vec3(0, 0, 0);

        const viewportU = new Vec3(viewportWidth, 0, 0);
        const viewportV = new Vec3(0, -viewportHeight, 0);

        this.pixelDeltaU = viewportU.divide(this.width);
        this.pixelDeltaV = viewportV.divide(this.height);

        const viewportUpperLeft = this.cameraCenter.minus(new Vec3(0, 0, focalLength)).minus(viewportU.divide(2)).minus(viewportV.divide(2));
        this.pixel00Location = viewportUpperLeft.add((this.pixelDeltaU.add(this.pixelDeltaV).multiply(0.5)));
    }

    render(world) {
        this.initialize();

        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                let pixelColor = new Color(0, 0, 0);

                for (let i = 0; i < this.samplesPerPixel; i++) {
                    const ray = this.getRay(w, h);
                    pixelColor = pixelColor.add(this.getColor(ray, world, this.maxDepth));
                }
                this.setPixel(this.imageData, w, h, pixelColor.r * this.pixelSamplesScale, pixelColor.g * this.pixelSamplesScale, pixelColor.b * this.pixelSamplesScale, 1);
            }
        }

        this.context.putImageData(this.imageData, 0, 0)
    }

    getColor(ray, world, depth) {

        if (depth < 0) {
            return new Color(0, 0, 0);
        }

        let record = new HitRecord();
        let hitAnything = false;
        let closest = 100000;

        for (let i = 0; i < world.length; i++) {
            if (world[i].hit(ray, 0.001, closest, record)) {
                hitAnything = true;
                closest = record.t;
            }
        }

        if (!hitAnything) {
            const normalize = ray.direction.normalize();
            const a = 0.5 * normalize.y + 1.0;
            return new Color(1.0, 1.0, 1.0).multiply((1.0 - a)).add(new Color(0.5, 0.7, 1.0).multiply(a));
        }

        let scattered = new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
        let attenuation = new Color(0, 0, 0);
        
        var result = record.material.scatter(ray, record, attenuation, scattered);
        if (result.scatter) {
            return this.getColor(result.scattered, world, depth - 1).multiplyColor(result.attenuation);
        }

        return new Color(0, 0, 0);
    }

    getRay(w, h) {
        const offset = this.getSampleSquare();
        const u = this.pixelDeltaU.multiply(offset.x + w);
        const v = this.pixelDeltaV.multiply(offset.y + h);
        const pixelSample = this.pixel00Location.add(u.add(v));
        const origin = this.cameraCenter;
        const direction = pixelSample.minus(origin);

        return new Ray(origin, direction);
    }

    getSampleSquare() {
        return new Vec3(random() - 0.5, random() - 0.5, 0);
    }

    setPixel(imageData, x, y, r, g, b, a) {
        const index = 4 * (x + y * imageData.width);

        const rGamma = this.linearToGamma(r);
        const gGamma = this.linearToGamma(g);
        const bGamma = this.linearToGamma(b);

        imageData.data[index + 0] = rGamma * 255;
        imageData.data[index + 1] = gGamma * 255;
        imageData.data[index + 2] = bGamma * 255;
        imageData.data[index + 3] = a * 255;
    }

    linearToGamma(linear) {
        if (linear > 0) {
            return Math.sqrt(linear);
        }

        return 0;
    }
}