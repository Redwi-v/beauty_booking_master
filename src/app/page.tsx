'use client';
import { getFileUrl } from '@/shared/api/instance/instance';
import { mastersApi } from '@/shared/api/masters';
import { HomeView } from '@/views/home';
import WebApp from '@twa-dev/sdk';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

export default function Home() {
	const router = useRouter();

	const { data, isFetching } = useQuery({
		queryKey: ['ActiveUser'],
		queryFn: () =>
			mastersApi.getOneByTgId(typeof window !== 'undefined' ? WebApp.initDataUnsafe.user?.id! : 0),
		onSuccess: data => {
			if (!data.data) return router.push('/no_salon_user');
		},
		onError: data => {
			router.push('/no_salon_user');
		},
	});

	const STUDIO_TEST_DATA = {
		name: data?.data.name + ' ' + data?.data.lastName,
		profession: data?.data.speciality || '',
		logo: data?.data.avatar ? getFileUrl(data?.data.avatar) : '/images/no_avatar.jpg',
		id: 1,
		rating: {
			reviewsCount: 20,
			rating: 20,
		},
	};

	if (isFetching) return <div>Loading...</div>;

	return (
		<>
			<HomeView studioInfo={STUDIO_TEST_DATA} />
		</>
	);
}
