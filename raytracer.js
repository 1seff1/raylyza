const world = [
    new Sphere(new Vec3(0.0, 0.0, -1.0), 0.5),
    new Sphere(new Vec3(0.0, -100.5, -1.0), 100.0)
];

const camera = new Camera();

camera.render(world);