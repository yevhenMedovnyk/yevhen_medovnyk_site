import { IImage } from './IImage';

export interface IStoreItem {
	_id: number;
	name: string;
	imgs: IImage[];
	price: number;
	isLimited: boolean;
	paper_info: string;
	size_with_borders: string;
	size_without_borders: string;
	captured_info: string;
	note: string;
}
