import { useContext, useEffect } from 'react';
import * as THREE from 'three'
import { sceneStatus } from '../context/SceneStatusProvider';
import textures from '../images/textures';

const Ground = (props) => {
    
    const {dispatch} = useContext(sceneStatus)
    useEffect(() => {
        let initialPosition = (props.size - 1) / 2
        let floorArray = []
        const geometry = new THREE.PlaneGeometry( 1, 1 )
        geometry.rotateX( - Math.PI / 2 )
        for(let i = -initialPosition; i <= initialPosition; i++) {
            for(let e = -initialPosition; e <= initialPosition; e++) {
                const plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: textures.grass, visible: true } ) )
                plane.name = "terrain"+i+e
                plane.addValue = 0.5
                plane.position.set(i, 0, e)
                floorArray.push(plane)
            }
        }
        dispatch({type: 'updateMeshesFromArray', newMeshes: floorArray})
    },[])

}

export default Ground