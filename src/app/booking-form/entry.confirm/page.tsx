'use client';
import { EntryConfirmView } from '@/views/entry.confirm.view';
import { NextPage } from 'next';
import { FC, useState, useEffect } from 'react';

interface EntryConfirmProps {}

const EntryConfirm: FC<EntryConfirmProps> = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return <>{isClient && <EntryConfirmView />}</>;
};

export default EntryConfirm;
