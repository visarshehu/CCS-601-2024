import * as THREE from 'three';
import GUI from 'lil-gui'


const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

const coneGeometry = new THREE.ConeGeometry(1, 2, 16, 16);
const coneMesh = new THREE.Mesh(coneGeometry, material);
scene.add(coneMesh);
coneMesh.position.x = 2;

const gui = new GUI();

gui.add(mesh.rotation, "y").min(0).max(3).step(0.1);


const boxControls = gui.addFolder('Box controls');
const sphereControls = gui.addFolder('Sphere controls');

const coneControls = gui.addFolder('Cone Controls');
coneControls.add(coneMesh.rotation, "x")
            .min(-3)
            .max(3)
            .step(0.1);

coneControls.add(material, "wireframe");

boxControls.add(mesh.position, 'y', -3, 3, 0.1).name('Position X');

boxControls.addColor(material,'color');
boxControls.add(material, 'wireframe');

var rotateSpeed = 0;

const startRotate = () =>
{
    if (rotateSpeed != 0)
        rotateSpeed = 0;
    else
        rotateSpeed = 0.1;
}

boxControls.add({startRotate}, 'startRotate');


scene.add(mesh)
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600)
document.getElementById("scene").appendChild(renderer.domElement);

const animate = () => {
    requestAnimationFrame(animate);
    mesh.rotation.y += rotateSpeed;
    renderer.render(scene, camera);
}
animate();
