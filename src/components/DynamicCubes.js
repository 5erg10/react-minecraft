import { useContext, useState } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'
import { sceneStatus } from '../context/SceneStatusProvider'
import textures from '../images/textures'

const DynamicCubes = () => {
    const {meshes, updateMeshes, collisionValid, currentTexture} = useContext(sceneStatus)

    const [cubeId, updateCubeId] = useState(0)

    console.log(currentTexture);
        
    const onClickHandlder = (event) => {
        if(collisionValid) {
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            const material = new THREE.MeshBasicMaterial({map: textures[currentTexture]});
            const cube = new THREE.Mesh( geometry, material )
            cube.name = "cube"+cubeId
            cube.addValue = 1
            cube.position.copy( collisionValid.position ).add( new Vector3(0,collisionValid.addValue,0) );
            updateMeshes([...meshes, cube])
            updateCubeId(cubeId + 1)
        }
    }

    document.onclick = onClickHandlder

}

export default DynamicCubes