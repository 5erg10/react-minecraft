import { useRef, useEffect, useContext } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'
import {sceneStatus} from '../context/SceneStatusProvider'
import firstPersonControl from '../utils/controls'

const {innerWidth: windowWidth, innerHeight: windowHeight} = window
const camera =  new THREE.PerspectiveCamera( 70, windowWidth / windowHeight, 0.01, 100 )
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( { antialias: true } );
const controls = firstPersonControl(camera, renderer.domElement)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( windowWidth, windowHeight );

const animate = (time) => {
    requestAnimationFrame( animate )
    controls.update(40, time)
    renderer.render( scene, camera )
}

const onWindowResize = () => {
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(windowWidth, windowHeight);
}

const onPointerMove = ( event, meshes, updateCollision ) => {
    pointer.set( ( event.clientX / windowWidth ) * 2 - 1, - ( event.clientY / windowHeight ) * 2 + 1 );

    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( meshes, false );

    if ( intersects.length > 0 ) {
        const intersect = intersects[ 0 ];
        updateCollision(intersect.object)
        meshes[0].position.copy( intersect.object.position ).add( new Vector3(0,intersect.object.addValue,0) )
        meshes[0].material.opacity = 0.2
    }
    else {
        meshes[0].material.opacity = 0
        updateCollision(false)
    }

}

const Scene = (props) => {

    const containerRef = useRef(null)
    const {meshes, updateCollision} = useContext(sceneStatus)

    useEffect(() => {
        meshes.map((mesh) => scene.add(mesh))

        document.addEventListener( 'pointermove', (event) => onPointerMove(event, meshes, updateCollision) )
        
        return () => {
            document.removeEventListener('pointermove', (event) => onPointerMove(event, meshes, updateCollision))
        }
    }, [meshes])

    useEffect(() => {
        camera.position.set(0, 1.8, 1.8)
        scene.background = new THREE.Color( `#${props["bg-color"]}` );
        containerRef.current.appendChild(renderer.domElement)

        document.addEventListener('resize', onWindowResize, false)
        document.addEventListener('click', () => { if(!controls.isLocked) controls.lock() })

        animate()

        return () => {
            containerRef.current.removeChild(renderer.domElement)
            document.removeEventListener('click', () => {})
            document.removeEventListener('resize', onWindowResize, false)
        }
    }, [])

    return <div ref={containerRef} id='scene'>
        {props.children}
    </div>
}

export default Scene;