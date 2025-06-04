import React, { useEffect, useState } from 'react';
import s from './LazyImage.module.scss';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import { TiDelete } from 'react-icons/ti';
import { useAddImageDescriptionMutation, useGetImageQuery } from '../../redux/imagesApi';
import clsx from 'clsx';
import Button from '../UI/Button/Button';

interface LazyImageProps {
	imageId?: string;
	img?: string;
	alt: string;
	width?: number;
	height?: number;
	onClickDelete?: () => void;
	editMode?: boolean;
	description?: string;
}

const LazyImage: React.FC<LazyImageProps> = React.memo(
	({ img, imageId = '', alt, onClickDelete, width, height, editMode = false, description }) => {
		const { ref, inView } = useInView({
			threshold: 0.1,
			triggerOnce: true,
		});

		const [loadImage, setLoadImage] = useState(false);
		const [imageDesc, setImageDesc] = useState(description || '');

		// Збережи URL зображення у локальному стейті, щоб він не змінювався без потреби
		const [stableImgSrc, setStableImgSrc] = useState<string | undefined>(img);

		const shouldFetch = !img && loadImage && !!imageId;

		// Отримуємо зображення з бекенду (Cloudinary URL)
		const {
			data: image,
			isLoading,
			error,
		} = useGetImageQuery(imageId, {
			skip: !shouldFetch,
		});

		useEffect(() => {
			if (inView) setLoadImage(true);
		}, [inView]);

		// Коли отримуємо нове зображення, встановлюємо URL в локальний стейт
		useEffect(() => {
			if (image?.img && image.img !== stableImgSrc) {
				setStableImgSrc(image.img);
			}
		}, [image?.img, stableImgSrc]);

		if (error) {
			console.error(error);
		}

		const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setImageDesc(e.target.value);
		};

		const [saveDesc, { isLoading: isDescLoading, isSuccess }] = useAddImageDescriptionMutation();

		return (
			<div ref={ref} className={s.imageContainer}>
				{onClickDelete && <TiDelete className={s.deleteIcon} onClick={onClickDelete} />}
				{!isLoading && stableImgSrc ? (
					<img
						src={stableImgSrc}
						alt={image?.name || alt}
						className={clsx(s.image, editMode && s.editMode)}
						width={width}
						height={height}
					/>
				) : (
					<div
						className={s.placeholder}
						style={width && height ? { aspectRatio: `${width} / ${height}` } : {}}
					>
						<ClipLoader color="#b0bab8" size={50} />
					</div>
				)}
				{editMode && imageId ? (
					<>
						<textarea
							className={s.descriptionInput}
							value={imageDesc}
							onChange={handleDescriptionChange}
						/>
						<Button
							name={isSuccess ? 'Збережено' : 'Зберегти'}
							class_name="addDesc"
							onClick={() => saveDesc({ imageId, description: imageDesc }).unwrap()}
							disabled={isDescLoading || !imageDesc || isSuccess}
						/>
					</>
				) : (
					<span className={s.description}>{image?.description}</span>
				)}
			</div>
		);
	}
);

LazyImage.displayName = 'LazyImage';

export default LazyImage;
