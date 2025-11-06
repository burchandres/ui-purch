import { type FC, useEffect } from 'react';
import {
	useAccounts,
	useCategories,
	useItems,
	useTransactions,
} from '@/hooks/budget';
import { TransactionsTable } from './transactions-table';

export const DashboardPage: FC = () => {
	// const { categories } = useCategories();
	// const { items } = useItems();
	// const { accounts } = useAccounts();
	// const { transactions } = useTransactions();

	// useEffect(() => {
	// 	console.log({
	// 		categories,
	// 		items,
	// 		accounts,
	// 		transactions,
	// 	});
	// }, [categories, items, accounts, transactions]);

	// return <p>ok</p>;
	return (
		<div>
			<TransactionsTable />
		</div>
	);
};
