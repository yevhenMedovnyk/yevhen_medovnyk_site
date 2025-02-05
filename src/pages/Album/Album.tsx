import React from 'react';
import s from './Album.module.scss';
import Gallery from '../../components/Gallery/Gallery';

import { useGetImagesQuery } from '../../redux/imagesApi';
import { useSearchParams } from 'react-router';

const Album: React.FC = () => {
	//const { '*': albumPath } = useParams<{ '*': string }>();
	//const albumId = albumPath?.split('/').pop();
	const [searchParams] = useSearchParams();
	const albumId = searchParams.get('albumId') as string;

	const { data: images = [] } = useGetImagesQuery(albumId);

	return (
		<div className={s.album}>
			<Gallery images={images} />
		</div>
	);
};

export default Album;
