import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import * as THREE from 'three'

const firstPersonControl = (camera, domElement) =>{
    
    let prevTime = performance.now();

    const controls = new PointerLockControls(camera, domElement)
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();

    controls.movementDirection = {
        moveForward: false,
        moveLeft: false,
        moveBackward: false,
        moveRight: false
    }

    const keyEventAction = (key, status) => {
        const validKeys = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'];
        return {
            [key === 'ArrowUp' || key === 'KeyW']: () => controls.movementDirection.moveForward = status,
            [key === 'ArrowLeft' || key === 'KeyA']: () => controls.movementDirection.moveLeft = status,
            [key === 'ArrowDown' || key === 'KeyS']: () => controls.movementDirection.moveBackward = status,
            [key === 'ArrowRight' || key === 'KeyD']: () => controls.movementDirection.moveRight  = status,
            [!validKeys.includes(key)]: () => false
        }.true()
    }

    controls.update = (velocityFactor, time) => {
        const delta = ( time - prevTime ) / 1000;

        if(delta) {
    
            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;
            velocity.y -= 9.8 * 100.0 * delta;
        
            direction.z = Number( controls.movementDirection.moveForward ) - Number( controls.movementDirection.moveBackward );
            direction.x = Number( controls.movementDirection.moveRight ) - Number( controls.movementDirection.moveLeft );
            direction.normalize();
        
            if ( controls.movementDirection.moveForward || controls.movementDirection.moveBackward ) velocity.z -= direction.z * velocityFactor * delta;
            if ( controls.movementDirection.moveLeft || controls.movementDirection.moveRight ) velocity.x -= direction.x * velocityFactor * delta;
            
            controls.moveRight( - velocity.x * delta );
            controls.moveForward( - velocity.z * delta );
        }
        prevTime = time
    }

    document.addEventListener( 'keydown', (event) => keyEventAction(event.code, true) );
    document.addEventListener( 'keyup', (event) => keyEventAction(event.code, false) );

    return controls
}

export default firstPersonControl