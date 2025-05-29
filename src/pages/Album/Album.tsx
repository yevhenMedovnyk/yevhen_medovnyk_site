import React from 'react';
import s from './Album.module.scss';
import Gallery from '../../components/Gallery/Gallery';

import { useGetImageIdsQuery } from '../../redux/imagesApi';
import { useSearchParams } from 'react-router';

const Album: React.FC = () => {
	const [searchParams] = useSearchParams();
	const albumId = searchParams.get('id') as string;

	const { data: imageIdsObject = [] } = useGetImageIdsQuery(albumId);

	const imageIds = imageIdsObject.map(({ _id, width, height }) => ({
		_id,
		width: width,
		height: height,
	}));

	console.log(imageIds);

	return (
		<div className={s.album}>
			<Gallery imageIds={imageIds} />
		</div>
	);
};

export default Album;
