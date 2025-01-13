import React from 'react';
import s from './Copyright.module.scss';

const Copyright: React.FC = () => {
	return (
		<div className={s.container}>
			<p>
				&copy; Євген Медовник
				<p />
				<p>
					Усі фотографії на цьому сайті підпадають під авторське право, <br />
					та будь-яке їх використання без згоди автора заборонено.
					<br />
				</p>
				<p>2024 - {new Date().getFullYear()}</p>
			</p>
		</div>
	);
};

export default Copyright;
