import React from 'react';
import s from './ClientOrders.module.scss';
import { useGetOrdersQuery } from '../../redux/ordersApi';

const ClientOrders = () => {
	const { data: clientOrders } = useGetOrdersQuery();

	console.log('clientOrders', clientOrders);

	return <div className={s.container}>ClientOrders</div>;
};

export default ClientOrders;
