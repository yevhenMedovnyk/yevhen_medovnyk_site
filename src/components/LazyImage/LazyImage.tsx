import React, { useRef } from 'react';
import s from './LazyImage.module.scss';
import { ClipLoader } from 'react-spinners';

interface LazyImageProps {
	img: string;
	alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ img, alt }) => {
	//const [isInView, setIsInView] = useState(false);
	const imageRef = useRef<HTMLDivElement>(null);

	//useEffect(() => {
	//	const observer = new IntersectionObserver(
	//		([entry]) => {
	//			if (entry.isIntersecting) {
	//				console.log(entry);

	//				setIsInView(true); // Mark image as in view and load it
	//				observer.disconnect(); // Disconnect observer after image is loaded
	//			}
	//		},
	//		{
	//			rootMargin: '50px', // Trigger loading images when they are 200px from entering the viewport
	//		}
	//	);

	//	if (imageRef.current) {
	//		observer.observe(imageRef.current);
	//	}

	//	return () => {
	//		observer.disconnect();
	//	};
	//}, []);

	return (
		<div ref={imageRef} className={s['image-container']}>
			{img ? (
				<img src={`data:image/webp;base64,${img}`} alt={alt} className={s['lazy-loaded-image']} />
			) : (
				<div className={s['loading-placeholder']}>
					<ClipLoader color="#b0bab8" size={50} />
				</div>
			)}
		</div>
	);
};

export default LazyImage;
