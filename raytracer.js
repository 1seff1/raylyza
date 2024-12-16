const ground = new Lambertian(new Color(0.8, 0.6, 0.2));
const center = new Lambertian(new Color(0.1, 0.2, 0.5));
const left = new Metal(new Color(0.8, 0.8, 0.8));
const right = new Metal(new Color(0.8, 0.6, 0.2));

const world = [
    new Sphere(new Vec3(0.0, -100.5, -1.0), 100, ground),
    new Sphere(new Vec3(0.0, 0.0, -1.5), 0.5, center),
    new Sphere(new Vec3(-1.0, 0.0, -1.0), 0.5, left),
    new Sphere(new Vec3(1.0, 0.0, -1.0), 0.5, right),
];

const camera = new Camera();

camera.render(world);