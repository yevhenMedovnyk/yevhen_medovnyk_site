import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { contactFormSchema } from '../../schemas/contactForm.schema.ts';
import SocialNetLinksList from '../../components/SocialNetLinks/SocialNetLinks';
import s from './Contacts.module.scss';

const Contacts: React.FC = () => {
	const initialValues = {
		name: '',
		email: '',
		message: '',
	};
	const onSubmit = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
		console.log('onSubmit', values);
		resetForm();
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
							<Field className={s.input} type="text" name="name" placeholder="Ваше ім'я" />
							<ErrorMessage name="name" component="span" className={s.error} />
						</div>
						<div className={s.inputContainer}>
							<Field className={s.input} name="email" placeholder="Ваша електронна пошта" />
							<ErrorMessage name="email" component="span" className={s.error} />
						</div>
						<div className={s.textareaContainer}>
							<Field
								cols={30}
								rows={10}
								className={s.textarea}
								name="message"
								placeholder="Введіть ваше повідомлення"
							/>
							<ErrorMessage name="message" component="span" className={s.error} />
						</div>
						<button className={s.button} type="submit">
							Надіслати
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Contacts;
