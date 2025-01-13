import React from 'react';
import Copyright from './Copyright/Copyright';
import s from './Footer.module.scss';
import SocialNetLinksList from '../SocialNetLinks/SocialNetLinks';
import FooterNavLinks from './FooterNavLinks/FooterNavLinks';

const Footer: React.FC = () => {
	return (
		<footer className={s.container}>
			<SocialNetLinksList />
			<FooterNavLinks />
			<Copyright />
		</footer>
	);
};

export default Footer;
