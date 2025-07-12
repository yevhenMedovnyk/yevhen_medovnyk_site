import React from 'react';
import s from './StoreItemPage.module.scss';
import StoreItem from '../../components/StoreItem/StoreItem';
import { Link, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/storeApi';
import { IProduct } from '../../types/IProduct';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { showSuccessToast } from '../../components/UI/showSuccessToast';
import { ClipLoader } from 'react-spinners';

const StoreItemPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { product_id } = useParams();

	const {
		data: product,
		isLoading,
		isError,
	} = useGetProductByIdQuery(product_id ?? '', {
		skip: !product_id,
	});

	if (!product_id) return <div>Помилка: відсутній ID товару</div>;

	if (isLoading)
		return (
			<div className={s.spinnerWrapper}>
				<ClipLoader color="#b0bab8" size={50} />
			</div>
		);
	if (isError || !product) return <div>Помилка при завантаженні товару</div>;

	const handleAddToCart = (product: IProduct): void => {
		dispatch(addToCart(product));
		showSuccessToast(
			'Товар додано!',
			<Link to="/cart" className={s.toastLink}>
				→ Перейти до кошика
			</Link>,
			5000
		);
	};

	return (
		<div className={s.StoreItemPageContainer}>
			<StoreItem handleAddToCart={handleAddToCart} full_page product={product} />
		</div>
	);
};

export default StoreItemPage;
