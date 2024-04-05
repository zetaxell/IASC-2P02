import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/* SETUP */
//sizes
const sizes = {
    width: window.innerWidth / 2.5,
    height: window.innerWidth / 2.5,
    aspectRatio: 1
}

/* SCENE */
//canvas
const canvas = document.querySelector('.webgl')

//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

//camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, -20)
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

//orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* LIGHTS */
//directional light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/* MESHES */
//cube geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

//cube materials
const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const blueMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('blue')
})
const greenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('green')
})

const drawCube = (i, material) => {
    const cube = new THREE.Mesh(cubeGeometry, material)
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = i - 10

    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI

    scene.add(cube)
}



/* TEXT PARSERS & UI*/
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'broom',
    term2: 'wand',
    term3: 'hat',
    rotateCamera: false
}


//text parsers
//parse text and terms
const parseTextandTerms = () => {
    //strip periods and downcase text
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()
    //console.log(parsedText)

    //tokenize text
    uiobj.textArray = parsedText.split(/[^\w']+/)
    //console.log(uiobj.textArray)

    //find term 1
    findTermInParsedText(uiobj.term1, redMaterial)

    //find term 2
    findTermInParsedText(uiobj.term2, blueMaterial)

    //find term 3
    findTermInParsedText(uiobj.term3, greenMaterial)
}

const findTermInParsedText = (term, material) =>{
    for(let i = 0; i < uiobj.textArray.length; i++){
        //console.log(i, uiobj.textArray[i])
        if(uiobj.textArray[i] === term){
            //console.log(i, term)
            //convert i between 1-20
            const n = (100 / uiobj.textArray.length) * i * 0.2
            
            //call drawCube 5x using n
            for(let a = 0; a < 5; a++){
                drawCube(n, material)
            }
        }
    }
}

//load source text
fetch("https://raw.githubusercontent.com/amephraim/nlp/master/texts/J.%20K.%20Rowling%20-%20Harry%20Potter%201%20-%20Sorcerer's%20Stone.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
        parseTextandTerms()
        
    }
    )


//UI
const ui = new dat.GUI({
    container: document.querySelector('#parent1')
})

//interaction folder
    //cubesFolder
    const cubesFolder = ui.addFolder('Filter Terms')

    cubesFolder
        .add(redMaterial, 'visible')
        .name(`${uiobj.term1}`)

    cubesFolder
        .add(blueMaterial, 'visible')
        .name(`${uiobj.term2}`)

    cubesFolder
        .add(greenMaterial, 'visible')
        .name(`${uiobj.term3}`)

    //cameraFolder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')


/* ANIMATION LOOP */
const clock = new THREE.Clock()

//animate
const animation = () =>
{
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //orbit controls
    controls.update()

    //camera rotation
    if(uiobj.rotateCamera){
        camera.position.x = Math.sin(elapsedTime * 0.2) * 20
        camera.position.z = Math.cos(elapsedTime * 0.2) * 20
    }

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)
}

animation()