import { Activity as ActivityIcon, Home as HomeIcon } from 'lucide-react';
import { type FC, useEffect } from 'react';
import {
	useAccounts,
	useCategories,
	useItems,
	useTransactions,
} from '@/hooks/budget';
import { SectionNav } from '../base/section-nav';
import { Activity } from './activity';
import { Home } from './home';
import { TransactionsTable } from './transactions-table';

export const DashboardPage: FC = () => {
	const sections: Record<string, SectionConfig> = {
		home: {
			icon: HomeIcon,
			component: <Home />,
		},
		activity: {
			icon: ActivityIcon,
			component: <Activity />,
		},
	};

	// return <p>ok</p>;
	return <SectionNav sections={sections} />;
};
