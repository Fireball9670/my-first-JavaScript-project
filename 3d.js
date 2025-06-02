import 'style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xc6d0f5, wireframe: false})
const torus = new THREE.Mesh(geometry, material)

const pointLight = new THREE.PointLight(0xBABBF1, 100)
pointLight.position.set(10, 30, -10)

const ambientLight = new THREE.AmbientLight(0xc6d0f5)

scene.add(torus)
scene.add(pointLight, ambientLight)

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshBasicMaterial({color:0xc6d0f5})
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture 

const earthTexture = new THREE.TextureLoader().load('earth.jpg')
const earthNormal = new THREE.TextureLoader().load('earth_normals.jpg')
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(10 , 24, 24),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: earthNormal
    })
)
earth.position.set(20, 20, -20)

scene.add(earth)

// Animation loop

function animate(){
    requestAnimationFrame(animate)

    torus.rotateX(0.01)
    // torus.rotateY(0.005)
    torus.rotateZ(0.005)

    earth.rotateY(0.01)

    // controls.update()

    renderer.render(scene, camera)
}

animate()