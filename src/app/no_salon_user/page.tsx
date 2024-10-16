'use client';
import WebApp from '@twa-dev/sdk';
import { FC, useState } from 'react';
import s from './no_salon_user.module.scss';
import clipboardCopy from 'clipboard-copy';
interface INoSalonUserProps {}

const NoSalonUser: FC<INoSalonUserProps> = props => {
	const {} = props;

	const [isCoped, setIsCoped] = useState(false);

	return (
		<div className={s.main}>
			Вы не числитесь не в одном салоне, попросите админа добавить вас в штат, ваш telegram id:{' '}
			{isCoped ? (
				<span>Скопированно</span>
			) : (
				<span
					onClick={() => {
						clipboardCopy(String(typeof window !== 'undefined' && WebApp.initDataUnsafe.user?.id));
						setIsCoped(true);
						setTimeout(() => {
							setIsCoped(false);
						}, 1000);
					}}
				>
					{typeof window !== 'undefined' && WebApp.initDataUnsafe.user?.id}
				</span>
			)}
		</div>
	);
};

export default NoSalonUser;
