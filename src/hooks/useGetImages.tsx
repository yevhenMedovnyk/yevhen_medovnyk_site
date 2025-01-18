'use client';

import { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage';

interface ImagesUrl {
	url: string;
	id: string;
	name: string;
}

export default function useGetImages(folderPath: string) {
	const [imagesUrl, setImagesUrl] = useState<ImagesUrl[]>([]);

	const getImages = async () => {
		const storageRef = ref(storage, folderPath);

		try {
			const res = await listAll(storageRef);
			const uniqueImages = new Set<ImagesUrl>();

			for (const item of res.items) {
				const url = await getDownloadURL(item);
				const metadata = await getMetadata(item);
				const id = metadata?.customMetadata?.id;
				const name = metadata?.customMetadata?.name;

				if (id && name) {
					uniqueImages.add({ url, id, name });
				}
			}
			setImagesUrl(Array.from(uniqueImages));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getImages();
	}, []);

	return imagesUrl;
}
