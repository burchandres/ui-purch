import { type FC, type ReactNode, useMemo } from 'react';
import { Bar, BarChart, Rectangle, XAxis, YAxis } from 'recharts';
import { useCategories, useTransactions } from '@/hooks/budget';
import type { Category } from '@/lib/api/budget/types';
import { formatMoney, formatMoneyShort } from '@/lib/utils';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '../base/chart';
import { NoDataMessage } from '../common/empty-states';
import { Heading3 } from '../common/heading-3';

export const CategorySpendBarGraph: FC = () => {
	const {
		categories: categoriesData,
		isError: categoriesError,
		isLoading: categoriesLoading,
		error: categoriesErrorObj,
	} = useCategories();

	const {
		transactions,
		isError: transactionsError,
		isLoading: transactionsLoading,
		error: transactionsErrorObj,
	} = useTransactions();

	const categories = categoriesData ?? [];

	const chartData = useMemo(() => {
		return categories
			.map((category) => {
				const currentSpending = Math.min(
					transactions
						? transactions
								.filter((t) => t.categoryLabel === category.label)
								.map((t) => Math.abs(t.amount))
								.reduce((t1, t2) => t1 + t2, 0)
						: 0,
					254.3,
				);
				const isOverBudget = currentSpending > category.allocatedSpending;

				return {
					label: category.label,
					allocated: category.allocatedSpending,
					current: isOverBudget ? category.allocatedSpending : currentSpending,
					overspent: isOverBudget
						? currentSpending - category.allocatedSpending
						: 0,
					// store original values for the custom shape
					_currentSpending: currentSpending,
					_allocatedSpending: category.allocatedSpending,
				};
			})
			.sort((t1, t2) => (t1.allocated > t2.allocated ? -1 : 1));
	}, [categories, transactions]);

	const chartConfig = {
		allocated: {
			label: 'Allocated',
			color: '#000000',
		},
		current: {
			label: 'Current',
			color: '#000000',
		},
		overspent: {
			label: 'Overspent',
			color: '#ef4444',
		},
	} satisfies ChartConfig;

	const StackedBar: FC<any> = ({ x, y, width, height, payload }) => {
		const allocatedWidth =
			(payload._allocatedSpending /
				Math.max(...chartData.map((d) => d._allocatedSpending))) *
			width;
		const totalSpendingWidth =
			(payload._currentSpending /
				Math.max(...chartData.map((d) => d._allocatedSpending))) *
			width;
		const isOverBudget = payload._currentSpending > payload._allocatedSpending;

		return (
			<g>
				{/* allocated spending bar (background, light opacity) */}
				<Rectangle
					x={x}
					y={y}
					width={allocatedWidth}
					height={height}
					fill="var(--color-allocated)"
					opacity={0.1}
					radius={[0, 4, 4, 0]}
				/>
				{/* full spending bar in red if over budget (bottom layer) */}
				{isOverBudget && (
					<Rectangle
						x={x}
						y={y}
						width={totalSpendingWidth}
						height={height}
						fill="var(--color-overspent)"
						radius={[0, 4, 4, 0]}
					/>
				)}
				{/* current spending bar up to allocated (top layer) */}
				<Rectangle
					x={x}
					y={y}
					width={isOverBudget ? allocatedWidth : totalSpendingWidth}
					height={height}
					fill="var(--color-current)"
					radius={[0, 4, 4, 0]}
				/>
			</g>
		);
	};

	const CustomTooltipContent = ({ active, payload }: any) => {
		if (!active || !payload || !payload.length) {
			return null;
		}

		const data = payload[0].payload;
		const isOverBudget = data._currentSpending > data._allocatedSpending;

		return (
			<div className="border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
				<div className="font-medium">{data.label}</div>
				<div className="grid gap-1.5">
					<div className="flex w-full flex-wrap items-center gap-2">
						<div
							className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
							style={{ backgroundColor: 'var(--color-current)' }}
						/>
						<div className="flex flex-1 justify-between leading-none items-center">
							<span className="text-muted-foreground mr-2">Current</span>
							<span className="text-foreground font-mono font-medium tabular-nums">
								{formatMoney(data._currentSpending)}
							</span>
						</div>
					</div>
					<div className="flex w-full flex-wrap items-center gap-2">
						<div
							className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
							style={{
								backgroundColor: 'var(--color-allocated)',
								opacity: 0.1,
							}}
						/>
						<div className="flex flex-1 justify-between leading-none items-center">
							<span className="text-muted-foreground mr-2">Allocated</span>
							<span className="text-foreground font-mono font-medium tabular-nums">
								{formatMoney(data._allocatedSpending)}
							</span>
						</div>
					</div>
					{isOverBudget && (
						<div className="flex w-full flex-wrap items-center gap-2">
							<div
								className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
								style={{ backgroundColor: 'var(--color-overspent)' }}
							/>
							<div className="flex flex-1 justify-between leading-none items-center">
								<span className="text-muted-foreground mr-2">Overspent </span>
								<span className="text-foreground font-mono font-medium tabular-nums">
									{formatMoney(data.overspent)}
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<div className="pt-4 pr-2">
			<ChartContainer config={chartConfig}>
				<BarChart
					data={chartData}
					layout="vertical"
					margin={{ left: 0, right: 0 }}
				>
					<XAxis
						type="number"
						tickFormatter={(val) => formatMoneyShort(val)}
						tickLine={false}
					/>
					<YAxis type="category" dataKey="label" tickLine={false} width={100} />

					<Bar
						dataKey="_allocatedSpending"
						shape={<StackedBar />}
						isAnimationActive={false}
					/>

					<ChartTooltip cursor={false} content={<CustomTooltipContent />} />
				</BarChart>
			</ChartContainer>
		</div>
	);
};
