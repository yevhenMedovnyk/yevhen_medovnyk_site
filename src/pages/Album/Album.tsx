import React from 'react';
import s from './Album.module.scss';
import { useParams } from 'react-router';
import Gallery from '../../components/Gallery/Gallery';

import { useGetImagesQuery } from '../../redux/imagesApi';

const Album: React.FC = () => {
	const { '*': albumPath } = useParams<{ '*': string }>();
	const albumId = albumPath?.split('/').pop();

	const { data: images = [] } = useGetImagesQuery(albumId);

	return (
		<div className={s.album}>
			<Gallery images={images} />
		</div>
	);
};

export default Album;
