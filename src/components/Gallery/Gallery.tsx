import React from 'react';
import s from './Gallery.module.scss';
import LazyImage from '../LazyImage/LazyImage';
import clsx from 'clsx';

import { IImage } from '../../types/IImage';

interface GalleryProps {
	images: IImage[];
	variant?: string;
	onClickDeleteImage?: (index: number, id?: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, variant, onClickDeleteImage }) => {
	return (
		<div className={clsx(s.container, variant && s[variant])}>
			{images.map(({ img, _id, name }, index) => (
				<LazyImage
					key={_id || index}
					img={img}
					onClickDelete={onClickDeleteImage ? () => onClickDeleteImage(index, _id) : undefined}
					alt={name}
				/>
			))}
		</div>
	);
};

export default Gallery;
