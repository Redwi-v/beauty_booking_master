'use client';
import { Button, Input, buttonTypes } from '@/shared/ui';
import { Controls } from '@/widgets/controls';
import s from '../specialist.module.scss';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { mastersApi } from '@/shared/api/masters';
import WebApp from '@twa-dev/sdk';
import { IUpdateMasterBody } from '@/shared/api/masters/types';
import { getFileUrl } from '@/shared/api/instance/instance';
import { useRouter } from 'next/navigation';

type Inputs = {
	name: string;
	last_name: string;
	specialist: string;
};

export default function Page() {
	const [image, setImage] = React.useState<undefined | File>();
	const imageRef = React.useRef(null);
	const router = useRouter()

	function useDisplayImage() {
		const [result, setResult] = React.useState('');

		function uploader(e: any) {
			if (typeof e === 'string') return setResult(e);

			const imageFile = e.target.files[0];

			const reader = new FileReader();
			reader.addEventListener('load', (e: any) => {
				setResult(e.target.result);
			});

			reader.readAsDataURL(imageFile);
		}

		return { result, uploader };
	}

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		const { name, last_name, specialist } = data;

		const form: IUpdateMasterBody = {
			name,
			lastName: last_name,
			speciality: specialist,
			image: image,
		};

		updateMasterMutation.mutate(form);
	};

	const { result, uploader } = useDisplayImage();

	// api
	const { data: activeMaster } = useQuery({
		queryKey: ['ActiveMaster'],
		queryFn: () => mastersApi.getOneByTgId(+WebApp.initDataUnsafe.user?.id!),
		onSuccess: activeMaster => {
			setValue('name', activeMaster.data.name);
			setValue('last_name', activeMaster.data.lastName);
			setValue('specialist', activeMaster.data.speciality);

			if (!activeMaster.data.avatar) return;

			uploader(getFileUrl(activeMaster.data.avatar));
		},
	});

	const updateMasterMutation = useMutation({
		mutationFn: (data: IUpdateMasterBody) => mastersApi.update(activeMaster?.data.id!, data),
		onSuccess: () => {
			router.push('/')
		}
	});
	//--

	return (
		<div>
			<Link
				className={s.back}
				href={'/'}
			>
				<Image
					width={40}
					height={40}
					alt='back'
					src={'/icons/arrow.svg'}
				/>
			</Link>

			<div className={`${s.main_data} container`}>
				<label className={s.image_preview}>
					<div className={s.input_preview}>
						<input
							type='file'
							onChange={(e: any) => {
								setImage(e.target.files[0]);
								uploader(e);
							}}
						/>

						<div className={s.image}>
							{result && (
								<img
									className={s.preview}
									ref={imageRef}
									src={result}
									alt=''
								/>
							)}
							<Image
								className={s.icon}
								alt='photo'
								fill
								src={'/icons/photo.svg'}
							/>
						</div>
					</div>

					<div className={s.text}>
						<span>Фотография профиля</span>
						<span>загрузить фото</span>
					</div>
				</label>

				<Input
					label='Имя'
					className={s.input}
					inputParams={{ ...register('name'), placeholder: 'Екатерина' }}
				/>
				<Input
					label='Фамилия'
					className={s.input}
					inputParams={{ ...register('last_name'), placeholder: 'Петрова' }}
				/>
				<Input
					label='Специалист'
					className={s.input}
					inputParams={{ ...register('specialist'), placeholder: 'Стилист-парикмахер' }}
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
