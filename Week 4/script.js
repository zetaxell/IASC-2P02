import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"


/* SETUP */
//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


/* SCENE */
//canvas
const canvas = document.querySelector('.webgl')


//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('pink')

//camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)

camera.position.set(2, 2, 4)
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.localClippingEnabled = false

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* MESHES */
//clipping plane
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

//plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

plane.rotation.x = Math.PI * 0.5
scene.add(plane)

//testSphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial({
    clippingPlanes: [ clippingPlane ]
})
const testSphere = new THREE.Mesh(geometry, material)

scene.add(testSphere)

/* UI */
//UI
const ui = new dat.GUI()

//UI object
const uiObject = {}
uiObject.play = false
uiObject.speed = 0.5
uiObject.distance = 2

//plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')

planeFolder
    .add(renderer, 'localClippingEnabled')
    .name("clip")

//sphere UI
const sphereFolder = ui.addFolder('Sphere')
sphereFolder
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('height')

sphereFolder
    .add(uiObject, 'play')
    .name('Animate Sphere')

sphereFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name("speed")

sphereFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name("distance")


/* ANIMATION LOOP */
const clock = new THREE.Clock()

//animate
const animation = () => 
{
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //animate Sphere
    if(uiObject.play)
    {
        testSphere.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
    }

    //controls
    controls.update()

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)
}

animation()