import React from 'react';
import { Link } from 'react-router';

import s from './SocialNetLinks.module.scss';

import { FaInstagram, FaWhatsapp, FaTelegram } from 'react-icons/fa';

import inst from './../../assets/social_networks/inst.svg';
import tg from './../../assets/social_networks/telegram.svg';
import whatsapp from './../../assets/social_networks/whatsapp.svg';

interface ISocialNetLinksProps {
	variant?: string;
}

interface INetworkLinks {
	FaIcon: React.ReactElement;
	ImgIcon: string;
	link: string;
}

const NetworkLinks: INetworkLinks[] = [
	{
		FaIcon: <FaTelegram />,
		ImgIcon: tg,
		link: 'https:///t.me/med_yevhen',
	},
	{
		FaIcon: <FaWhatsapp />,
		ImgIcon: whatsapp,
		link: 'https://wa.me/+380668053222',
	},

	{
		FaIcon: <FaInstagram />,
		ImgIcon: inst,
		link: 'https://www.instagram.com/med_yevhen/',
	},
];

const SocialNetLinksList: React.FC<ISocialNetLinksProps> = ({ variant }) => {
	return (
		<div style={variant === 'imgIcon' ? { border: 'none' } : {}} className={s.container}>
			{NetworkLinks.map(({ FaIcon, ImgIcon, link }) => (
				<Link className={s.link} key={link} to={link} target="_blank" rel="noopener noreferrer">
					{variant === 'imgIcon' ? <img src={ImgIcon} alt="icon" /> : FaIcon}
				</Link>
			))}
		</div>
	);
};

export default SocialNetLinksList;
