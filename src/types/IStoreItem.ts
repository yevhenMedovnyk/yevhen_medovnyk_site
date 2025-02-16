import { IImage } from './IImage';

export interface IStoreItem {
	_id: number;
	code_product: number;
	name: string;
	imgs: IImage[];
	price: number;
	isFramed: boolean;
	quantity?: number;
	paper_info: string;
	size_with_borders: string;
	size_without_borders: string;
	captured_info: string;
	note: string;
}
