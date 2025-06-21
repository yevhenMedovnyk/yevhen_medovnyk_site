import React, { useEffect } from 'react';
import { useGetOrderDataQuery } from '../../redux/checkoutApi';
import Cookies from 'js-cookie';

import s from './OrderStatus.module.scss';

import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { AiOutlineDownCircle } from 'react-icons/ai';

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
					<span className={s.successText}>Замовлення успішно прийнято!</span>
					<AiOutlineDownCircle className={s.successIcon} />
					<div className={s.productInfo}>
						<span>Номер замовлення: {data?.result.basket_id}</span>
						<span>Назва товару: {data?.result.products[0].name}</span>
						<span>Сума: {data?.result.amount}</span>
					</div>
					<div className={s.deliveryInfo}>
						<span>Дані для доставки:</span>
						<span>
							Отримувач: {data?.result.deliveryRecipientInfo.first_name}{' '}
							{data?.result.deliveryRecipientInfo.last_name}
						</span>
						<span>Номер телефону: {data?.result.deliveryRecipientInfo.phoneNumber}</span>
						<span>
							Адреса доставки: {data?.result.deliveryAddressInfo.cityName},{' '}
							{data?.result.delivery_method_desc}
						</span>
					</div>
				</>
			) : (
				<>
					<span className={s.errText}>
						Ууупс, щось пішло не так: {data?.result.generalStatus} <br />
						Спробуйте ще раз
					</span>
					<AiOutlineExclamationCircle className={s.errIcon} />
				</>
			)}
		</div>
	);
};

export default OrderStatus;
