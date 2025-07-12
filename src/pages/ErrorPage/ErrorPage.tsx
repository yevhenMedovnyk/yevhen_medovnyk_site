import React from 'react';
import s from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';

import pirate_cat_icon from '../../assets/404page/pirate_cat_icon.png';

const ErrorPage = () => {
	return (
		<div className={s.errorPageContainer}>
			<img className={s.errorPageIcon} src={pirate_cat_icon} alt="404_image" />
			<h1 className={s.errorPageTitle}>Ууупс, таку сторінку не знайдено!</h1>
			<Link className={s.errorPageLink} to="/">
				Повернутись на головну
			</Link>
		</div>
	);
};

export default ErrorPage;
