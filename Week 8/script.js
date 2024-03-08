import * as THREE from "three"

/* SETUP */
//sizes
const sizes ={
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth/window.innerHeight
}

let xDistance = 1
let meshSize = 1

//mobile
if(sizes.aspectRatio < 1){
    xDistance = 1
    meshSize = 1
}

//resizing
window.addEventListener('resize',() =>{
    //update sizes
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight,
    sizes.aspectRatio = window.innerWidth/window.innerHeight

    //update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
} )

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
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

/* MESHES */
//cube
const cubeGeometry = new THREE.BoxGeometry(meshSize, meshSize, meshSize)
const cubeMaterial = new THREE.MeshNormalMaterial()
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

cube.position.set(-xDistance, 0, -3)
scene.add(cube)

/* DOM INTERACTIONS */
const domObject = {
    part: 1
}

//part 1 click
document.querySelector('#click1').onCLick = function(){
    document.querySelector('#first').classList.add('hidden')
    document.querySelector('#second').classList.remove('hidden')
    domObject.part = 2
}

//part 2 click
document.querySelector('#click2').onCLick = function(){
    document.querySelector('#second').classList.add('hidden')
    document.querySelector('#third').classList.remove('hidden')
    domObject.part = 3
}

//part 3 click
document.querySelector('#click3').onCLick = function(){
    document.querySelector('#third').classList.add('hidden')
    document.querySelector('#first').classList.remove('hidden')
    domObject.part = 1
}

/* ANIMATION LOOP */
const clock = new THREE.Clock()

//animate
const animation = () => {
    //return elapsed time
    const elapsedTime = clock.getElapsedTime()

    //dom interactions
    //part 2
    if(domObject.part === 2){
        if(cube.rotation.y <= Math.PI * 0.5){
            cube.rotation.y += 0.02
        }
        
    }

    //part 3
    if(domObject.part === 3){
        if(cube.rotation.z <= Math.PI * 0.5){
            cube.rotation.z += 0.02
        }

    }

    //reset
    if(domObject.part === 1){
        if(cube.rotation.y >= 0 && cube.rotation.z >= 0){
            cube.rotation.y -= 0.02
            cube.rotation.z -= 0.02
        }
        
    }

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)
}

animation()