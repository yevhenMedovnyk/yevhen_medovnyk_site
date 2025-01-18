import React from 'react';
import s from './Album.module.scss';
import useGetImages from '../../hooks/useGetImages';
import { useParams } from 'react-router';

const Album: React.FC = () => {
	const { '*': albumPath } = useParams();
	const images = useGetImages(albumPath || '');

	console.log('images', images);

	return (
		<div className={s.album}>
			<h1>Album</h1>
		</div>
	);
};

export default Album;
