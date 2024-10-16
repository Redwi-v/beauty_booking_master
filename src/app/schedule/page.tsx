'use client';
import { useMutation, useQuery } from 'react-query';
import s from './scedule.module.scss';
import { BackButton, Button, buttonTypes, Input } from '@/shared/ui';
import { mastersApi } from '@/shared/api/masters';
import WebApp from '@twa-dev/sdk';
import { useState } from 'react';
import cssIf from '@/scripts/helpers/class.add.if';
import moment from 'moment';
import 'moment/locale/ru';
import { Controls } from '@/widgets/controls';
import { IUpdateMasterBody } from '@/shared/api/masters/types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Inputs {
	startShift: string;
	endShift: string;
}

const schema = yup.object({
	startShift: yup
		.string()
		.matches(/(([2][0-3])|([0-1][0-9])):([0-5][0-9])/, 'Не верный формат, верный вид: 19:00'),
	endShift: yup
		.string()
		.matches(/(([2][0-3])|([0-1][0-9])):([0-5][0-9])/, 'Не верный формат, верный вид: 19:00'),
});

const Page = () => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },

		//@ts-ignore
	} = useForm<Inputs>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<Inputs> = data => {
		updateMasterMutation.mutate({
			workingDays: activeWorkingsDays,
			startShift: moment()
				.hours(+data.startShift?.split(':')[0])
				.minutes(+data.startShift?.split(':')[1])
				.toDate(),
			endShift: moment()
				.hours(+data.endShift?.split(':')[0])
				.minutes(+data.endShift?.split(':')[1])
				.toDate(),
		});
	};

	const { data: activeMaster, refetch: refetchMaster } = useQuery({
		queryKey: ['activeMaster', typeof window !== 'undefined' && +WebApp.initDataUnsafe.user?.id!],
		queryFn: () =>
			mastersApi.getOneByTgId(typeof window !== 'undefined' ? +WebApp.initDataUnsafe.user?.id! : 0),
		keepPreviousData: true,
		enabled: typeof window !== 'undefined' && !!WebApp.initDataUnsafe.user?.id,
		onSuccess: data => {
			setActiveWorkingsDays(data.data.workingDays);
			setValue('startShift', moment(data.data.startShift).format('HH:mm'));
			setValue('endShift', moment(data.data.endShift).format('HH:mm'));
		},
	});

	const [activeWorkingsDays, setActiveWorkingsDays] = useState(
		activeMaster?.data.workingDays || [],
	);

	const handleClick = (day: string) => {
		if (activeWorkingsDays.includes(day)) {
			setActiveWorkingsDays(prev => {
				return prev.filter(weekDay => weekDay !== day);
			});
			return;
		}

		setActiveWorkingsDays(prev => [...prev, day]);
	};

	const router = useRouter();
	const updateMasterMutation = useMutation({
		mutationFn: (data: IUpdateMasterBody) => mastersApi.update(activeMaster?.data.id!, data),
		onSuccess: () => {
			refetchMaster();
			router.push('/');
		},
	});

	return (
		<div className={s.main}>
			<BackButton />
			<div className='container'>
				<h2 className='h2'>График работы</h2>

				<div className={s.weekDays}>
					{weekDays.map((day, index) => {
						return (
							<button
								onClick={() => handleClick(day)}
								className={cssIf(activeWorkingsDays.includes(day), s.activeDay)}
							>
								{moment().weekday(index).locale('ru').format('dd')}
							</button>
						);
					})}
				</div>
				<div className={s.set_work_time}>
					<Input
						error={errors.startShift?.message}
						inputParams={{
							placeholder: 'Начало 09:00',
							...register('startShift'),
						}}
					/>
					<span>:</span>
					<Input
						error={errors.endShift?.message}
						inputParams={{
							placeholder: 'Конец 18:00',
							...register('endShift'),
						}}
					/>
				</div>
			</div>
			<Controls>
				<Button
					type={buttonTypes.blue}
					buttonParams={{
						onClick: handleSubmit(onSubmit),
					}}
				>
					сохранить
				</Button>
			</Controls>
		</div>
	);
};

export default Page;
