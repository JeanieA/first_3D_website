import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add( gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x, y, z);
  scene.add(star)
}

Array(500).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('galaxy.jpeg');
scene.background = spaceTexture;

const faceTexture = new THREE.TextureLoader().load('face.jpeg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const face = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: faceTexture
    // normalMap: normalTexture,
  })
);

scene.add(face);

// moon.position.z = 30;
// moon.position.setX(-10);

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  face.rotation.x += 0.5; 
  face.rotation.y += 0.75; 
  face.rotation.z += 0.5; 
  
  camera.position.z += -0.01; 
  camera.position.x += -0.0002; 
  camera.rotation.y += -0.0002; 
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  
  face.rotation.x += 0.01; 
  face.rotation.y += 0.05; 
  face.rotation.z += 0.01; 

  controls.update();

  renderer.render(scene, camera);
}

animate();