import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { sceneStatus } from '../../context/SceneStatusProvider';
import images from '../../images/images';

let menuStatus = false;

const ToolsMenu = () => {
    
    const {state, dispatch} = useContext(sceneStatus)

    const [menuOpened, updateMenuStatus] = useState(false)
    
    const openMenu = (e) => {
        if(e.code === 'KeyI') {
            menuStatus = !menuStatus
            updateMenuStatus(menuStatus)
        }

        if(e.code === 'Enter' || e.code === 'KeyI') {
            dispatch({type: 'updateLockedStatus', newLockedStatus: !menuStatus})
        }
    }

    useEffect(() => {
       document.addEventListener('keyup', openMenu)
        return () => {
            document.removeEventListener('keyup', openMenu)
        }
    }, [])

    return (
        <div className={menuOpened ? 'mainMenuBox mainMenuBoxOpen' : 'mainMenuBox'}>
            <div className='materialsTitle'>Materials</div>
            <div className='materialsListBox'>
                {images.map((image) => (
                    <div key={image.name} onClick={() => dispatch({type: 'updateTexture', newTexture: (image.name)})} className={state?.currentTexture === image.name ? 'activeTexture' : ''}>
                        <img src={image.image}></img>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ToolsMenu;