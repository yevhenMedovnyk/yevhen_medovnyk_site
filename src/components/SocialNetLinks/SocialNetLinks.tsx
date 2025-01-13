import React from 'react';
import { Link } from 'react-router';

import s from './SocialNetLinks.module.scss';

import { FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';

interface INetworkLinks {
	icon: React.ReactElement;
	link: string;
}

const NetworkLinks: INetworkLinks[] = [
	{
		icon: <FaTelegram />,

		link: 'https:///t.me/med_yevhen',
	},
	{
		icon: <FaWhatsapp />,

		link: 'https://wa.me/+380668053222',
	},

	{
		icon: <FaInstagram />,

		link: 'https://www.instagram.com/med_yevhen/',
	},
];
const SocialNetLinksList: React.FC = () => {
	return (
		<div className={s.container}>
			{NetworkLinks.map(({ icon, link }) => (
				<Link className={s.link} key={link} to={link} target="_blank" rel="noopener noreferrer">
					{icon}
				</Link>
			))}
		</div>
	);
};

export default SocialNetLinksList;
