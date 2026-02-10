import type { FC } from 'react';
import { useTransaction, useTransactions } from '@/hooks/budget';
import { AccountCards, AccountsOverview } from '../accounts/accounts-overview';
import { CategorySpendBarGraph } from '../charts/category-spend-bar-graph';
import { MonthlySpendLineGraph } from '../charts/monthly-spend-line-graph';
import { Widget, type WidgetProps } from '../common/widget';
import { RecurringPaymentsTimeline } from '../recurring-payments/recurring-payments-timeline';

const widgets: WidgetProps[] = [
	{
		id: 'category-spend',
		children: <CategorySpendBarGraph />,
		span: 1,
		title: 'Category Spending',
	},
	{
		id: 'monthly-spend',
		children: <MonthlySpendLineGraph />,
		span: 1,
		title: 'Monthly Spending',
	},
	{
		id: 'accounts-overview',
		children: (
			<div className="mt-3">
				<AccountCards />
			</div>
		),
		span: 1,
		title: 'Account Balances',
	},
	{
		id: 'recurring-payments-timeline',
		children: <RecurringPaymentsTimeline />,
		title: 'Recurring Payments',
	},
];

export const Home: FC = () => {
	return (
		<div className="dashboard-grid">
			{widgets.map((w) => (
				<Widget key={w.id} span={w.span} title={w.title}>
					{w.children}
				</Widget>
			))}
		</div>
	);
};
