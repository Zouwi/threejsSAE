import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as TWEEN from 'tween.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass.js";
import {GammaCorrectionShader} from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass.js";
import {RGBShiftShader} from "three/examples/jsm/shaders/RGBShiftShader.js";
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import {TextGeometry} from "three/addons/geometries/TextGeometry.js";
import {Vector2} from "three";

/**
 * Base
 */
const tailleW = window.innerWidth;
const tailleH = window.innerHeight;
// Canvas
const canvas = document.querySelector('canvas.webgl')
//console.log(THREE, canvas)

// Scene
const scene = new THREE.Scene()

const loader = new GLTFLoader();

let compteurModel = 4;

/** FORMES GEOMETRICS**/
    // Créer un cercle plat
const circleGeometry = new THREE.CircleGeometry(1.5, 32); // Rayon = 1, Segments = 32
const circleMaterial = new THREE.MeshBasicMaterial({color: 0xfcee65}); // Couleur rouge
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.z = -5;
circle.position.y = 2;
scene.add(circle);

//Le skelet
const skelet = new THREE.Object3D();

scene.add(skelet);

const Geom = new THREE.IcosahedronGeometry(7, 1);
const Geom2 = new THREE.IcosahedronGeometry(15, 1);

const mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
});

const mat2 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide

});

const planet = new THREE.Mesh(Geom, mat);
planet.scale.x = planet.scale.y = planet.scale.z = 1;
circle.add(planet);

const planet2 = new THREE.Mesh(Geom2, mat2);
planet2.scale.x = planet2.scale.y = planet2.scale.z = 0.07;
planet2.position.z = -5;
planet2.position.x = -1.5;
planet2.position.y = 3;

skelet.add(planet2);

var rouge = new THREE.Color(0xfcee65);

//cube 1
const cube = new THREE.BoxGeometry(1, 1, 1);
const box = new THREE.Mesh(cube, new THREE.MeshBasicMaterial({
    color: 0xffffff,
}))
box.position.z = -4;
box.position.x = -2;
box.position.y = 1;
box.rotation.x = 0.3;
box.rotation.y = 0.3;

//cube 2
const cube2 = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const boxBlue = new THREE.Mesh(cube2, new THREE.MeshBasicMaterial({
    color: 0x2929ed,
}))
boxBlue.position.z = -3
boxBlue.position.y = 2
boxBlue.position.x = 4
boxBlue.rotation.x = 0.5;
boxBlue.rotation.y = 0.5;

//torus 1
const cube3 = new THREE.TorusGeometry(1, 0.2, 10, 100);
const torus1 = new THREE.Mesh(cube3, new THREE.MeshBasicMaterial({
    color: 0xf2ff94,
}))
torus1.position.z = -13
torus1.position.x = -15
torus1.position.y = 1
torus1.rotation.x = 0.5;
torus1.rotation.y = 0.5;

//torus 2
const torus2 = new THREE.Mesh(cube3, new THREE.MeshBasicMaterial({
    color: 0xe842e8,
}))
torus2.position.z = -13
torus2.position.x = 15
torus2.position.y = -3
torus2.rotation.x = 0.5;
torus2.rotation.y = 0.5;

//grille transparente
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('themes/retro-theme/assets/js/dist/gltf/grilleblanche.png');
const geometry = new THREE.PlaneGeometry(10, 10)
const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true});
material.map.repeat.set(4, 4); // Répétez la texture deux fois dans la direction horizontale et verticale
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
const grille = new THREE.Mesh(geometry, material);
grille.position.z = -10;
grille.position.x = 3;
grille.position.y = 1;

scene.add(box, boxBlue, torus1, torus2, grille)

//titre texture
const TitreGros = textureLoader.load('themes/retro-theme/assets/js/dist/gltf/retro-rococo-vaporwave.png');
let geometry2;
if (window.innerWidth < 500) {
    geometry2 = new THREE.PlaneGeometry(0.00350 * tailleW, 0.0002 * tailleH)
} else {
    geometry2 = new THREE.PlaneGeometry(0.00273 * tailleW, 0.00052 * tailleH)
}
const material2 = new THREE.MeshBasicMaterial({map: TitreGros, side: THREE.DoubleSide, transparent: true});

const titreVapor = new THREE.Mesh(geometry2, material2);
titreVapor.receiveShadow = true;
if (window.innerWidth < 500) {
    titreVapor.position.z = -1.4;
    titreVapor.position.x = 0;
    titreVapor.position.y = 2.36;
} else {
    titreVapor.position.z = -4;
    titreVapor.position.x = -1.67;
    titreVapor.position.y = 4.1;
}
scene.add(titreVapor)

/** MODELS 3D **/
    //tv
let tv;
loader.load('themes/retro-theme/assets/js/dist/gltf/vintage_tv_free.glb', function (gltf) {
        tv = gltf.scene;
        if (window.innerWidth < 500) {
            tv.scale.set(0.000015 * tailleW, 0.000015 * tailleW, 0.000015 * tailleW);
            tv.position.z = -2;
            tv.position.x = 0.5
            tv.position.y = 0.8;
        } else {
            tv.scale.set(0.000015 * tailleW, 0.000015 * tailleW, 0.000015 * tailleW);
            tv.position.z = -6;
            tv.position.x = 4;
            tv.position.y = -2;
            tv.rotation.y = -0.9;
        }
        tv.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        })
        scene.add(tv);
        compteurModel--;
        verifCompteur();
    },
    undefined, function (error) {
        console.error(error);
    });

//vinyl
let vinyl;
loader.load('themes/retro-theme/assets/js/dist/gltf/album_vinyl.glb', function (gltf) {
        vinyl = gltf.scene;
        if (window.innerWidth < 500) {
            vinyl.scale.set(0.09 * tailleW, 0.09 * tailleW, 0.09 * tailleW);
            vinyl.position.z = -2;
            vinyl.position.x = -1;
            vinyl.position.y = 1;
        } else {
            vinyl.scale.set(0.09 * tailleW, 0.09 * tailleW, 0.09 * tailleW);
            vinyl.position.z = -8;
            vinyl.position.x = -7;
            vinyl.position.y = -2;
        }
        scene.add(vinyl);
        compteurModel--;
        verifCompteur();
    },
    undefined, function (error) {
        console.error(error);
    });
//themes/retro-theme/assets/js/dist/gltf/womens_blouse_and_skirt.glb
//dress
let dress;
loader.load('themes/retro-theme/assets/js/dist/gltf/womens_blouse_and_skirt.glb', function (gltf) {
        dress = gltf.scene;
        if (window.innerWidth < 500) {
            dress.scale.set(0.0016 * tailleW, 0.0016 * tailleW, 0.0016 * tailleW);
            dress.position.z = -2;
            dress.position.x = 0.5;
            dress.position.y = 1.3;
            dress.rotation.y = -0.4;
            dress.visible = true;
        } else {
            dress.scale.set(0.0026 * tailleW, 0.0026 * tailleW, 0.0026 * tailleW);
            dress.position.z = -10;
            dress.position.x = 5;
            dress.position.y = 0;
            dress.rotation.y = 0.1;
            dress.visible = true;
        }
        scene.add(dress);
        compteurModel--;
        verifCompteur();
    },
    undefined, function (error) {
        console.error(error);
    });

//manette
let remote;
loader.load('themes/retro-theme/assets/js/dist/gltf/gamecube_controller.glb', function (gltf) {
        remote = gltf.scene;
        if (window.innerWidth < 500) {
            remote.scale.set(0.000016 * tailleW, 0.000016 * tailleW, 0.000016 * tailleW);
            remote.position.z = -1;
            remote.position.x = -0.2;
            remote.position.y = 1.4;
            remote.rotation.x = 0.8;
            remote.visible = true;
        } else {
            remote.scale.set(0.000005 * tailleW, 0.000005 * tailleW, 0.000005 * tailleW);
            remote.position.z = -1;
            remote.position.x = 0;
            remote.position.y = 0.4;
            remote.rotation.x = 0.3;
            remote.visible = true;
        }
        scene.add(remote);
        compteurModel--;
        verifCompteur();
    },
    undefined, function (error) {
        console.error(error);
    });

//titre
let fontSize;
if (window.innerWidth < 500) {
    fontSize = 0.00032 * tailleW;
} else {
    fontSize = 0.00052 * tailleW;
}
const fontLoader = new FontLoader();
let text;
fontLoader.load(
    'themes/retro-theme/assets/js/dist/gltf/fonts/Utopia_Regular.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Retro Rococo',
            {
                font: font,
                size: fontSize,
                height: 1,
                curveSegments: 2,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 2,

            }
        );
        //themes/retro-theme/assets/js/dist/gltf/texturePolice.JPG
        const matCapTexture = new THREE.TextureLoader().load('themes/retro-theme/assets/js/dist/gltf/texturePolice.JPG');
        matCapTexture.encoding = THREE.sRGBEncoding;
        const textMaterial = new THREE.MeshMatcapMaterial({color: 0x2929ed});
        text = new THREE.Mesh(textGeometry, textMaterial)
        if (window.innerWidth < 500) {
            text.position.z = -2;
            text.position.y = 2.5;
            text.position.x = 0;
            text.rotation.x = 0.2;
        } else {
            text.position.z = -10;
            text.position.y = 7.5;
            text.position.x = -3.5;
        }
        textGeometry.center();
        scene.add(text)
    }
)

//arrow

const arrowTexture = textureLoader.load('themes/retro-theme/assets/js/dist/gltf/pixel_arrow.png');
const arrowGeometry = new THREE.PlaneGeometry(0.0006 * tailleW, 0.0008 * tailleH)
const arrowMaterial = new THREE.MeshBasicMaterial({map: arrowTexture, transparent: true, side: THREE.DoubleSide});
const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
arrow.position.z = -4;
arrow.position.x = 0.0027 * tailleW;
arrow.position.y = -1.9;
arrow.rotation.z = -1.55;
if (window.innerWidth < 500) {
    scene.remove(arrow)
} else {
    scene.add(arrow)
}

//triangles
const triangles = new THREE.Group()
scene.add(triangles)

const triangleTexture = textureLoader.load('themes/retro-theme/assets/js/dist/gltf/triangle.png');
const triangleGeometry = new THREE.PlaneGeometry(0.3, 0.3, 1)
const triangleMaterial = new THREE.MeshBasicMaterial({
    map: triangleTexture,
    transparent: true,
    side: THREE.DoubleSide
});

for (let i = 0; i < 500; i++) {
    const angle = Math.random() * Math.PI * 2; // Utilisez Math.PI * 2 pour un cercle complet
    const radius = 3 + Math.random() * 4;
    const x = Math.cos(angle) * radius; // Utilisez la fonction trigonométrique pour calculer les coordonnées x
    const y = Math.sin(angle) * radius; // Utilisez la fonction trigonométrique pour calculer les coordonnées y
    const z = -5 + Math.random() * 10; // Ajustez la plage de valeurs pour la coordonnée z
    const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
    triangle.position.set(x, y, z);
    triangle.rotation.z = Math.random() * Math.PI * 2; // Rotation aléatoire
    const scale = 0.1 + Math.random() * 0.4; // Ajustez la plage de valeurs pour l'échelle
    triangle.scale.set(scale, scale, 1);
    triangles.add(triangle);
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**ESSAI ANIMATION SCROLL **/
function animateToProperties(object, targetProperties, duration) {
    new TWEEN.Tween(object.position)
        .to(targetProperties.position, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

    new TWEEN.Tween(object.scale)
        .to(targetProperties.scale, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

    new TWEEN.Tween(object.rotation)
        .to(targetProperties.rotation, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
}

let triggerPosition;

if (window.innerWidth < 500) {
    triggerPosition = 20;
} else {
    triggerPosition = 200;
}


let scrollY = 0;

/** CONSTANTES ANIMATION SCROLL**/
let targetVINYL;
let targetTV;
let targetDRESS;
let targetREMOTE;
let targetARROW;
let isScrolling = false;

function scrolling() {
    const newScrollY = window.scrollY;

    // Scroll vers le bas
    if (newScrollY > triggerPosition) {
        isScrolling = true;

        if (window.innerWidth < 500) {
            targetVINYL = {
                position: {x: -0.0044 * tailleW, y: -0.0018 * tailleW, z: -0.003 * tailleW},
                scale: {x: 0.05 * tailleW, y: 0.05 * tailleW, z: 0.05 * tailleW},
                rotation: {x: 0, y: 0, z: 0}
            };
        } else {
            targetVINYL = {
                position: {x: -0.0044 * tailleW, y: -0.0018 * tailleW, z: -0.003 * tailleW},
                scale: {x: 0.05 * tailleW, y: 0.05 * tailleW, z: 0.05 * tailleW},
                rotation: {x: 0, y: 0, z: 0}
            };
        }

        if (window.innerWidth < 500) {
            targetTV = {
                position: {x: -0.0038 * tailleW, y: -0.0011 * tailleW, z: -0.003 * tailleW},
                scale: {x: 0.0000078 * tailleW, y: 0.0000078 * tailleW, z: 0.0000078 * tailleW},
                rotation: {x: 0, y: 0.9, z: 0}
            };
        } else {
            targetTV = {
                position: {x: -0.0038 * tailleW, y: -0.0011 * tailleW, z: -0.003 * tailleW},
                scale: {x: 0.0000078 * tailleW, y: 0.0000078 * tailleW, z: 0.0000078 * tailleW},
                rotation: {x: 0, y: 0.9, z: 0}
            };
        }

        if (window.innerWidth < 500) {
            targetREMOTE = {
                position: {x: -0.0038 * tailleW, y: 0.0003 * tailleW, z: -0.003 * tailleW},
                scale: {x: 0.000012 * tailleW, y: 0.000012 * tailleW, z: 0.000006 * tailleW},
                rotation: {x: 0.5, y: 0, z: -0.5}
            };
        } else {
            targetREMOTE = {
                position: {x: -0.0038 * tailleW, y: 0.0003 * tailleW, z: -0.003 * tailleW},
                scale: {x: 0.000012 * tailleW, y: 0.000012 * tailleW, z: 0.000006 * tailleW},
                rotation: {x: 0.5, y: 0, z: -0.5}
            }
        }

        if (window.innerWidth < 500) {
            targetDRESS = {
                position: {x: -0.0038 * tailleW, y: 0.0006 * tailleW, z: -0.003 * tailleW},
                scale: {x: 0.001 * tailleW, y: 0.001 * tailleW, z: 0.001 * tailleW},
                rotation: {x: 0, y: 0.1, z: 0}
            };
        } else {
            targetDRESS = {
                position: {x: -0.0038 * tailleW, y: 0.0006 * tailleW, z: -0.003 * tailleW},
                scale: {x: 0.001 * tailleW, y: 0.001 * tailleW, z: 0.001 * tailleW},
                rotation: {x: 0, y: 0.1, z: 0}
            };
        }

        targetARROW = {
            rotation: {x: 0, y: 0, z: 1.55}
        }

        const duration = 700;
        setTimeout(() => {
            isScrolling = false; // Réinitialiser l'indicateur après la durée de l'animation de défilement
        }, 700);
            animateToProperties(vinyl, targetVINYL, duration);
            animateToProperties(tv, targetTV, duration);
            animateToProperties(dress, targetDRESS, duration);
            animateToProperties(remote, targetREMOTE, duration);
            animateToProperties(arrow, targetARROW, duration);
    }
    // Scroll vers le haut
    else {
        isScrolling = true;

        if (window.innerWidth < 500) {
            targetVINYL = {
                position: {x: -1, y: 1, z: -2},
                scale: {x: 0.09 * tailleW, y: 0.09 * tailleW, z: 0.09 * tailleW},
                rotation: {x: 0, y: 0, z: 0}
            };
        } else {
            targetVINYL = {
                position: {x: -7, y: -2, z: -8},
                scale: {x: 0.09 * tailleW, y: 0.09 * tailleW, z: 0.09 * tailleW},
                rotation: {x: 0, y: 0, z: 0}
            };
        }

        if (window.innerWidth < 500) {
            targetTV = {
                position: {x: 0.5, y: 0.8, z: -2},
                scale: {x: 0.000015 * tailleW, y: 0.000015 * tailleW, z: 0.000015 * tailleW},
                rotation: {x: 0, y: 0, z: 0}
            };
        } else {
            targetTV = {
                position: {x: 4, y: -2, z: -6},
                scale: {x: 0.000015 * tailleW, y: 0.000015 * tailleW, z: 0.000015 * tailleW},
                rotation: {x: 0, y: -0.9, z: 0}
            };
        }

        if (window.innerWidth < 500) {
            targetDRESS = {
                position: {x: 0.5, y: 1.3, z: -2},
                scale: {x: 0.0016 * tailleW, y: 0.0016 * tailleW, z: 0.0016 * tailleW},
                rotation: {x: 0, y: -0.4, z: 0}
            };
        } else {
            targetDRESS = {
                position: {x: 5, y: 0, z: -10},
                scale: {x: 0.0026 * tailleW, y: 0.0026 * tailleW, z: 0.0026 * tailleW},
                rotation: {x: 0, y: 0.1, z: 0}
            };
        }

        if (window.innerWidth < 500) {
            targetREMOTE = {
                position: {x: -0.2, y: 1.4, z: -1},
                scale: {x: 0.000016 * tailleW, y: 0.000016 * tailleW, z: 0.000016 * tailleW},
                rotation: {x: 0.8, y: 0, z: 0}
            }
        } else {
            targetREMOTE = {
                position: {x: 0, y: 0.4, z: -1},
                scale: {x: 0.000005 * tailleW, y: 0.000005 * tailleW, z: 0.000005 * tailleW},
                rotation: {x: 0.3, y: 0, z: 0}
            }
        }
        targetARROW = {
            rotation: {x: 0, y: 0, z: -1.55}
        }
        const duration = 700;
        setTimeout(() => {
            isScrolling = false; // Réinitialiser l'indicateur après la durée de l'animation de défilement
        }, 700);
            animateToProperties(vinyl, targetVINYL, duration);
            animateToProperties(tv, targetTV, duration);
            animateToProperties(dress, targetDRESS, duration);
            animateToProperties(remote, targetREMOTE, duration);
            animateToProperties(arrow, targetARROW, duration);
    }
    scrollY = newScrollY;
}

function verifCompteur() {
    if (compteurModel === 0) {
        scrolling();
    }
}

window.addEventListener('scroll', scrolling);
/**
 * Camera
 */
    // Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 1
camera.position.x = 0
camera.position.y = 1

scene.add(camera)
//console.log(camera.position, camera.rotation);

//lumière
// Ajoutez un éclairage directionnel
const HemisphereLight = new THREE.HemisphereLight(0xFF44FD, 0x44E2FF, 5); // Couleur blanche, intensité 1
HemisphereLight.position.set(1, 5, 1); // Position de la lumière
scene.add(HemisphereLight);


/**PARTICULES**/
const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xffffff
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

/** ANIMATION SURVOL + CLIC **/

    // Définissez une fonction pour gérer l'événement de survol
const animateBoxEnlarge = (objet, x, y, z) => {
        // Utilisez Tween.js pour agrandir l'échelle de la boîte
        new TWEEN.Tween(objet.scale)
            .to({x: x, y: y, z: z}, 400) // Nouvelle échelle et durée de l'animation en millisecondes
            .easing(TWEEN.Easing.Quadratic.Out) // Easing pour une animation fluide
            .start(); // Lance l'animation
    };

const animateBoxShrink = (objet, x, y, z) => {
    // Utilisez Tween.js pour réduire l'échelle de la boîte à sa taille initiale
    new TWEEN.Tween(objet.scale)
        .to({x: x, y: y, z: z}, 400) // Nouvelle échelle et durée de l'animation en millisecondes
        .easing(TWEEN.Easing.Quadratic.Out) // Easing pour une animation fluide
        .start(); // Lance l'animation
};

const animateBoxRotate = (objet, x, y, z) => {
    // Utilisez Tween.js pour réduire l'échelle de la boîte à sa taille initiale
    new TWEEN.Tween(objet.rotation)
        .to({x: x, y: y, z: z}, 400) // Nouvelle échelle et durée de l'animation en millisecondes
        .easing(TWEEN.Easing.Quadratic.Out) // Easing pour une animation fluide
        .start(); // Lance l'animation
};

const animateBoxDerotate = (objet, x, y, z) => {
    // Utilisez Tween.js pour réduire l'échelle de la boîte à sa taille initiale
    new TWEEN.Tween(objet.rotation)
        .to({x: x, y: y, z: z}, 400) // Nouvelle échelle et durée de l'animation en millisecondes
        .easing(TWEEN.Easing.Quadratic.Out) // Easing pour une animation fluide
        .start(); // Lance l'animation
};

//Ajouter un lien au clic sur la tv
document.addEventListener('click', (event) => {
    // Obtenez la position du clic de la souris en coordonnées normalisées (-1 à 1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    let isHovered = true;

    // Utilisez un Raycaster pour convertir les coordonnées de l'écran en un rayon dans l'espace 3D
    const raycaster = new THREE.Raycaster();

    // Vérifiez si raycaster est défini avant d'accéder à sa propriété layers
    if (raycaster) {
        raycaster.layers?.set(0);
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

        // Obtenez les intersections entre le rayon et les objets dans la scène
        const intersections = raycaster.intersectObjects([tv], true);

        // Si des intersections sont trouvées, déplacez la caméra vers la position de l'intersection
        if (tv && intersections.length > 0) {
            let urlFurnitures = document.querySelector('#furnituresUrl').getAttribute('data-furnitures');
            if (urlFurnitures) {
                window.location.href = urlFurnitures;
            } else {
                window.location.href = "https://shop.iutmulhouse.fr/index.php?id_category=17&controller=category&id_lang=1";
            }
        }
    }
});

//Ajouter un lien au clic sur le dress
document.addEventListener('click', () => {
    // Obtenez la position du clic de la souris en coordonnées normalisées (-1 à 1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Utilisez un Raycaster pour convertir les coordonnées de l'écran en un rayon dans l'espace 3D
    const raycaster = new THREE.Raycaster();
    if (raycaster) {
        raycaster.layers?.set(0);
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

        // Obtenez les intersections entre le rayon et les objets dans la scène
        const intersections = raycaster?.intersectObjects([dress], true);

        // Si des intersections sont trouvées, déplacez la caméra vers la position de l'intersection
        if (dress && intersections.length > 0) {
            let urlDresses = document.querySelector('#dressesUrl').getAttribute('data-dresses');
            if (urlDresses) {
                window.location.href = urlDresses;
            } else {
                window.location.href = "https://shop.iutmulhouse.fr/index.php?id_category=3&controller=category&id_lang=1";
            }

        }
    }
})

//Ajouter un lien au clic sur le vinyl
document.addEventListener('click', () => {
    // Obtenez la position du clic de la souris en coordonnées normalisées (-1 à 1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Utilisez un Raycaster pour convertir les coordonnées de l'écran en un rayon dans l'espace 3D
    const raycaster = new THREE.Raycaster();
    if (raycaster) {
        raycaster.layers?.set(0);
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

        // Obtenez les intersections entre le rayon et les objets dans la scène
        const intersections = raycaster?.intersectObjects([vinyl], true);

        // Si des intersections sont trouvées, déplacez la caméra vers la position de l'intersection
        if (vinyl && intersections.length > 0) {
            let urlMusic = document.querySelector('#musicUrl').getAttribute('data-music');
            if (urlMusic) {
                window.location.href = urlMusic;
            } else {
                window.location.href = "https://shop.iutmulhouse.fr/index.php?id_category=18&controller=category&id_lang=1";
            }
        }
    }
})

//Ajouter un lien au clic sur la remote
document.addEventListener('click', () => {
    // Obtenez la position du clic de la souris en coordonnées normalisées (-1 à 1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Utilisez un Raycaster pour convertir les coordonnées de l'écran en un rayon dans l'espace 3D
    const raycaster = new THREE.Raycaster();
    if (raycaster) {
        raycaster.layers?.set(0);
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

        // Obtenez les intersections entre le rayon et les objets dans la scène
        const intersections = raycaster?.intersectObjects([remote], true);

        // Si des intersections sont trouvées, déplacez la caméra vers la position de l'intersection
        if (remote && intersections.length > 0) {
            let urlGames = document.querySelector('#gamesUrl').getAttribute('data-games');
            if (urlGames) {
                window.location.href = urlGames;
            } else {
                window.location.href = "https://shop.iutmulhouse.fr/index.php?id_category=19&controller=category&id_lang=1";
            }

        }
    }
})

//ajouter un lien au clic sur la flèche
document.addEventListener('click', () => {
    // Obtenez la position du clic de la souris en coordonnées normalisées (-1 à 1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Utilisez un Raycaster pour convertir les coordonnées de l'écran en un rayon dans l'espace 3D
    const raycaster = new THREE.Raycaster();
    if (raycaster) {
        raycaster.layers?.set(0);
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

        // Obtenez les intersections entre le rayon et les objets dans la scène
        const intersections = raycaster?.intersectObjects([arrow], true);

        // Si des intersections sont trouvées, déplacez la caméra vers la position de l'intersection
        if (arrow && intersections.length > 0) {
            window.location.href = "#top";
        }
    }
});

//animations au survol des modèles 3D
document.addEventListener('mousemove', (event) => {
    if (!isScrolling) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();

        // Vérifiez si raycaster et raycaster.layers sont définis avant d'accéder à la propriété layers
        if (raycaster && raycaster.layers) {
            raycaster.layers?.set(0);
            raycaster.setFromCamera(mouse, camera);

            const models = [tv, dress, vinyl, remote, arrow];

            let isHovered = false;

            for (const model of models) {
                const intersects = raycaster.intersectObjects([model]);
                if (model && intersects.length > 0) {
                    isHovered = true;
                    break;
                }
            }

            if (isHovered) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        }
    }
});

/**
 * Renderer
 */
let renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false
})

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setClearColor(0x000000, 0.0);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/** POST PROCESSING EFFET GLITCH **/
    // Add the effectComposer
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(sizes.width, sizes.height);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/*
 * Add the render path to the composer
 * This pass will take care of rendering the final scene
 */
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

/*
 * Add the rgbShift pass to the composer
 * This pass will be responsible for handling the rgbShift effect
 */
const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms["amount"].value = 0.002;

effectComposer.addPass(rgbShiftPass);

/*
 * Add the gammaCorrection pass to the composer to fix
 * the color issues
 */
const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
effectComposer.addPass(gammaCorrectionPass);

// Event listener to handle screen resize
window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //redimensionnement de la grille
    tv.scale.x = window.innerWidth * 0.000015;
    tv.scale.y = window.innerHeight * 0.000024;

    //redimensionnement du titre
    titreVapor.scale.x = window.innerWidth * 0.00051;
    titreVapor.scale.y = window.innerHeight * 0.00084;

    //redimensionnement du vinyl
    vinyl.scale.x = window.innerWidth * 0.09;
    vinyl.scale.y = window.innerHeight * 0.15;

    //redimensionnement du dress
    dress.scale.x = window.innerWidth * 0.002;
    dress.scale.y = window.innerHeight * 0.0041;

    //redimensionnement de la remote
    remote.scale.x = window.innerWidth * 0.000005;
    remote.scale.y = window.innerHeight * 0.000008;

    //redimensionnement du texte
    text.scale.x = window.innerWidth * 0.0005;
    text.scale.y = window.innerHeight * 0.0008;

    //redimensionnement de la flèche
    arrow.position.x = window.innerWidth * 0.003;

    //redimensionnement des animations scroll
    targetVINYL = {
        position: {x: -0.001 * tailleW, y: -0.0018 * tailleW, z: -0.003 * tailleW},
    };

    targetTV = {
        position: {x: -0.0025 * tailleW, y: -0.0011 * tailleW, z: -0.003 * tailleW},
    }

    targetREMOTE = {
        position: {x: -0.0025 * tailleW, y: 0.0003 * tailleW, z: -0.003 * tailleW},
    }

    targetDRESS = {
        position: {x: -0.0025 * tailleW, y: 0.0006 * tailleW, z: -0.003 * tailleW},
    }

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    TWEEN.update();

    const elapsedTime = clock.getElapsedTime()

    //animation des particules
    particlesMesh.rotation.y = elapsedTime * 0.04;
    particlesMesh.rotation.x = elapsedTime * 0.04;

    //Animation des box qui se déplacent de haut en bas
    box.position.y = Math.sin(elapsedTime * 0.3) * 0.5 + 1;
    boxBlue.position.y = Math.sin(elapsedTime * 0.2) * 0.5 + 2;
    torus1.position.y = Math.sin(elapsedTime * 0.3) * 0.5 + 3;

    torus2.rotation.y = elapsedTime * 0.06;
    torus2.rotation.x = elapsedTime * 0.06;

    //animation de la flèche de haut en bas
    arrow.position.y = Math.sin(elapsedTime * 0.9) * 0.2 - 1.9;

    renderer.clear();

    // Render
    effectComposer.render();
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}
tick();

