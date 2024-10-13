'use client'

import { mastersApi } from '@/shared/api/masters';
import WebApp from '@twa-dev/sdk';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';

export const ClientRoot: FC = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['ActiveUser'],
		queryFn: () => mastersApi.getOneByTgId(WebApp.initDataUnsafe.user?.id!),
	});

	const router = useRouter();

	if (!data?.data.id && !isFetching) router.push('/no_salon_user');

	return null;
};