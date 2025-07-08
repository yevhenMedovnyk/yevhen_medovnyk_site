import React from 'react';
import s from './Cart.module.scss';
import { useAppSelector } from '../../hooks/redux';

const Cart = () => {
	const cart = useAppSelector((state) => state.cart.items);
	console.log('cart', cart);

	return <div className={s.cart}>Cart</div>;
};

export default Cart;
