import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/IProduct';
import { ICartItem } from '../../types/ICartItem';

interface CartState {
	items: ICartItem[];
}

// Завантаження корзини з localStorage
const loadCartFromLocalStorage = (): ICartItem[] => {
	try {
		const serializedCart = localStorage.getItem('cart');
		return serializedCart ? JSON.parse(serializedCart) : [];
	} catch (error) {
		console.error('Не вдалося завантажити корзину з localStorage:', error);
		return [];
	}
};

// Збереження корзини в localStorage
const saveCartToLocalStorage = (cart: ICartItem[]) => {
	try {
		const serializedCart = JSON.stringify(cart);
		localStorage.setItem('cart', serializedCart);
	} catch (error) {
		console.error('Не вдалося зберегти корзину в localStorage:', error);
	}
};

const initialState: CartState = {
	items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// Додаємо товар у корзину
		addToCart: (state, action: PayloadAction<IProduct>) => {
			const existingItem = state.items.find((item) => item._id === action.payload._id);
			if (existingItem) {
				existingItem.quantity_in_cart += 1;
			} else {
				state.items.push({ ...action.payload, quantity_in_cart: 1 });
			}
			saveCartToLocalStorage(state.items);
		},

		// Видаляємо товар повністю
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item._id !== action.payload);
			saveCartToLocalStorage(state.items);
		},

		// Зменшуємо кількість товару
		decreaseQuantity: (state, action: PayloadAction<number>) => {
			const item = state.items.find((item) => item._id === action.payload);
			if (item && item.quantity_in_cart > 1) {
				item.quantity_in_cart -= 1;
			} else {
				state.items = state.items.filter((item) => item._id !== action.payload);
			}
			saveCartToLocalStorage(state.items);
		},

		// Збільшуємо кількість товару
		increaseQuantity: (state, action: PayloadAction<number>) => {
			const item = state.items.find((item) => item._id === action.payload);
			if (item) {
				item.quantity_in_cart += 1;
			}
			saveCartToLocalStorage(state.items);
		},

		// Очищаємо корзину повністю
		clearCart: (state) => {
			state.items = [];
			saveCartToLocalStorage([]);
		},
	},
});

export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
