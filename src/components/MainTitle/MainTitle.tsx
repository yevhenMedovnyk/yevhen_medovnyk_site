import React from 'react';
import s from './MainTitle.module.scss';
import { useLocation } from 'react-router';

interface ITitleList {
	id: number;
	title: string;
	match: string;
}

const TitleList: ITitleList[] = [
	{ id: 1, title: 'Галерея', match: '/' },
	{ id: 2, title: 'Магазин', match: '/store' },
	{ id: 3, title: 'Контакти', match: '/contacts' },
	{ id: 4, title: 'Про автора', match: '/about' },
];

const MainTitle: React.FC = () => {
	const { pathname } = useLocation();

	const currentTitle = TitleList.find(({ match }) => match === pathname);

	return <h1 className={s.container}>{currentTitle?.title}</h1>;
};

export default MainTitle;
