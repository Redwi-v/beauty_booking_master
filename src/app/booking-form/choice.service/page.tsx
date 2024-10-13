'use client';

import { ChoiceServiceView } from '@/views/choice.service';
import { NextPage } from 'next';

interface ChoiceServicePageProps {}

const ChoiceServicePage: NextPage<ChoiceServicePageProps> = () => {
	return <ChoiceServiceView />;
};

export default ChoiceServicePage;
