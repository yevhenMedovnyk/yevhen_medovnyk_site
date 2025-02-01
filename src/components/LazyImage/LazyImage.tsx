import React, { useRef } from 'react';
import s from './LazyImage.module.scss';
import { ClipLoader } from 'react-spinners';

interface LazyImageProps {
	img: string;
	alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ img, alt }) => {
	const imageRef = useRef<HTMLDivElement>(null);

	return (
		<div ref={imageRef} className={s['image-container']}>
			{img ? (
				<img src={img} alt={alt} className={s['lazy-loaded-image']} />
			) : (
				<div className={s['loading-placeholder']}>
					<ClipLoader color="#b0bab8" size={50} />
				</div>
			)}
		</div>
	);
};

export default LazyImage;
