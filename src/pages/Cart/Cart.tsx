import React from 'react';
import s from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import {
	selectCartItemCount,
	selectCartItems,
	selectCartTotal,
} from '../../selectors/cartSelectors';
import CartItem from '../../components/CartItem/CartItem';
import Button from '../../components/UI/Button/Button';
import { useCheckoutMutation } from '../../redux/checkoutApi';

import Cookies from 'js-cookie';

import hungry_cat_icon from '../../assets/cart/hungry_cat_icon.png';

const Cart = () => {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector(selectCartItems);
	const total = useAppSelector(selectCartTotal);
	const [createOrder] = useCheckoutMutation();

	const itemsCount = useAppSelector(selectCartItemCount);
	console.log('cart', cartItems);

	const onClickBuy = () => {
		const order_ref = Date.now().toString();
		const body = {
			order_ref: order_ref,
			amount: total,
			count: itemsCount,
			products: cartItems,
			//"code_checkbox": "3315974",
		};

		createOrder(body)
			.unwrap()
			.then((res) => {
				Cookies.set('last_order_ref', order_ref, { expires: 1 });
				if (res.result.redirect_url) {
					window.location.assign(res.result.redirect_url);
				}
			})
			.catch((err) => {
				console.error('Помилка при створенні замовлення:', err);
			});
	};

	return (
		<div className={s.cart}>
			{cartItems.length === 0 ? (
				<div className={s.emptyCart}>
					<img className={s.emptyCartIcon} src={hungry_cat_icon} alt="hungry_cat_icon" />
					<h1 className={s.emptyCartTitle}>Ууупс, Ваш кошик порожній!</h1>
					<Link className={s.emptyCartLink} to="/store">
						Повернутись до магазину
					</Link>
				</div>
			) : (
				<>
					{cartItems.map((item) => (
						<CartItem
							key={item._id}
							item={item}
							onIncrease={() => dispatch(increaseQuantity(item._id))}
							onDecrease={() => dispatch(decreaseQuantity(item._id))}
							onRemove={() => dispatch(removeFromCart(item._id))}
						/>
					))}
					<div className={s.total}>
						<span>Загальна сума:</span>
						{total} грн
					</div>
					<Button name="Оформити замовлення" onClick={() => onClickBuy()} class_name="cart" />
				</>
			)}
		</div>
	);
};

export default Cart;
