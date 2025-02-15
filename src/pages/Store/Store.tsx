import React from 'react';
import s from './Store.module.scss';
import StoreItem from '../../components/StoreItem/StoreItem';
import { useGetProductIdsQuery } from '../../redux/storeApi';

const Store: React.FC = () => {
	const { data: productsIds } = useGetProductIdsQuery();

	return (
		<div className={s.storeContainer}>
			{productsIds?.map(({ _id, imgs }) => (
				<StoreItem key={_id} productId={_id} width={imgs[0].width} height={imgs[0].height} />
			))}
		</div>
	);
};

export default Store;
