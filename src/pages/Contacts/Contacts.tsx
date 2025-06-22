import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { contactFormSchema } from '../../schemas/contactForm.schema.ts';
import SocialNetLinksList from '../../components/SocialNetLinks/SocialNetLinks.tsx';
import s from './Contacts.module.scss';
import { useSendMailMutation } from '../../redux/mailApi.ts';
import Button from '../../components/UI/Button/Button.tsx';
import { showErrorToast } from '../../components/UI/showErrorToast.ts';
import { showSuccessToast } from '../../components/UI/showSuccessToast.ts';

const Contacts: React.FC = () => {
	const [sendMail] = useSendMailMutation();
	const initialValues = {
		name: '',
		email: '',
		message: '',
	};
	const onSubmit = async (
		values: typeof initialValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		try {
			const response = await sendMail(values).unwrap();
			showSuccessToast('Повідомлення надіслано');
			console.log('response', response);

			resetForm();
		} catch (error) {
			console.error('Помилка надсилання:', error);
			showErrorToast('Помилка надсилання повідомлення');
		}
	};

	return (
		<div className={s.container}>
			<div className={s.title}>
				Якщо ви маєте будь-які питання чи пропозиції, будь ласка,
				<br /> зв’яжіться зі мною зручним для вас способом:
			</div>
			<SocialNetLinksList variant="imgIcon" />
			<Formik
				initialValues={initialValues}
				validationSchema={contactFormSchema}
				onSubmit={onSubmit}
			>
				{() => (
					<Form className={s.form}>
						<div className={s.inputContainer}>
							<Field
								className={s.input}
								type="text"
								name="name"
								placeholder="Ваше ім'я"
								autoComplete="off"
							/>
							<ErrorMessage name="name" component="span" className={s.error} />
						</div>
						<div className={s.inputContainer}>
							<Field
								className={s.input}
								name="email"
								placeholder="Ваша електронна пошта"
								autoComplete="off"
							/>
							<ErrorMessage name="email" component="span" className={s.error} />
						</div>
						<div className={s.textareaContainer}>
							<Field
								cols={30}
								rows={10}
								className={s.textarea}
								name="message"
								placeholder="Введіть ваше повідомлення"
								autoComplete="off"
								as="textarea"
							/>
							<ErrorMessage name="message" component="span" className={s.error} />
						</div>
						<Button type="submit" name="Надіслати" class_name="contactPage" />
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Contacts;
