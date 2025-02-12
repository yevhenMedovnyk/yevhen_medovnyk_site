import React from 'react';
import s from './Gallery.page.module.scss';
import Folder from '../../components/Folder/Folder';

import { useDeleteAlbumMutation, useGetAlbumsQuery } from '../../redux/albumsApi';
import { Link } from 'react-router';
import { useAppSelector } from '../../hooks/redux';

const GalleryPage: React.FC = () => {
	const { data: galleryAlbums = [] } = useGetAlbumsQuery();
	const [deleteAlbum] = useDeleteAlbumMutation();
	const { isAdmin } = useAppSelector((state) => state.auth.user);

	const handleDeleteFolder = (id: number) => {
		deleteAlbum(id);
	};

	return (
		<>
			{isAdmin && (
				<Link to="/create-album" className={s.createAlbumBtn}>
					Створити альбом
				</Link>
			)}
			<div className={s.container}>
				{galleryAlbums.map((folder) => (
					<Folder key={folder._id} {...folder} deleteFolder={handleDeleteFolder} />
				))}
			</div>
		</>
	);
};

export default GalleryPage;
