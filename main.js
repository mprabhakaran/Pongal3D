import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js'

window.addEventListener('click',()=>{
    document.body.requestFullscreen();
});

const scene = new THREE.Scene();
scene.background = new THREE.Color('#82dae0');

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100);
scene.add(camera);
camera.position.z = 1.5;

const dirLight = new THREE.DirectionalLight({color:0xffffff});
dirLight.position.set(0.5,1.5,2);
dirLight.castShadow = true;
scene.add(dirLight);

const ambientLight = new THREE.AmbientLight(0xffffff,0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff,0.2);
pointLight.position.set(0,1,0.5);
scene.add(pointLight);

const planeGeometry = new THREE.PlaneBufferGeometry(2,2);
const material = new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry,material);
plane.rotation.x = - 1.55;
plane.position.y = - 0.70;
scene.add(plane);
plane.receiveShadow = true;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//geometry
const loader = new GLTFLoader();
loader.load(
    './pongal.glb',
    function(gltf){
        const root = gltf.scene;
        root.position.y = -0.7;
        root.castShadow = true;
        scene.add(root);
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
