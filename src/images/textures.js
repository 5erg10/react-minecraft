import { NearestFilter, TextureLoader, RepeatWrapping } from 'three'

import images from './images'

const texturesList = images.reduce((acc, texture) => {
	acc[texture.name] = new TextureLoader().load(texture.image);
	acc[texture.name].magFilter = NearestFilter;
	acc[texture.name].wrapS = RepeatWrapping;
	acc[texture.name].wrapT = RepeatWrapping;
	return acc;
}, {});

export default texturesList;