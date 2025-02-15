import React, { useEffect, useState } from 'react';
import s from './StoreItem.module.scss';
import { useInView } from 'react-intersection-observer';

import { Link } from 'react-router';
import { useGetProductByIdQuery } from '../../redux/storeApi';
import { ClipLoader } from 'react-spinners';

interface IStoreItemProps {
	productId: string;
	width?: number;
	height?: number;
	full_page?: boolean;
}

const StoreItem: React.FC<IStoreItemProps> = ({ productId, width, height }) => {
	const [loadImage, setLoadImage] = useState(false);

	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const {
		data: product,
		error,
		isLoading,
	} = useGetProductByIdQuery(productId, {
		skip: !loadImage || !productId,
	});

	console.log(product);

	const { _id, name, imgs, price, paper_info, size_with_borders, size_without_borders } =
		product || {};

	useEffect(() => {
		if (inView) {
			setLoadImage(true);
		}
	}, [inView]);

	if (error) {
		console.error(error);
	}

	return (
		<div ref={ref} className={s.StoreItemContainer}>
			{isLoading && !product ? (
				<div
					className={s.placeholder}
					style={{ aspectRatio: width && height && `${width} / ${height}` }}
				>
					<ClipLoader color="#b0bab8" size={50} />
				</div>
			) : (
				<>
					<Link to={`${_id}`} className={s.imgContainer}>
						<img className={s.img} src={imgs && imgs[0]?.img} alt={name} />
					</Link>
					<div className={s.textWrapper}>
						<Link to={`${_id}`}>
							<h2 className={s.name}>{name}</h2>
						</Link>
						<p className={s.paperInfo}>{paper_info}</p>
						<p className={s.size_with_borders}>{size_with_borders}</p>
						<p className={s.size_without_borders}> {size_without_borders}</p>
						<span className={s.price}>{price}$</span>
					</div>
				</>
			)}
		</div>
	);
};

export default StoreItem;
