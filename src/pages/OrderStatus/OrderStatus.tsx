import React, { useEffect } from 'react';
import { useGetOrderDataQuery } from '../../redux/checkoutApi';
import Cookies from 'js-cookie';

import s from './OrderStatus.module.scss';

import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { AiOutlineDownCircle } from 'react-icons/ai';
import { Link } from 'react-router';

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
					<AiOutlineDownCircle className={s.successIcon} />
					<span className={s.successText}>
						<b>Замовлення успішно прийнято!</b>
					</span>
					<div className={s.productInfo}>
						<span>
							<b>Номер замовлення:</b> {data?.result.basket_id}
						</span>
						<span>
							<b>Назва товару:</b> {data?.result.products[0].name}
						</span>
						<span>
							<b>Сума:</b> {data?.result.amount}
						</span>
					</div>
				</>
			) : (
				<>
					<span className={s.errText}>
						<b>Ууупс, щось пішло не так:</b> {data?.result.generalStatus} <br />
						<b>Спробуйте ще раз!</b>
					</span>
					<AiOutlineExclamationCircle className={s.errIcon} />
				</>
			)}
			<Link className={s.backLink} to="/store">
				Повернутися до магазину
			</Link>
		</div>
	);
};

export default OrderStatus;
