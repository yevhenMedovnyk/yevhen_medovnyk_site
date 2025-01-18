import React from 'react';
import s from './Gallery.page.module.scss';
import Folder from '../../components/Folder/Folder';

import { folders } from '../../mockData/folders';

const GalleryPage: React.FC = () => {
	return (
		<div className={s.container}>
			{folders.map((folder) => (
				<Folder key={folder.id} {...folder} />
			))}
		</div>
	);
};

export default GalleryPage;
