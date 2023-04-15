import { useRef, useEffect, useContext } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'
import {sceneStatus} from '../context/SceneStatusProvider'
import firstPersonControl from '../utils/controls'

let meshes, dispatchAction, pointerStatus;

const {innerWidth: windowWidth, innerHeight: windowHeight} = window
const camera =  new THREE.PerspectiveCamera( 70, windowWidth / windowHeight, 0.01, 100 )
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( { antialias: true } );
const controls = firstPersonControl(camera, renderer.domElement)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

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

const onPointerMove = ( ) => {
    if(meshes && pointerStatus) {
        pointer.set( 0, 0 );

        raycaster.setFromCamera( pointer, camera );
    
        const intersects = raycaster.intersectObjects( meshes, false );
    
        if ( intersects.length > 0 ) {
            const intersect = intersects[ 0 ];
            dispatchAction({type: 'updateCollision', newCollisionState: intersect.object})
            meshes[0].position.copy( intersect.object.position ).add( new Vector3(0,intersect.object.addValue,0) )
            meshes[0].material.opacity = 0.2
        }
        else {
            meshes[0].material.opacity = 0
            dispatchAction({type: 'updateCollision', newCollisionState: false})
        }
    }
}

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( windowWidth, windowHeight );

const Scene = (props) => {

    const containerRef = useRef(null)
    const {state, dispatch} = useContext(sceneStatus)

    dispatchAction = dispatch

    useEffect(() => {
        state?.meshes.map((mesh) => scene.add(mesh))
        meshes = state?.meshes
    }, [state?.meshes])

    useEffect(() => {
        camera.position.set(0, 1.8, 1.8)
        scene.background = new THREE.Color( `#${props["bg-color"]}` )
        containerRef.current.appendChild(renderer.domElement)

        containerRef.current.addEventListener('resize', onWindowResize)
        controls.addEventListener( 'lock', () => dispatch({type: 'updateLockedStatus', newLockedStatus: true}));
        controls.addEventListener( 'unlock', () => dispatch({type: 'updateLockedStatus', newLockedStatus: false}));

        animate()

        return () => {
            containerRef.current.removeChild(renderer.domElement)
            containerRef.current.removeEventListener('resize', onWindowResize)
            controls.removeEventListener( 'lock', () => {});
            controls.removeEventListener( 'unlock', () => {});
        }
    }, [])

    useEffect(() => {
        containerRef.current.addEventListener('pointermove', onPointerMove)
        state?.pointerLocked ? controls.lock() : controls.unlock()
        pointerStatus = state?.pointerLocked
        return () => {
            containerRef.current.removeEventListener('pointermove', onPointerMove)
        }
    }, [state?.pointerLocked])

    return <div ref={containerRef} id='scene'>
        <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#FFF',
                display: !state?.pointerLocked ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
            <h1>Press Enter to start</h1>
        </div>
        {props.children}
    </div>
}

export default Scene;