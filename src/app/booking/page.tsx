'use client';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import {
	BackButton,
	Button,
	buttonTypes,
	CheckboxSwitch,
	DatePicker,
	TimeListPicker,
} from '@/shared/ui';
import { Controls } from '@/widgets/controls';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import s from './booking.module.scss';
import Image from 'next/image';
import { getFileUrl } from '@/shared/api/instance/instance';
import { useMutation, useQuery } from 'react-query';
import { mastersApi } from '@/shared/api/masters';
import WebApp from '@twa-dev/sdk';
import 'moment/locale/ru';
import { Menu, MenuItem } from '@szhsin/react-menu';
import { bookingApi } from '@/shared/api/booking';
import { useRouter } from 'next/navigation';
import { Booking } from '@/shared/api/masters/types';
interface IBookingProps {}

const currentDate = new Date();

currentDate.setFullYear(currentDate.getFullYear() - 1);
const MIN_DATE = new Date(currentDate);

currentDate.setFullYear(currentDate.getFullYear() + 2);
const MAX_DATE = new Date(currentDate);

const Booking: FC<IBookingProps> = props => {
	const {} = props;

	const router = useRouter();

	const {
		setDateAndTime,
		date: stateDate,
		time: stateTime,
		masterId,
		services,
		setMasterId,
	} = useAppointmentStore(state => state);

	const { data: activeMaster, isFetching } = useQuery({
		queryKey: ['ActiveMaster', WebApp.initDataUnsafe.user?.id],
		queryFn: () => mastersApi.getOneByTgId(WebApp.initDataUnsafe.user?.id!),
		onSuccess: data => {
			setMasterId(data.data.id);
		},
	});

	const [date, setDate] = useState(() => (stateDate ? new Date(stateDate) : new Date()));

	const { data: activeBooking, refetch } = useQuery({
		queryKey: ['ActiveMaster', WebApp.initDataUnsafe.user?.id, date],
		queryFn: () => mastersApi.getBookingByDate({ masterId: activeMaster?.data.id!, date: date }),
		enabled: !!activeMaster?.data,
	});

	useEffect(() => {
		stateDate && setDate(() => new Date(stateDate));
	}, [stateTime]);

	const deleteItemMutation = useMutation({
		mutationFn: (id: number) => bookingApi.delete(id),
		onSuccess: () => {
			refetch();
		},
	});

	const deleteItem = (id: number) => {
		deleteItemMutation.mutate(id);
	};

	return (
		<>
			<BackButton />
			<div className='container'>
				<div className={s.header}>
					<Image
						alt='avatar'
						width={32}
						height={32}
						src={getFileUrl(activeMaster?.data.avatar)}
					/>
					<h2 className='h2'>Запись клиентов</h2>
				</div>

				<DatePicker
					value={date}
					onChange={setDate}
					min={MIN_DATE}
					max={MAX_DATE}
				/>
				{activeBooking?.data && activeBooking.data.length > 0 && (
					<span className={s.date}>{moment(date).locale('ru').format('DD MMMM YYYY')}</span>
				)}
				{activeBooking?.data && activeBooking.data.length > 0 ? (
					<ul className={s.booking}>
						{activeBooking?.data.map(item => (
							<>
								<li className={s.booking_item}>
									<div className={s.block}>
										<div className={s.time}>
											<span>{moment(item.time).locale('ru').format('HH:mm')}</span>
											<span className={s.duration}>
												{moment(item.time)
													.add({
														minutes: item.services.reduce(
															(prev, service) => prev + service.time,
															0,
														),
													})
													.format('HH:mm')}{' '}
											</span>
										</div>

										<div className={s.main_info}>
											<div className={s.client}>
												<span>клиент</span>
												<p>{item.clientName}</p>
											</div>

											<ul className={s.services}>
												{item.services.map(service => (
													<li key={service.id}>
														<span className={s.service_name}>{service.name}</span>
														<div className={s.service_info}>
															<span className={s.info_item}>
																<Image
																	alt='time'
																	width={18}
																	height={18}
																	src={'/icons/time.svg'}
																/>
																<span>
																	{moment().hours(0).minutes(service.time).format('HH:mm')}ч
																</span>
															</span>
															<span className={s.info_item}>
																<Image
																	alt='time'
																	width={18}
																	height={18}
																	src={'/icons/ruble.svg'}
																/>
																<span>{service.price} ₽</span>
															</span>
														</div>
													</li>
												))}
											</ul>

											<CommentButton item={item} />

											<div className={s.menu}>
												<Menu
													menuButton={
														<button className={s.menu_button}>
															<span />
															<span />
															<span />
														</button>
													}
												>
													<MenuItem
														onClick={() => {
															deleteItem(item.id);
														}}
													>
														Отменить запись
													</MenuItem>
												</Menu>
												{/* <div className={s.actions}>
					<button>Отменить заказ</button>
					<button>Изменить бронь</button>
				</div> */}
											</div>
										</div>
									</div>
								</li>
							</>
						))}
					</ul>
				) : (
					<h2 className={`${s.not_found_title}  h2`}>
						{moment(date).locale('ru').format(`Записей на DD MMMM YYYY нет`)}
					</h2>
				)}

				<Controls>
					<Button
						type={buttonTypes.blue}
						buttonParams={{
							onClick: () => {
								router.push('/booking-form/choice.service');
							},
						}}
					>
						Добавить запись
					</Button>
				</Controls>
			</div>
		</>
	);
};

interface ICommentButtonProps {
	item: Booking;
}

const CommentButton: FC<ICommentButtonProps> = props => {
	const { item } = props;
	const [comentIsOpen, setCommentOpen] = useState(false);

	console.log(item);

	return (
		<div className={s.comment}>
			<>
				<button onClick={() => setCommentOpen(prev => !prev)}>Коментайрий</button>
				{comentIsOpen && (
					<div className={s.content}>
						{item.clientComment && (
							<>
								<span>Коментарй клиента:</span>
								<p>{item.clientComment}</p>
							</>
						)}

						{item.adminComment && (
							<>
								<span>Коментарй Админа:</span>
								<p>{item.clientComment}</p>
							</>
						)}

						{item.masterComment && (
							<>
								<span>Ваш коментарй:</span>
								<p>{item.masterComment}</p>
							</>
						)}
					</div>
				)}
			</>
		</div>
	);
};

export default Booking;
