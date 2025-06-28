import React from 'react';
import s from './ClientOrder.module.scss';
import { IOrder } from '../../types/IOrder';
import Button from '../UI/Button/Button';
import { useUpdateOrderMutation } from '../../redux/ordersApi';
import { showSuccessToast } from '../UI/showSuccessToast';

const img =
	'https://res.cloudinary.com/yevhenmedovnyk/image/upload/v1749226825/albums/u02rtnm59et3gqz618yq.webp';

const ClientOrder: React.FC<IOrder> = ({
	_id: order_id,
	amount,
	comment,
	deliveryRecipientInfo,
	mainClientInfo,
	products,
	delivery_branch_address,
	dateCreate,
	basket_id: order_number,
	tracking_number,
}) => {
	const [inputTTNValue, setInputTTNValue] = React.useState(tracking_number || '');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputTTNValue(event.target.value);
	};

	const [updateTrackingNumber, { isLoading }] = useUpdateOrderMutation();

	const handleUpdateTTN = async () => {
		try {
			await updateTrackingNumber({ order_id, tracking_number: inputTTNValue }).unwrap();
			console.log('ТТН оновлено');
			showSuccessToast('ТТН оновлено');
		} catch (error) {
			console.error('Помилка оновлення ТТН:', error);
			showSuccessToast('Помилка оновлення ТТН');
		}
	};

	return (
		<div className={s.orderWrapper}>
			<div className={s.orderNumber}>
				<span>Замовлення №:</span> {order_number}
			</div>
			<div className={s.totalAmount}>
				<span>Загальна сума:</span> {amount} грн
			</div>
			<div className={s.container}>
				<div className={s.productsContainer}>
					{products.map((product) => (
						<div key={product._id}>
							<div className={s.name}>
								<span>Назва:</span> {product.name}
							</div>
							<div className={s.price}>
								<span>Ціна:</span> {product.price} грн
							</div>
							<div className={s.orderImg}>
								<img src={img} alt="album_cover" />
							</div>
						</div>
					))}
				</div>
				<div className={s.orderInfo}>
					<div className={s.deliveryInfo}>
						<div>
							<span>Адреса доставки:</span> {delivery_branch_address}
						</div>
						<div className={s.name}>
							<span>Клієнт:</span>{' '}
							{deliveryRecipientInfo.first_name + ' ' + deliveryRecipientInfo.last_name}
						</div>
						<div>
							<span>Телефон:</span> {deliveryRecipientInfo.phoneNumber}
						</div>
						<div>
							<span>Пошта:</span> {mainClientInfo.email?.toLocaleLowerCase()}
						</div>
					</div>
					<div>
						<span>Дата замовлення:</span> {dateCreate}
					</div>
					<div>
						<span>Коментар:</span> {comment}
					</div>
					<div className={s.trackingNumber}>
						<span>ТТН:</span>{' '}
						<input
							className={s.inputTTN}
							onChange={handleInputChange}
							type="text"
							value={inputTTNValue}
							placeholder="Введіть номер ТТН"
						/>
						<Button
							name="Відправити"
							class_name="order"
							onClick={handleUpdateTTN}
							disabled={isLoading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClientOrder;
