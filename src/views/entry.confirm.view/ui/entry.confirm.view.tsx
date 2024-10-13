'use client';
import { Header } from '@/widgets/header';
import { DetailedHTMLProps, FC, InputHTMLAttributes, useState } from 'react';
import s from './entry.confirm.view.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Controls } from '@/widgets/controls';
import buttonStyles from '@/widgets/controls/ui/controls.module.scss';
import { Button, buttonTypes } from '@/shared/ui';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import moment from 'moment';
import 'moment/locale/ru';
import { useMutation, useQuery } from 'react-query';
import { mastersApi } from '@/shared/api/masters';
import { getFileUrl } from '@/shared/api/instance/instance';
import { servicesApi } from '@/shared/api/services';
import { ICreateBookingData, Service } from '@/shared/api/booking/types';
import { SubmitHandler, useForm, UseFormRegisterReturn } from 'react-hook-form';
import WebApp from '@twa-dev/sdk';
import ReactInputMask from 'react-input-mask';
import { bookingApi } from '@/shared/api/booking';
moment.locale('ru');

interface IEntryConfirmViewProps {}

type Inputs = {
	clientComment: string;
	clientName: string;
	clientPhone: string;
};

export const EntryConfirmView: FC<IEntryConfirmViewProps> = props => {
	const {} = props;

	const router = useRouter();
	const { clear, date, masterId, services, time, branch } = useAppointmentStore(state => state);

	const { data: activeMaster } = useQuery({
		queryKey: ['activeMaster', masterId],
		queryFn: () => mastersApi.getOne(masterId!),
		enabled: !!masterId,
	});

	const { data: servicesData } = useQuery({
		queryKey: ['Services'],
		queryFn: () => servicesApi.getList(),
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onChange',
	});
	const onSubmit: SubmitHandler<Inputs> = data => {
		const form: ICreateBookingData = {
			masterComment: data.clientComment,
			clientName: data.clientName,
			clientPhone: data.clientPhone,
			//@ts-ignore
			clientTelegramId: String(WebApp.initDataUnsafe.user.id),
			masterId: masterId!,
			salonBranchId: activeMaster?.data.salonBranchId!,
			salonId: activeMaster?.data.salonId!,
			servicesIdArray: services,
			//@ts-ignore
			time: moment(date).hours(+time.split(':')[0]).minutes(+time.split(':')[1]).toDate(),
		};

		createBookingMutation.mutate(form);
	};

	const createBookingMutation = useMutation({
		mutationFn: (data: ICreateBookingData) => bookingApi.create(data),
		onSuccess: () => {
			clear();
			router.push('/');
		},
	});

	let selectedServices: Service[] = [];
	servicesData?.data?.list?.forEach(item => {
		item.services.forEach(service => {
			if (services.includes(service.id)) selectedServices.push(service);
		});
	});

	const master = activeMaster?.data;
	const totalMinutes = selectedServices.reduce((value, service) => {
		return (value += service.time);
	}, 0);

	return (
		<div className={`${s.wrapper}`}>
			<Header withBack />

			<div className={`${s.main_info} container`}>
				<h1 className='h1'>Детали записи</h1>

				<div className={`${s.specialist} ${s.border_bottom}`}>
					<div className={s.avatar}>
						<Image
							width={56}
							height={56}
							alt='avatar'
							src={master?.avatar ? getFileUrl(master.avatar) : '/images/no_avatar.jpg'}
						/>
					</div>

					<div className={s.info}>
						<p>
							{master?.name} {master?.lastName}
						</p>
						<p>{master?.speciality}</p>
					</div>
				</div>

				<div className={`${s.price} ${s.border_bottom}`}>
					<Edit to='choice.service' />

					<h2 className={`${s.sub_title} h2`}>Услуги</h2>

					{selectedServices.map(service => (
						<div
							key={service.id}
							className={s.price_item}
						>
							<span>{service.name}</span>
							<span>{service.price} ₽</span>
						</div>
					))}
				</div>

				<div className={s.time}>
					<h2 className={`${s.sub_title} h2`}>Дата и время</h2>

					<div className={`${s.info} flex`}>
						<Edit to='choice.date' />

						<span className='flex'>
							<Image
								width={24}
								height={24}
								src={'/icons/calendar.svg'}
								alt='calendar'
							/>
							{moment(date).locale('ru').format('DD.MM.YYYY (dd)')}
						</span>

						{time && (
							<span className='flex'>
								<Image
									width={24}
									height={24}
									src={'/icons/time.svg'}
									alt='time'
								/>
								{time} -{' '}
								{moment()
									.hours(+time?.split(':')[0])
									.minutes(+time?.split(':')[1])
									.add({ minutes: totalMinutes })
									.format('HH:mm')}
							</span>
						)}
					</div>
				</div>
			</div>

			<form className={`${s.form} container`}>
				<h2 className='h2'> Личные данные</h2>

				<Input
					title='Имя'
					placeholder='Введите ваше имя'
					error={errors?.clientName?.message}
					required
					inputProps={{
						...register('clientName', { required: { value: true, message: 'Поле обязательное' } }),
					}}
				/>
				<Input
					title='Телефон'
					mask='+7 999 999 99 99'
					placeholder='Номер с кодом страны'
					error={errors?.clientPhone?.message}
					required
					inputProps={{
						...register('clientPhone', { required: { value: true, message: 'Поле обязательное' } }),
					}}
				/>

				<Input
					title='E-mail'
					placeholder='Введите данные'
				/>
				<Input
					title='Комментарий'
					placeholder='Комментарий к записи'
					inputProps={{ ...register('clientComment') }}
				/>

				<CheckBox />
			</form>

			<Controls>
				<Button
					buttonParams={{ onClick: handleSubmit(onSubmit) }}
					type={buttonTypes.blue}
				>
					Подтвердить запись
				</Button>
			</Controls>
		</div>
	);
};

interface IInputProps {
	placeholder?: string;
	title?: string;
	error?: string | null;
	required?: boolean;

	inputProps?: UseFormRegisterReturn<any>;
	mask?: string;
}

const Input: FC<IInputProps> = ({ placeholder, title, error, required, mask, inputProps }) => {
	return (
		<div>
			<span className={`${s.form_title} ${required && s.required}`}>{title}</span>
			{mask ? (
				<ReactInputMask
					mask={mask}
					required={false}
					alwaysShowMask={false}
					placeholder={placeholder}
					{...inputProps}
				/>
			) : (
				<input
					placeholder={placeholder}
					{...inputProps}
				/>
			)}
			{error && <span className={s.err}>{error}</span>}
		</div>
	);
};

const CheckBox = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div
			onClick={() => setIsActive(prev => !prev)}
			className={`${s.checkbox}`}
		>
			<div className={`${s.mark} ${isActive && s.active}`}>
				{isActive && (
					<Image
						width={14}
						height={14}
						src={'/icons/ok.svg'}
						alt='checkbox mark'
					/>
				)}
			</div>

			<p>
				Я принимаю <a href='/'>Условия предоставления услуг</a> и
				<a href='/'> Политика конфиденциальности.</a>
			</p>
		</div>
	);
};

const Edit: FC<{ to: string }> = ({ to }) => (
	<Link
		href={to}
		className={s.edit}
	>
		<Image
			width={24}
			height={24}
			src={'/icons/pencil.svg'}
			alt='edit'
		/>
	</Link>
);
