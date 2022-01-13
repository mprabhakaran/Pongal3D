import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
scene.add(camera);
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshBasicMaterial({color:0xff0000});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  
  });

const controls = new OrbitControls(camera,renderer.domElement);


function animate(){
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene,camera)
}
animate();