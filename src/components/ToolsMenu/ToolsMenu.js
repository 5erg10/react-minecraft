import './styles.css';
import { useContext } from 'react';
import { sceneStatus } from '../../context/SceneStatusProvider';
import images from '../../images/images';

const ToolsMenu = () => {

    const {updateTexture} = useContext(sceneStatus)

    return <div className='mainMenuBox'>
        <div className='materialsListBox'>
            {images.map((image) => (
                <div key={image.name} onClick={() => updateTexture(image.name)}>
                    <img src={image.image}></img>
                </div>
            ))}
        </div>
    </div>
}

export default ToolsMenu;