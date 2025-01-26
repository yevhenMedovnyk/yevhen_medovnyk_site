import React, { useEffect } from 'react';
import s from './Gallery.page.module.scss';
import Folder from '../../components/Folder/Folder';

import { IFolder } from '../../types/IFolder';

const GalleryPage: React.FC = () => {
	const [galleryFolders, setGalleryFolders] = React.useState<IFolder[]>([]);

	useEffect(() => {
		const getGalleryFolders = async (): Promise<void> => {
			try {
				const res = await fetch('http://localhost:8080/', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}

				const data: IFolder[] = await res.json();
				setGalleryFolders(data);
			} catch (error) {
				console.error('Error fetching images:', error);
			}
		};
		getGalleryFolders();
	}, []);

	return (
		<div className={s.container}>
			{galleryFolders.map((folder) => (
				<Folder key={folder._id} {...folder} />
			))}
		</div>
	);
};

export default GalleryPage;
