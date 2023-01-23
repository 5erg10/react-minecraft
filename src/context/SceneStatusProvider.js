import { createContext, useState } from "react"
import * as THREE from 'three'

export const sceneStatus = createContext()

const SceneStatus = (props) => {

    const rollOverGeo = new THREE.BoxGeometry( 1, 1, 1 );
    const rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0, transparent: true } );
    const rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
    rollOverMesh.name = 'rollOverBox'

    const [meshes, updateMeshes] = useState([rollOverMesh])
    const [collisionValid, updateCollision] = useState(false)

    return (
        <sceneStatus.Provider value={{meshes, updateMeshes, collisionValid, updateCollision}}>
            {props.children}
        </sceneStatus.Provider>
    )
}

export default SceneStatus