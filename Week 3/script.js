import * as THREE from "three"

/* scene */

// canvas
const canvas = document.querySelector('.webgl')

// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

/* meshes */
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

//testCube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshNormalMaterial()
const testCube = new THREE.Mesh(cubeGeometry, cubeMaterial)

//cube2
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial)

//testTorus
const torusGeometry = new THREE.TorusGeometry(1, 0.1, 16, 100)
const torusMaterial = new THREE.MeshNormalMaterial()
const testTorus = new THREE.Mesh(torusGeometry, torusMaterial)

scene.add(testCube)

scene.add(cube2)

//scene.add(testTorus)

//scene.add(testSphere)

/* animation loop */
const clock = new THREE.Clock()

// animate
const animation = () => {
    //return elapsed time
    const elapsedTime = clock.getElapsedTime()

    //animate testSphere
    //testSphere.position.x = Math.sin(elapsedTime)

    //animate testCube
    testCube.rotation.x = elapsedTime
    testCube.rotation.y = elapsedTime
    testCube.rotation.z = elapsedTime

    testCube.scale.x = Math.sin(elapsedTime / 2)
    testCube.scale.y = Math.sin(elapsedTime / 2)
    testCube.scale.z = Math.sin(elapsedTime / 2)

    testCube.position.x = Math.sin(elapsedTime) * 2
    testCube.position.z = Math.cos(elapsedTime) * 2

    //animate cube2
    cube2.rotation.x = elapsedTime
    cube2.rotation.y = elapsedTime
    cube2.rotation.z = elapsedTime

    cube2.scale.x = Math.sin(elapsedTime / 2)
    cube2.scale.y = Math.sin(elapsedTime / 2)
    cube2.scale.z = Math.sin(elapsedTime / 2)

    cube2.position.x = Math.cos(elapsedTime) * 2
    cube2.position.z = Math.sin(elapsedTime) * 2

    //animate testTorus
    //testTorus.rotation.y = elapsedTime

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)
}

animation()