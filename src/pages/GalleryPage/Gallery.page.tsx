import React from 'react';
import s from './Gallery.page.module.scss';
import Folder from '../../components/Folder/Folder';

import { useDeleteFolderMutation, useGetFoldersQuery } from '../../redux/foldersApi';
import { Link } from 'react-router';
import { useAppSelector } from '../../hooks/redux';

const GalleryPage: React.FC = () => {
	const { data: galleryFolders = [] } = useGetFoldersQuery();
	const [deleteFolder] = useDeleteFolderMutation();
	const { isAdmin } = useAppSelector((state) => state.auth.user);

	const handleDeleteFolder = (id: number) => {
		deleteFolder(id);
	};

	return (
		<>
			{isAdmin && (
				<Link to="/create-album" className={s.createAlbumBtn}>
					Створити альбом
				</Link>
			)}
			<div className={s.container}>
				{galleryFolders.map((folder) => (
					<Folder key={folder._id} {...folder} deleteFolder={handleDeleteFolder} />
				))}
			</div>
		</>
	);
};

export default GalleryPage;
