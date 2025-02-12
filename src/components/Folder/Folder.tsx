import React from 'react';
import s from './Folder.module.scss';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { MdFolderDelete } from 'react-icons/md';

import { IFolder } from '../../types/IAlbum';
import { useAppSelector } from '../../hooks/redux';

type IFolderProps = IFolder & {
	deleteFolder: (id: number) => void;
};

const Folder: React.FC<IFolderProps> = ({ cover_img, name, link, _id, deleteFolder }) => {
	const { isAdmin } = useAppSelector((state) => state.auth.user);

	return (
		<div className={s.folder}>
			{isAdmin && (
				<div className={s.btns}>
					<Link to={`/create-edit-album?albumId=${_id}`} className={s.editBtn}>
						<BiEdit /> <span>Редагувати</span>
					</Link>
					<button
						onClick={
							_id
								? () => {
										deleteFolder(_id);
									}
								: () => {
										console.log('no id');
									}
						}
						className={s.deleteBtn}
					>
						<MdFolderDelete />
						<span>Видалити</span>
					</button>
				</div>
			)}
			<div className={s.container}>
				<Link to={`/${link}?albumId=${_id}`} className={s.imgLink}>
					<img src={cover_img} alt="album_cover" />
				</Link>
				<Link to={link} className={s.title}>
					<span className={s.albumName}>{name}</span>
				</Link>
			</div>
		</div>
	);
};

export default Folder;
