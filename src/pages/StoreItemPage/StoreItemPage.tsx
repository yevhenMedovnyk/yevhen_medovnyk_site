import React from 'react';
import s from './StoreItemPage.module.scss';
import StoreItem from '../../components/StoreItem/StoreItem';
import { useParams } from 'react-router';

import { useGetProductByIdQuery } from '../../redux/storeApi';
import { IProduct } from '../../types/IProduct';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../redux/slices/cartSlice';

const StoreItemPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { product_id } = useParams();
	const { data: product } = useGetProductByIdQuery(product_id as string);

	const handleAddToCart = (product: IProduct) => {
		dispatch(
			addToCart({
				...product,
			})
		);
	};

	return (
		<div className={s.StoreItemPageContainer}>
			<StoreItem handleAddToCart={handleAddToCart} full_page product={product} />
		</div>
	);
};

export default StoreItemPage;
