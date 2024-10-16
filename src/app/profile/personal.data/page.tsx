'use client'
import Image from "next/image";
import Link from "next/link";

import s from '../specialist.module.scss'
import { Button, Input, buttonTypes } from "@/shared/ui";
import { Controls } from "@/widgets/controls";
import { useMutation, useQuery } from 'react-query';
import { mastersApi } from '@/shared/api/masters';
import WebApp from '@twa-dev/sdk';
import { IUpdateMasterBody } from '@/shared/api/masters/types';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Inputs = {
	// number: string;
	email?: string;
};

const schema = yup.object().shape({
	email: yup.string().email('Не верный email'),
	// number: yup.string().min(8).max(32).required('Поле обязательно'),
});

export default function Page() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
	});
	const onSubmit: SubmitHandler<Inputs> = data => {
		updateMasterMutation.mutate({
			email: data.email,
		});
	};

	// api
	const { data: activeMaster } = useQuery({
		queryKey: ['ActiveMaster'],
		queryFn: () =>
			mastersApi.getOneByTgId(typeof window !== 'undefined' ? +WebApp.initDataUnsafe.user?.id! : 0),
		onSuccess: activeMaster => {
			setValue('email', activeMaster.data.email);
			// setValue('number', activeMaster.data.)
		},
	});

	const updateMasterMutation = useMutation({
		mutationFn: (data: IUpdateMasterBody) => mastersApi.update(activeMaster?.data.id!, data),
		onSuccess: () => {
			router.push('/profile');
		},
	});
	//--

	return (
		<div>
			<Link
				className={s.back}
				href={'/profile'}
			>
				<Image
					width={40}
					height={40}
					alt='back'
					src={'/icons/arrow.svg'}
				/>
			</Link>

			<div className={`${s.personal_data_controls} container`}>
				<h1 className='h1'>Личные данные</h1>

				{/* <Input
					mask='+7 999 999 99 99'
					className={s.input}
					label='Телефон'
					isRequired
					inputParams={{ ...register('number'), placeholder: '8 800 333-33-33' }}
					error={errors.number?.message}
				/> */}
				<Input
					className={s.input}
					label='E-mail'
					inputParams={{ ...register('email'), placeholder: 'ddddddd@dddddd.com' }}
					error={errors.email?.message}
				/>
			</div>

			<Controls>
				<Button
					type={buttonTypes.blue}
					buttonParams={{ onClick: handleSubmit(onSubmit) }}
				>
					сохранить
				</Button>
			</Controls>
		</div>
	);
}