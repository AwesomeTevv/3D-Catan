import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(10, 10, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const hemishphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemishphereLight);

const verticesOfCube = [
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1,
  1, 1,
];

const verticesOfHex = [-1, 1, -1, 1, 1, -1];

const indicesOfFaces = [
  2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3,
  7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
];

const geometry = new THREE.PolyhedronGeometry(
  verticesOfCube,
  indicesOfFaces,
  1,
  0
);

const material = new THREE.MeshPhongMaterial({
  wireframe: true,
  wireframeLinewidth: 5,
});

const polyhedron = new THREE.Mesh(geometry, material);

scene.add(polyhedron);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
