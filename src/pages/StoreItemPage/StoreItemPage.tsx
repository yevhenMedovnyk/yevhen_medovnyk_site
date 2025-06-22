import React from 'react';
import s from './StoreItemPage.module.scss';
import StoreItem from '../../components/StoreItem/StoreItem';
import { useParams } from 'react-router';
import { useCheckoutMutation } from '../../redux/checkoutApi';

import Cookies from 'js-cookie';
import { IProduct } from '../../types/IProduct';

const StoreItemPage: React.FC = () => {
	const { product_id } = useParams();
	const [createOrder] = useCheckoutMutation();

	const onClickBuy = (product: IProduct) => {
		const order_ref = Date.now().toString();
		const body = {
			order_ref: order_ref,
			amount: product.price,
			count: 1,
			name: product.name,
			cnt: 1,
			price: product.price,
			code_product: product.code_product,
			//"code_checkbox": "3315974",
			product_img_src: product.imgs[0]?.img,
		};
		createOrder(body)
			.unwrap()
			.then((res) => {
				Cookies.set('last_order_ref', order_ref, { expires: 1 });
				if (res.result.redirect_url) {
					window.location.assign(res.result.redirect_url);
				}
			});
	};

	return (
		<div className={s.StoreItemPageContainer}>
			<StoreItem
				onClickBuy={onClickBuy}
				full_page
				productId={product_id as string}
				width={1060}
				height={1060}
			/>
		</div>
	);
};

export default StoreItemPage;
