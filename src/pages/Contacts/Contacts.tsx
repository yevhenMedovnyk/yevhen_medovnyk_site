import React from 'react';
import s from './Contacts.module.scss';
import SocialNetLinksList from '../../components/SocialNetLinks/SocialNetLinks';

const Contacts: React.FC = () => {
	return (
		<div className={s.container}>
			<p className={s.title}>
				Якщо ви маєте будь-які питання чи пропозиції, будь ласка,
				<br /> зв’яжіться зі мною зручним для вас способом:
			</p>
			<SocialNetLinksList variant="imgIcon" />
		</div>
	);
};

export default Contacts;
