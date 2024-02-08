import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -5, 5 );
const camera = new THREE.OrthographicCamera();
scene.add( camera );

camera.position.set(1, 1, 1);

const renderer = new THREE.WebGLRenderer({antialias: true});
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

const y = 0.125 / 2;
const z = Math.sqrt(3) / 2;

const verticesOfHex = new Float32Array([
  -0.5,y,z, // 0
  0.5,y,z, // 1
  1,y,0, // 2
  0.5,y,-z, // 3
  -0.5,y,-z, // 4
  -1,y,0, // 5

  -0.5,-y,z, // 6
  0.5,-y,z, // 7
  1,-y,0, // 8
  0.5,-y,-z, // 9
  -0.5,-y,-z, // 10
  -1,-y,0, // 11

  0,y,0, // 12
  0,-y,0 // 13
]);

const indicesOfFaces = [
  12,0,1,
  12,1,2,
  12,2,3,
  12,3,4,
  12,4,5,
  12,5,0,
  0,6,7,
  7,1,0,
  1,7,8,
  8,2,1,
  2,8,9,
  9,3,2,
  3,9,10,
  10,4,3,
  4,10,11,
  11,5,4,
  5,11,6,
  6,0,5,
  7,6,13,
  8,7,13,
  9,8,13,
  10,9,13,
  11,10,13,
  6,11,13
];

const geometry = new THREE.BufferGeometry();
geometry.setIndex(indicesOfFaces);

geometry.setAttribute('position', new THREE.BufferAttribute(verticesOfHex, 3));

const material = new THREE.MeshBasicMaterial(
  { 
    color: 0xffff00,
    opacity: 0.5,
    transparent: true
  } 
  );

const polyhedron = new THREE.Mesh(geometry, material);

scene.add(polyhedron);

const edges = new THREE.EdgesGeometry( geometry ); 
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) ); 
scene.add( line );

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
