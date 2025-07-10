import React from 'react';
import s from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { ICartItem } from '../types/ICartItem';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CiSquarePlus } from 'react-icons/ci';
import { CiSquareMinus } from 'react-icons/ci';

interface ICartItemProps {
	item: ICartItem;
	onIncrease: () => void;
	onDecrease: () => void;
	onRemove: () => void;
}

const CartItem: React.FC<ICartItemProps> = ({ item, onIncrease, onDecrease, onRemove }) => {
	const { _id, imgs, name, price, quantity_in_cart } = item;
	const itemTotal = price * quantity_in_cart;

	return (
		<div className={s.container}>
			<Link to={`/store/${_id}`} className={s.img}>
				<img src={imgs[0].img} alt={name} />
			</Link>
			<div className={s.info}>
				<div className={s.name}>{name}</div>
				{/*<div className={s.price}>Ціна: {price} грн</div>*/}
				<div className={s.quantityContainer}>
					<CiSquareMinus className={s.minusBtn} onClick={onDecrease} />
					<div className={s.quantityInputFake}>{quantity_in_cart}</div>
					<CiSquarePlus className={s.plusBtn} onClick={onIncrease} />
				</div>
			</div>

			<div className={s.itemTotal}>{itemTotal} грн</div>
			<button className={s.btn} onClick={onRemove}>
				<AiOutlineCloseCircle />
			</button>
		</div>
	);
};

export default CartItem;
