import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const labSection = document.getElementById('lbs');
const anchorFirstLab = document.getElementById('firstAnchor');
const anchorSecondLab = document.getElementById('secondAnchor');
const anchorThirdLab = document.getElementById('thirdAnchor');
const anchorTeam = document.getElementById('fourthAnchor');

let camera, scene, renderer, model;

const loader = new GLTFLoader().setPath('/assets/models');

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        labSection.clientWidth / labSection.clientHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(labSection.clientWidth, labSection.clientHeight);

    labSection.appendChild(renderer.domElement);


    loader.load('/assets/models/scene.gltf', function (gltf) {
        model = gltf;
        scene.add(model.scene);
    })


    camera.position.z = 0.2;
    camera.position.y = 0.1;
}

function animate() {
    requestAnimationFrame(animate);

    model.scene.rotation.y += 0.005;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = labSection.clientWidth / labSection.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(labSection.clientWidth, labSection.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

// setInterval(() => {
//     anchorFirstLab.classList.toggle('animate__animated');
//     anchorFirstLab.classList.toggle('animate__flip');
// },5000)

init();
animate();
