import { useContext, useState } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'
import { sceneStatus } from '../context/SceneStatusProvider'
import textures from '../images/textures'

const DynamicCubes = () => {
    const {state, dispatch} = useContext(sceneStatus)

    const [cubeId, updateCubeId] = useState(0)
        
    const onClickHandlder = () => {
        if(state?.collisionValid && state?.pointerLocked) {
            const geometry = new THREE.BoxGeometry( 1, 1, 1 )
            const material = new THREE.MeshBasicMaterial({map: textures[state?.currentTexture]})
            const cube = new THREE.Mesh( geometry, material )
            cube.name = "cube"+cubeId
            cube.addValue = 1
            cube.position.copy( state?.collisionValid.position ).add( new Vector3(0,state?.collisionValid.addValue,0) )
            dispatch({type: 'updateMeshes', newMesh: cube})
            updateCubeId(cubeId + 1)
        }
    }
    document.onclick = onClickHandlder
}

export default DynamicCubes