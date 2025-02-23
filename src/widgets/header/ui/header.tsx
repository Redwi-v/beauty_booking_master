
'use client'
import { FC } from "react";
import s from './header.module.scss'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mastersApi } from '@/shared/api/masters';
import WebApp from '@twa-dev/sdk';
import { useQuery } from 'react-query';
import { getFileUrl } from '@/shared/api/instance/instance';

interface HeaderProps {
	withBack?: boolean;
}

export const Header: FC<HeaderProps> = ({ withBack }) => {
	const router = useRouter();

	const { data: activeMaster } = useQuery({
		queryKey: ['activeMaster', typeof window !== 'undefined' && !!WebApp.initDataUnsafe.user?.id],
		queryFn: () =>
			mastersApi.getOneByTgId(typeof window !== 'undefined' ? WebApp.initDataUnsafe.user?.id! : 0),
		enabled: typeof window !== 'undefined' && !!WebApp.initDataUnsafe.user?.id,
	});



	if ( !activeMaster?.data ) return undefined
	return (
		<>
			{
				<header className={`${s.header} container`}>
					<div className={s.top}>
						{withBack && (
							<button
								className={s.back}
								onClick={() => router.back()}
							>
								<Image
									alt='back'
									width={30}
									height={40}
									src={'/icons/arrow.svg'}
								/>
							</button>
						)}
					</div>

					<div className={`${s.main} ${withBack && s.withTop}`}>
						<div className={s.info}>
							<h1 className='h1'>{activeMaster?.data?.salonBranch?.salon.name}</h1>
							<h3 className='h3'>
								{activeMaster?.data?.salonBranch?.address}
							</h3>
						</div>

						<div className={s.avatar}>
							<Image
								alt='avatar'
								src={getFileUrl(activeMaster?.data.avatar)}
								width={48}
								height={48}
							/>
						</div>
					</div>
				</header>
			}
		</>
	);
};
 