import React from 'react';
import s from './Gallery.module.scss';
import LazyImage from '../LazyImage/LazyImage';
import { IImage } from '../../types/IImage';

interface GalleryProps {
	images: IImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
	return (
		<div className={s.container}>
			{images.map(({ img, _id, name }) => (
				<LazyImage key={_id} img={img} alt={name} />
			))}
		</div>
	);
};

export default Gallery;
