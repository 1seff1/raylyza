function random() {
    return Math.random();
}

function randomInterval(min, max) {
    return min + (max - min) * Math.random();
}

function degreesToRandians(degrees) {
    return degrees * Math.PI / 180.0;
}

function randomVec3() {
    return new Vec3(random(), random(), random());
}

function randomVec3(min, max) {
    return new Vec3(random(min, max), random(min, max), random(min, max));
}

function randomUnitVector() {
    while (true) {
        const p = randomVec3(-1, 1);
        var len = p.lengthSquared();

        if (1e-160 < len && len <= 1) {
            return p.divide(Math.sqrt(len));
        }
    }
}

function randomOnHemisphere(normal) {
    const onUnitSphere = randomUnitVector();

    if (onUnitSphere.dot(normal) > 0.0) { // in the same hemisphere as the normal
        return onUnitSphere;
    }

    return onUnitSphere.multiply(-1.0);
}