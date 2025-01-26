import React from 'react';
import s from './Folder.module.scss';
import { Link } from 'react-router-dom';
import { IFolder } from '../../types/IFolder';

const Folder: React.FC<IFolder> = ({ cover_img, name, link, _id }) => {
	return (
		<div className={s.container}>
			<Link to={`/${link}/${_id}`} className={s.imgLink}>
				<img src={`data:image/webp;base64,${cover_img}`} alt="album_cover" />
			</Link>
			<Link to={link} className={s.title}>
				<span>{name}</span>
			</Link>
		</div>
	);
};

export default Folder;
