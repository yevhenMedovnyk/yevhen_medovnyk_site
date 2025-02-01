import React from 'react';
import s from './Gallery.page.module.scss';
import Folder from '../../components/Folder/Folder';

import { useGetFoldersQuery } from '../../redux/foldersApi';
import { Link } from 'react-router';

const GalleryPage: React.FC = () => {
	const { data: galleryFolders = [] } = useGetFoldersQuery();

	return (
		<>
			<Link to="/create-album" className={s.createAlbumBtn}>
				Створити альбом
			</Link>
			<div className={s.container}>
				{galleryFolders.map((folder) => (
					<Folder key={folder._id} {...folder} />
				))}
			</div>
		</>
	);
};

export default GalleryPage;
