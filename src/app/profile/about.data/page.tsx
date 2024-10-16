'use client'
import { Button, Textarea, buttonTypes } from "@/shared/ui";
import s from '../specialist.module.scss'
import Link from "next/link";
import Image from "next/image";
import { Controls } from "@/widgets/controls";
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { IUpdateMasterBody } from '@/shared/api/masters/types';
import { mastersApi } from '@/shared/api/masters';
import WebApp from '@twa-dev/sdk';
import { useRouter } from 'next/navigation';

export default function Page() {
	const [about, setAbout] = useState('');
	const router = useRouter();

	// api
	const { data: activeMaster } = useQuery({
		queryKey: ['ActiveMaster'],
		queryFn: () =>
			mastersApi.getOneByTgId(typeof window !== 'undefined' ? +WebApp.initDataUnsafe.user?.id! : 0),
		onSuccess: activeMaster => {
			setAbout(activeMaster.data.about);
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

			<div
				className='container'
				style={{ marginTop: 16 }}
			>
				<Textarea
					label='О специалисте'
					textAreaParams={{ placeholder: 'Что нибудь о себе' }}
					value={about}
					setValue={setAbout}
				/>
			</div>

			<Controls>
				<Button
					type={buttonTypes.blue}
					buttonParams={{ onClick: () => updateMasterMutation.mutate({ about }) }}
				>
					сохранить
				</Button>
			</Controls>
		</div>
	);
}