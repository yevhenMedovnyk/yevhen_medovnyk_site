import React, { useEffect, useState } from 'react';
import s from './LazyImage.module.scss';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import { TiDelete } from 'react-icons/ti';
import { useGetImageQuery } from '../../redux/imagesApi';

interface LazyImageProps {
	imageId?: string;
	img?: string;
	alt: string;
	width?: number;
	height?: number;
	onClickDelete?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
	img,
	imageId = '',
	alt,
	onClickDelete,
	width,
	height,
}) => {
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const [loadImage, setLoadImage] = useState(false);

	// ❗ Виконуємо запит тільки якщо `loadImage === true`
	const {
		data: image,
		isLoading,
		error,
	} = useGetImageQuery(imageId, {
		skip: !loadImage || !imageId,
	});

	useEffect(() => {
		if (inView) {
			setLoadImage(true);
		}
	}, [inView]);

	if (error) {
		console.error(error);
	}

	return (
		<div ref={ref} className={s.imageContainer}>
			{onClickDelete && <TiDelete className={s.deleteIcon} onClick={onClickDelete} />}
			{!isLoading && (image?.img || img) ? (
				<img src={image?.img || img} alt={image?.name || alt} className={s.image} />
			) : (
				<div
					className={s.placeholder}
					style={{ aspectRatio: width && height && `${width} / ${height}` }}
				>
					<ClipLoader color="#b0bab8" size={50} />
				</div>
			)}
		</div>
	);
};

export default LazyImage;
