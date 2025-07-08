import React from 'react';
import s from './StoreItemPage.module.scss';
import StoreItem from '../../components/StoreItem/StoreItem';
import { useParams } from 'react-router';
//import { useCheckoutMutation } from '../../redux/checkoutApi';

//import Cookies from 'js-cookie';
//import { IProduct } from '../../types/IProduct';
import { useGetProductByIdQuery } from '../../redux/storeApi';
import { IProduct } from '../../types/IProduct';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../redux/slices/cartSlice';

const StoreItemPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { product_id } = useParams();
	//const [createOrder] = useCheckoutMutation();
	const { data: product } = useGetProductByIdQuery(product_id as string);

	const handleAddToCart = (product: IProduct) => {
		dispatch(
			addToCart({
				...product,
			})
		);
	};

	//const onClickBuy = (product: IProduct) => {
	//	const order_ref = Date.now().toString();
	//	const body = {
	//		order_ref: order_ref,
	//		amount: product.price,
	//		count: 1,
	//		name: product.name,
	//		cnt: 1,
	//		price: product.price,
	//		code_product: product._id,
	//		//"code_checkbox": "3315974",
	//		product_img_src: product.imgs[0]?.img,
	//	};

	//	createOrder(body)
	//		.unwrap()
	//		.then((res) => {
	//			Cookies.set('last_order_ref', order_ref, { expires: 1 });
	//			if (res.result.redirect_url) {
	//				window.location.assign(res.result.redirect_url);
	//			}
	//		})
	//		.catch((err) => {
	//			console.error('Помилка при створенні замовлення:', err);
	//		});
	//};

	return (
		<div className={s.StoreItemPageContainer}>
			<StoreItem handleAddToCart={handleAddToCart} full_page product={product} />
		</div>
	);
};

export default StoreItemPage;
