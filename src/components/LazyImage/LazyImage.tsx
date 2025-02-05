import React from 'react';
import s from './LazyImage.module.scss';
import { ClipLoader } from 'react-spinners';
import { TiDelete } from 'react-icons/ti';

interface LazyImageProps {
	img: string;
	alt: string;
	onClickDelete?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ img, alt, onClickDelete }) => {
	return (
		<div className={s['image-container']}>
			{onClickDelete && <TiDelete className={s.deleteIcon} onClick={onClickDelete} />}
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
