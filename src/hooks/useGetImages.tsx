//import { useEffect, useState } from 'react';
//import { storage } from '../firebase';
//import { getDownloadURL, getMetadata, list, ref } from 'firebase/storage';

//interface ImagesUrl {
//  url: string;
//  id: string;
//  name: string;
//}

//export default function useGetImages(folderPath: string) {
//  const [imagesUrl, setImagesUrl] = useState<ImagesUrl[]>([]);
//  const [loading, setLoading] = useState(false);
//  const [hasMore, setHasMore] = useState(true);
//  const [pageToken, setPageToken] = useState<string | null>(null);

//  const getImages = async (pageToken: string | null = null) => {
//    if (loading || !hasMore) return; // Prevent redundant requests

//    setLoading(true);

//    const storageRef = ref(storage, folderPath);

//    try {
//      const res = await list(storageRef, {
//        maxResults: 4,
//        pageToken,
//      });

//      const newImages: ImagesUrl[] = [];
//      const existingIds = new Set(imagesUrl.map((img) => img.id)); // Keep track of already loaded IDs

//      for (const item of res.items) {
//        const url = await getDownloadURL(item);
//        const metadata = await getMetadata(item);
//        const id = metadata?.customMetadata?.id;
//        const name = metadata?.customMetadata?.name;

//        if (id && name && !existingIds.has(id)) {
//          newImages.push({ url, id, name });
//        }
//      }

//      if (newImages.length > 0) {
//        setImagesUrl((prev) => [...prev, ...newImages]); // Add new images to the existing list
//      }

//      setHasMore(res.nextPageToken !== undefined); // Check if there's more content
//      setPageToken(res.nextPageToken || null); // Update page token
//    } catch (error) {
//      console.error(error);
//    } finally {
//      setLoading(false);
//    }
//  };

//  // Use setInterval to fetch images every 500 ms
//  useEffect(() => {
//    if (!hasMore || loading) return;

//    const interval = setInterval(() => {
//      getImages(pageToken); // Load images every 500ms
//    }, 500);

//    return () => clearInterval(interval); // Cleanup the interval on unmount or when loading or hasMore changes
//  }, [loading, pageToken, hasMore]);

//  // Optionally load images on first render if you prefer
//  useEffect(() => {
//    if (imagesUrl.length === 0) {
//      getImages(); // Load the first batch of images if empty
//    }
//  }, [imagesUrl]);

//  return imagesUrl;
//}

import { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, getMetadata, list, ref } from 'firebase/storage';

interface ImagesUrl {
	url: string;
	id: string;
	name: string;
}

export default function useGetImages(folderPath: string) {
	const [imagesUrl, setImagesUrl] = useState<ImagesUrl[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [pageToken, setPageToken] = useState<string | null>(null);

	const getImages = async (pageToken: string | null = null) => {
		if (loading || !hasMore) return; // Prevent redundant requests

		setLoading(true);

		const storageRef = ref(storage, folderPath);

		try {
			const res = await list(storageRef, {
				maxResults: 4,
				pageToken,
			});

			const newImages: ImagesUrl[] = [];
			const existingIds = new Set(imagesUrl.map((img) => img.id)); // Keep track of already loaded IDs

			for (const item of res.items) {
				const url = await getDownloadURL(item);
				const metadata = await getMetadata(item);
				const id = metadata?.customMetadata?.id;
				const name = metadata?.customMetadata?.name;

				if (id && name && !existingIds.has(id)) {
					newImages.push({ url, id, name });
				}
			}

			if (newImages.length > 0) {
				setImagesUrl((prev) => [...prev, ...newImages]); // Add new images to the existing list
			}

			setHasMore(res.nextPageToken !== undefined); // Check if there's more content
			setPageToken(res.nextPageToken || null); // Update page token
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	// Use setInterval to fetch images every 500 ms
	useEffect(() => {
		if (!hasMore || loading) return;

		const interval = setInterval(() => {
			getImages(pageToken);
		}, 100);

		return () => clearInterval(interval); // Cleanup the interval on unmount or when loading or hasMore changes
	}, [loading, pageToken, hasMore]);

	// Optionally load images on first render if you prefer
	useEffect(() => {
		if (imagesUrl.length === 0) {
			getImages(); // Load the first batch of images if empty
		}
	}, [imagesUrl]);

	return imagesUrl;
}
