import React, { useEffect } from 'react';
import { useGetOrderDataQuery } from '../../redux/checkoutApi';
import Cookies from 'js-cookie';
import s from './OrderStatus.module.scss';
import { Link } from 'react-router-dom';

import pirate_cat_icon from '../../assets/404page/pirate_cat_icon.png';
import paper_cat_icon from '../../assets/order-status/paper_cat_icon.png';

const OrderStatus = () => {
	const [orderRef, setOrderRef] = React.useState('');

	useEffect(() => {
		const orderRef = Cookies.get('last_order_ref');
		if (orderRef) {
			setOrderRef(orderRef);
		}
	}, []);

	console.log('orderRef', orderRef);

	const { data } = useGetOrderDataQuery(orderRef, {
		skip: !orderRef,
	});

	console.log('data', data?.result);

	const isOrderSuccess = data?.result.generalStatus === 'success';

	return (
		<div className={s.container}>
			{isOrderSuccess ? (
				<>
					{' '}
					<img src={paper_cat_icon} alt="paper_cat_icon" className={s.icon} />
					<span className={s.successText}>
						Дякуємо!
						<br />
						Замовлення №{data?.result.basket_id}
						<br /> успішно прийняте!
					</span>
					<Link className={s.backLink} to="/store">
						Повернутись до магазину
					</Link>
				</>
			) : (
				<div className={s.errorStatusContainer}>
					<img className={s.icon} src={pirate_cat_icon} alt="404_image" />
					<span className={s.errorStatusText}>
						Ууупс, щось пішло не так: {data?.result.generalStatus}
					</span>
					<Link className={s.backLink} to="/store">
						Повернутись до магазину
					</Link>
				</div>
			)}
		</div>
	);
};

export default OrderStatus;
