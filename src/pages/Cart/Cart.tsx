import React from 'react';
import s from './Cart.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import { selectCartItems, selectCartTotal } from '../../selectors/cartSelectors';
import CartItem from '../../CartItem/CartItem';

const Cart = () => {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector(selectCartItems);
	const total = useAppSelector(selectCartTotal);
	//const itemCount = useAppSelector(selectCartItemCount);
	console.log('cart', cartItems);

	return (
		<div className={s.cart}>
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
		</div>
	);
};

export default Cart;
