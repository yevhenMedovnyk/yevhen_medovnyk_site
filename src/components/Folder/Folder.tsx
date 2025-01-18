import React from 'react';

import s from './Folder.module.scss';
import { Link } from 'react-router-dom';

interface IFolder {
	id: number;
	cover: string;
	title: string;
	link: string;
}
const Folder: React.FC<IFolder> = ({ cover, title, link }) => {
	return (
		<div className={s.container}>
			<Link to={`/${link}`} className={s.imgLink}>
				<img src={cover} alt="album_cover" />
			</Link>
			<Link to={link} className={s.title}>
				<span>{title}</span>
			</Link>
		</div>
	);
};

export default Folder;
