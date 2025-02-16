import React from 'react';
import s from './StoreItemPage.module.scss';
import StoreItem from '../../components/StoreItem/StoreItem';
import { useParams } from 'react-router';

const StoreItemPage = () => {
	const { product_id } = useParams();

	return (
		<div className={s.StoreItemPageContainer}>
			<StoreItem full_page productId={product_id as string} width={1060} height={1060} />
		</div>
	);
};

export default StoreItemPage;
