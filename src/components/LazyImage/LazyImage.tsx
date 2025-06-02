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

const LazyImage: React.FC<LazyImageProps> = ({
	img,
	imageId = '',
	alt,
	onClickDelete,
	width,
	height,
	editMode = false,
	description,
}) => {
	const { ref, inView } = useInView({
		threshold: 0,
		triggerOnce: true,
	});

	const [loadImage, setLoadImage] = useState(false);
	const [imageDesc, setImageDesc] = useState(description || '');

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

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setImageDesc(e.target.value);
	};

	const [saveDesc, { isLoading: isDescLoading, isSuccess }] = useAddImageDescriptionMutation();

	return (
		<div ref={ref} className={s.imageContainer}>
			{onClickDelete && <TiDelete className={s.deleteIcon} onClick={onClickDelete} />}
			{!isLoading && (image?.img || img) ? (
				<img
					src={image?.img || img}
					alt={image?.name || alt}
					className={clsx(s.image, editMode && s.editMode)}
				/>
			) : (
				<div
					className={s.placeholder}
					style={{ aspectRatio: width && height && `${width} / ${height}` }}
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
};

export default LazyImage;
