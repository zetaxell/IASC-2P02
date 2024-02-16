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

//camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(9.3, 3.8, 11.6)
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* MESHES */
//testPlane
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

//cave wall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

//barrier wall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

//cave floor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFLoor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFLoor.rotation.x = Math.PI * 0.5
caveFLoor.position.set(0, -2.5, 0)
scene.add(caveFLoor)

//objects

//cylinder
const cylinderGeometry = new THREE.CylinderGeometry(1.25, 1.25, 3, 32, 1, true)
const cylinderMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
})
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.position.set(8, 1.5, 0)
cylinder.rotation.z = Math.PI * 0.5
cylinder.castShadow = true
scene.add(cylinder)

//torusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.1)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
torusKnot.position.set(12, 1.7, 0)
torusKnot.castShadow = true
scene.add(torusKnot)

//sun
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

/* LIGHTS */

/*
//ambient light
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('white')
)
scene.add(ambientLight)
*/

//directional light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(15, 1.5, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

//directional light helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/* UI */

/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () => {
    directionalLight.position.set(8.6, 1.7, 0)
}

//directional light
const lightPositionFolder = ui.addFolder('directional light position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset Position')

lightPositionFolder
    .add(torusKnot.position, 'x')
    .min(-5)
    .max(5)
    .step(0.1)

*/

/* DOM INTERACTIONS */

//dom object
const domObject = {
    part: 0,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

//continue-reading
document.querySelector('#continue-reading').onclick = function(){
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}

//restart
document.querySelector('#restart').onclick = function(){
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

    //reset domObject changes
    domObject.firstChange = false
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false

    //reset sun
    directionalLight.position.set(8.6, 1.7, 0)
}

//first change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}

//second change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
}

//third change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
}

//fourth change
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
}

/* ANIMATION LOOP */
const clock = new THREE.Clock()

//animate
const animation = () => {

    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //animate objects
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime * 0.5) * 2

    //update directional light helper
    //directionalLightHelper.update()

    //sun position to directional light
    sun.position.copy(directionalLight.position)

    //controls
    controls.update()

    //dom interactions

    //part 1
    if(domObject.part === 1){
        camera.position.set(2.7, 0.3, 0)
        camera.lookAt(-5, 0, 0.5)
    }

    //part 2
    if(domObject.part === 2){
        camera.position.set(9.3, 3.8, 11.6)
        camera.lookAt(0, 0, 0)
    }

    //first-change
    if(domObject.firstChange){
        torusKnot.rotation.y = elapsedTime
        torusKnot.rotation.x = elapsedTime
        torusKnot.rotation.z = elapsedTime
        cylinder.rotation.y = elapsedTime * 0.5
    }

    //second-change
    if(domObject.secondChange){
        torusKnot.position.y = Math.sin(elapsedTime * 0.5) * 6
    }

    //third-change
    if(domObject.thirdChange){
        torusKnot.position.y = 2
    }

    //fourth-change
    if(domObject.fourthChange){
        directionalLight.position.y -= elapsedTime * 0.005
    }

    //console.log(camera.position)

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)
}

animation()