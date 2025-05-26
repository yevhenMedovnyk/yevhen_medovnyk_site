import { useMediaQuery as useQuery } from 'react-responsive';

export const useMediaQuery = () => {
	const isMobile = useQuery({ query: '(max-width: 576px)' });
	const isSmallTablet = useQuery({ query: '(max-width: 768px)' });
	const isTablet = useQuery({ query: '(max-width: 999px)' });
	const isDesktop = useQuery({ query: '(max-width: 1280px)' });
	return {
		isMobile,
		isSmallTablet,
		isTablet,
		isDesktop,
	};
};

export default useMediaQuery;
