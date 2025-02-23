'use client';

import { BackButton, Button, buttonTypes } from '@/shared/ui';
import { FC, useEffect, useState } from 'react';
import s from './choice.service.view.module.scss';
import Image from 'next/image';
import { Controls } from '@/widgets/controls';
import { CheckBox } from '@/shared/ui/checkbox';
import { useAppointmentStore } from '@/features/appointment/model/appointment.store';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { servicesApi } from '@/shared/api/services';
import moment from 'moment';
import useDebounce from '@/shared/scripts/hooks/use.debounce';
import { mastersApi } from '@/shared/api/masters';
import { Service } from '@/shared/api/booking/types';
import { Rethink_Sans } from 'next/font/google';

interface ChoiceServiceViewProps {}

export const ChoiceServiceView: FC<ChoiceServiceViewProps> = () => {
	const { toggleServices, date, time, masterId, services } = useAppointmentStore(state => state);

	const router = useRouter();

	const clickHandler = () => {
		router.push('/booking-form/choice.date');
	};

	const isEndStep = date && time && masterId;

	return (
		<>
			<div className='flex items-center'>
				<BackButton />
				<span>Новая запись</span>
			</div>
			<div className='container'>
				<h1 className='h1 '>Выбрать услуги</h1>
				<ListWithTabs />

				<Controls>
					{isEndStep ? (
						<Button
							buttonParams={{
								disabled: !services.length,
								onClick: clickHandler,
							}}
							type={buttonTypes.blue}
						>
							{' '}
							Оформить запись{' '}
						</Button>
					) : (
						<>
							<Button
								buttonParams={{
									onClick: () => router.back(),
								}}
							>
								{' '}
								Назад{' '}
							</Button>

							<Button
								buttonParams={{
									onClick: clickHandler,
									disabled: !services.length,
								}}
								type={buttonTypes.blue}
							>
								{' '}
								Далее{' '}
							</Button>
						</>
					)}
				</Controls>
			</div>
		</>
	);
};

const ListWithTabs = () => {
	const { toggleServices, services, masterId, time, date } = useAppointmentStore(state => state);

	const [search, setSearch] = useState('');

	const { data: masterData } = useQuery({
		queryKey: ['MasterData', masterId],
		queryFn: () => mastersApi.getOne(masterId!),
		enabled: !!masterId,
	});

	const { data, refetch } = useQuery({
		queryKey: ['Services', masterId],
		enabled: !!masterId,
		queryFn: () => servicesApi.getList({ search: search || undefined, masterId: masterId! }),
	});

	const activeServices: Service[] = [];


	const startMinutes = time && +time?.split(':')[0] * 60 + +time?.split(':')[1];

	const isSearch = useDebounce(search, 1000);

	useEffect(() => {
		refetch();
	}, [isSearch]);

	// const isNotValid = (service: Service): boolean => {
	// 	if (!data?.data || !masterData?.data) return false;

	// 	if (!date) return false;

	// 	let haveFreeTime = false;

	// 	const maxWorkingTime =
	// 		+moment(masterData.data.endShift).format('HH:mm').split(':')[0] * 60 +
	// 		+moment(masterData.data.startShift).format('HH:mm').split(':')[1];

	// 	let bookingEndTimeSteps: [number, number][] = [];

	// 	const activeDateBooking = masterData?.data.Booking.filter(booking => {
	// 		return moment(date).format('DD.MM.YYYY') === moment(booking.time).format('DD.MM.YYYY');
	// 	});

	// 	activeDateBooking.forEach(booking => {
	// 		const bookingsStartTime =
	// 			+moment(booking.time).format('HH:mm').split(':')[0] * 60 +
	// 			+moment(booking.time).format('HH:mm').split(':')[1];

	// 		const bookingEndTime = booking?.services?.reduce((prev, service) => {
	// 			return prev + service.time;
	// 		}, bookingsStartTime);

	// 		bookingEndTimeSteps.push([bookingsStartTime, bookingEndTime]);
	// 	});

	// 	data?.data.list.forEach(service => {
	// 		service..forEach(serviceInTag => {
	// 			if (services.find(serviceId => serviceInTag.id === serviceId)) return;

	// 			const endMinutes = activeServices?.reduce((prev, service) => {
	// 				//@ts-ignore
	// 				return prev + service.time;
	// 			}, startMinutes);

	// 			//@ts-ignore
	// 			const plusOneMinutes = endMinutes + service.time;

	// 			if (plusOneMinutes > maxWorkingTime) {
	// 				haveFreeTime = false;
	// 			}

	// 			bookingEndTimeSteps.forEach(bookingTimeStep => {
	// 				if (
	// 					(plusOneMinutes >= bookingTimeStep[0] && plusOneMinutes <= bookingTimeStep[1]) ||
	// 					//@ts-ignore
	// 					(startMinutes <= bookingTimeStep[0] && plusOneMinutes >= bookingTimeStep[0])
	// 				)
	// 					return;

	// 				haveFreeTime = false;
	// 			});
	// 		});
	// 	});

	// 	console.log(haveFreeTime);

	// 	return haveFreeTime;
	// };

	const onlyTags = data?.data?.list && Array.from(new Set(data.data.list.map(service => service.serviceTag.id)));
	


	return (
		<div className={`${s.content}`}>
			<div className={s.top_section}>
				<div className=''>
					<div className={s.input_wrapper}>
						<div className={s.icon}>
							<Image
								alt='search'
								src={'/icons/search.svg'}
								width={18}
								height={18}
							/>
						</div>
						<input
							placeholder='Поиск по услугам'
							className={s.input}
							type='text'
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
{/* 
					<div className={s.tabs_wrapper}>
						<div className={s.tabs}>
							{onlyTabs &&
								onlyTabs.map(item => (
									<a
										href={'#' + item.tab}
										key={item.tab}
										className={s.tab}
									>
										{item.tab}
									</a>
								))}
						</div>
					</div> */}
				</div>
			</div>

			<div className={s.list}>
				{data?.data?.list &&
					onlyTags?.map((tagId, topIndex) => {

						const serviceItem = data.data.list.find(item => item.serviceTag.id === tagId)

						if ( !serviceItem ) return undefined

						return (
							<>
								<div key={tagId}>
									<h1
										className='h1'
										id={String(tagId)}
									>
										{serviceItem.serviceTag.name}
									</h1>
								</div>
	
								<ul className='mt-20'>
									{serviceItem.serviceTag.services.map((service, index) => (
										<li
											className={`${s.item}`}
											key={index}
										>
											<p className={`${s.name} p`}>{service.name}</p>
	
											<div className={s.item_characteristics}>
												<p className='p'>
													<Image
														src={'/icons/time.svg'}
														width={24}
														height={24}
														alt='time'
													/>
													{moment().hours(0).minutes(service.duration).format('HH:mm')} ч
												</p>
												<p className='p'>
													<Image
														src={'/icons/ruble.svg'}
														width={24}
														height={24}
														alt='time'
													/>
													{service.price}р
												</p>
											</div>
	
											<CheckBox
												isActive={services.includes(service.id)}
												onClick={() => toggleServices(service.id)}
											/>
										</li>
									))}
								</ul>
							</>
						)

					})}
			</div>
		</div>
	);
};
