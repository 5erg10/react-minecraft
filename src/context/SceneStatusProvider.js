import { createContext, useReducer } from "react"
import * as THREE from 'three'

const rollOverGeo = new THREE.BoxGeometry( 1, 1, 1 )
const rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0, transparent: true } )
const rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial )
rollOverMesh.name = 'rollOverBox'

const initialState = {
    meshes: [rollOverMesh],
    collisionValid: false,
    currentTexture: 'dirt',
    pointerLocked: false
}

const reducer = (state, action) => {
    const actions = {
        updateMeshes: function() { 
            return {...state, meshes: [...state?.meshes, action.newMesh] }
        },
        updateCollision: () => { 
            return {...state, collisionValid: action.newCollisionState }
        },
        updateTexture: () => { 
            return {...state, currentTexture: action.newTexture }
        },
        updateLockedStatus: () => {
            return {...state, pointerLocked: action.newLockedStatus }
        },
        updateMeshesFromArray: () => { 
            if(state) {
                return {...state, meshes: [...state?.meshes, ...action.newMeshes ] }
            }
        }
    }
    return actions[action.type]();
}

export const sceneStatus = createContext(initialState)

const SceneStatus = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <sceneStatus.Provider value={{state, dispatch}}>
            {props.children}
        </sceneStatus.Provider>
    )
}

export default SceneStatus