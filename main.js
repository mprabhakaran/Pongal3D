import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff0000)

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
scene.add(camera);
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//geometry
const loader = new GLTFLoader();
loader.load(
    './pongalWishes.glb',
    function(gltf){
        scene.add(gltf.scene);
    },
    function(xhr){
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function(error){
        console.log('A error happened');
    }
)


window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  
  });

const controls = new OrbitControls(camera,renderer.domElement);


function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera)
}
animate();
