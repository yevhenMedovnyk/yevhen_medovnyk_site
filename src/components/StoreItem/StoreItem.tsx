import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router';
import { useGetProductByIdQuery } from '../../redux/storeApi';
import { ClipLoader } from 'react-spinners';
import Swiper from '../Swiper/Swiper';
import s from './StoreItem.module.scss';
import Button from '../UI/Button/Button';

interface IStoreItemProps {
	productId: string;
	width?: number;
	height?: number;
	full_page?: boolean;
}

const StoreItem: React.FC<IStoreItemProps> = ({ productId, width, height, full_page }) => {
	const [loadImage, setLoadImage] = useState(false);
	const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

	const {
		data: product,
		error,
		isLoading,
	} = useGetProductByIdQuery(productId, {
		skip: !loadImage || !productId,
	});

	useEffect(() => {
		if (inView) setLoadImage(true);
	}, [inView]);

	if (error) {
		console.error(error);
	}

	const renderImageSection = () => {
		if (!product?.imgs) return null;

		return full_page ? (
			<div className={s.imgContainer}>
				<Swiper
					slidesPerView={1}
					spaceBetween={0}
					slidesPerGroup={1}
					loop={false}
					images={product.imgs}
				/>
			</div>
		) : (
			<Link to={`${product._id}`} className={s.imgContainer}>
				<img className={s.img} src={product.imgs[0]?.img} alt={product.name} />
			</Link>
		);
	};

	return (
		<div ref={ref} className={clsx(s.StoreItemContainer, full_page && s.fullPage)}>
			{isLoading && !product ? (
				<div
					className={s.placeholder}
					style={{ aspectRatio: width && height ? `${width} / ${height}` : 'auto' }}
				>
					<ClipLoader color="#b0bab8" size={50} />
				</div>
			) : (
				<>
					{renderImageSection()}
					<div className={clsx(s.textWrapper, full_page && s.fullPage)}>
						{full_page ? (
							<h2 className={s.name}>{product?.name}</h2>
						) : (
							<Link to={`${product?._id}`}>
								<h2 className={s.name}>{product?.name}</h2>
							</Link>
						)}
						{full_page && (
							<>
								<p className={s.isFramed}>
									Оформлення: <span>Без рами</span>
								</p>
								<span className={s.price}>{product?.price} грн</span>
							</>
						)}
						<div className={s.printInfo}>
							<p className={s.paperInfo}>{product?.paper_info}</p>
							<p className={s.size_with_borders}>{product?.size_with_borders}</p>
							{full_page && (
								<>
									<p className={s.size_without_borders}>{product?.size_without_borders}</p>
									<p className={s.captured_info}>{product?.captured_info}</p>
								</>
							)}
						</div>
						{full_page && <p className={s.note}>{product?.note}</p>}
						{!full_page && <span className={s.price}>{product?.price} грн</span>}
						{full_page && product && (
							<Button
								type="button"
								disabled={!product}
								name="Перейти до оформлення"
								onClick={() => {}}
								class_name="storeItem"
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default StoreItem;
