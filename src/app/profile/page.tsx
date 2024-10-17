'use client'
import { NextPage } from "next";

import s from './specialist.module.scss'
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from 'react-query';
import { mastersApi } from '@/shared/api/masters';
import WebApp from '@twa-dev/sdk';
import { getFileUrl } from '@/shared/api/instance/instance';

interface SpecialistPageProps {}

const SpecialistPage: NextPage<SpecialistPageProps> = () => {
	const router = useRouter();

	const { data, isFetching } = useQuery({
		queryKey: ['ActiveUser'],
		queryFn: () =>
			mastersApi.getOneByTgId(typeof window !== 'undefined' ? WebApp.initDataUnsafe.user?.id! : 0),
	});



	return (
		<div className={`${s.content}`}>
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

			<Link
				href={'profile/main.data'}
				className={s.profile}
			>
				<div className={s.avatar}>
					<Image
						width={80}
						height={80}
						src={data?.data.avatar ? getFileUrl(data?.data.avatar) : '/images/no_avatar.jpg'}
						alt='avatar'
					/>
				</div>

				<h1 className={s.name}>
					{data?.data.name} {data?.data.lastName}
				</h1>

				<span className={s.direction}>{data?.data.speciality}</span>
				<div className={s.reviews}>
					<div className={s.stars}>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
						<Image
							src={'/icons/star.svg'}
							alt='star'
							width={24}
							height={24}
						/>
					</div>

					<span className={s.count}>20 Отзывов</span>
				</div>
			</Link>

			<div className={`${s.sub_info} container`}>
				{/* <div className={s.title}>
					Образование
					<Link href={'/profile/education.data'}>
						<Image
							width={24}
							height={24}
							src={'/icons/pencil.svg'}
							alt='calendar'
						/>
					</Link>
				</div> */}
				{/* 
				<ul className={s.list}>
					<li>Lorem ipsum dolor sit amet consectetur</li>
					<li>Adipiscing libero turpis</li>
					<li>Nulla donec elit nisl congue in libero </li>
					<li>
						Elit id id pulvinar malesuada dictum imperdiet. Sit ut quis neque viverra non euismod.
						Eget sagittis.
					</li>
				</ul> */}

				<div className={s.title}>
					О специалисте
					<Link href={'/profile/about.data'}>
						<Image
							width={24}
							height={24}
							src={'/icons/pencil.svg'}
							alt='calendar'
						/>
					</Link>
				</div>

				<p className='p'>{data?.data.about}</p>

				<div className={s.title}>
					Личные данные
					<Link href={'/profile/personal.data'}>
						<Image
							width={24}
							height={24}
							src={'/icons/pencil.svg'}
							alt='calendar'
						/>
					</Link>
				</div>

				<p className='p'>e-mail</p>
				<span>{data?.data.email}</span>
			</div>
		</div>
	);
};

export default SpecialistPage;