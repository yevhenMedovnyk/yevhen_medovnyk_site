import React, { useEffect } from 'react';
import s from './Album.module.scss';
import { useParams } from 'react-router';
import Gallery from '../../components/Gallery/Gallery';

import { IImage } from '../../types/IImage';

const Album: React.FC = () => {
	const [albumImages, setAlbumImages] = React.useState<IImage[]>([]);
	const { '*': albumPath } = useParams<{ '*': string }>();
	const albumId = albumPath?.split('/').pop();

	useEffect(() => {
		if (!albumId) {
			return;
		}
		fetch(`http://localhost:8080/gallery?albumId=${albumId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data: IImage[]) => setAlbumImages(data))
			.catch((error) => console.error('Error fetching images:', error));
	}, [albumPath]);

	return (
		<div className={s.album}>
			<Gallery images={albumImages} />
		</div>
	);
};

export default Album;
