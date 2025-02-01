import React from 'react';
import s from './CreateAlbum.module.scss';
import { useCreateFolderMutation } from '../../redux/foldersApi';
import { useUploadImagesMutation } from '../../redux/imagesApi';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router';

const CreateAlbum: React.FC = () => {
	const navigate = useNavigate();
	const [addAlbum, { isLoading: isCreatingAlbum, isSuccess: isAlbumCreated }] =
		useCreateFolderMutation();
	const [uploadImages, { isLoading: isUploadingImages }] = useUploadImagesMutation(); // Додано новий запит для завантаження зображень

	const initialValues = {
		name: '',
		cover_img: null as File | null,
		link: 'album',
		album_images: [] as File[], // Масив файлів
	};

	const onSubmit = async (values: typeof initialValues) => {
		if (!values.cover_img) {
			alert('Будь ласка, оберіть обкладинку альбому');
			return;
		}

		const convertToBase64 = (file: File): Promise<string> => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = reject;
			});
		};

		try {
			// 1️⃣ Конвертація обкладинки
			const coverBase64 = await convertToBase64(values.cover_img);

			// 2️⃣ Відправка запиту на створення альбому
			const album = await addAlbum({
				name: values.name,
				link: values.link,
				cover_img: coverBase64,
			}).unwrap();

			// 🔍 Перевірка, чи є ID альбому
			if (!album || !album._id) {
				throw new Error('Не вдалося отримати ID альбому');
			}

			console.log('✅ Альбом створено');

			// 3️⃣ Перевіряємо, чи є додаткові зображення
			if (values.album_images && values.album_images.length > 0 && album._id) {
				const albumImages = await Promise.all(
					Array.from(values.album_images).map(async (file) => ({
						img: await convertToBase64(file),
						name: file.name,
						folder_id: album._id, // Додаємо ID альбому
					}))
				);

				// 4️⃣ Відправляємо масив зображень
				if (albumImages.length > 0) {
					const response = await uploadImages(albumImages).unwrap();
					console.log('✅ Зображення завантажені:', response);
				}
			}
			navigate('/');
		} catch (err) {
			console.error('❌ Помилка при створенні альбому:', err);
			alert('Не вдалося створити альбом. Спробуйте ще раз.');
		}
	};

	return (
		<div className={s.container}>
			<h1 className={s.title}>Створіть альбом</h1>
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{(formik) => (
					<Form className={s.form}>
						<div className={s.inputContainer}>
							<Field className={s.input} type="text" name="name" placeholder="Назва альбому" />
							<ErrorMessage name="name" component="span" className={s.error} />
						</div>

						<div className={s.inputContainer}>
							<label className={s.label}>Обкладинка альбому:</label>
							<input
								className={s.input}
								type="file"
								accept="image/*"
								onChange={(event) => {
									const file = event.target.files?.[0] || null;
									formik.setFieldValue('cover_img', file);
								}}
							/>
							<ErrorMessage name="cover_img" component="span" className={s.error} />
						</div>

						<div className={s.inputContainer}>
							<label className={s.label}>Додати зображення в альбом:</label>
							<input
								className={s.input}
								type="file"
								accept="image/*"
								multiple
								onChange={(event) => {
									const files = event.target.files ? Array.from(event.target.files) : [];
									formik.setFieldValue('album_images', files);
								}}
							/>
							<ErrorMessage name="album_images" component="span" className={s.error} />
						</div>

						<button
							disabled={isUploadingImages || isCreatingAlbum || isAlbumCreated}
							className={s.submitBtn}
							type="submit"
						>
							{isCreatingAlbum
								? 'Створюється альбом...'
								: isUploadingImages
									? 'Завантажуються зображення...'
									: 'Створити альбом'}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreateAlbum;
