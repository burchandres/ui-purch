import { useSearch } from '@tanstack/react-router';
import { CronExpressionParser } from 'cron-parser';
import {
	ChevronDown,
	ChevronUp,
	CircleMinus,
	CirclePlus,
	Minus,
} from 'lucide-react';
import { type FC, useMemo, useState } from 'react';
import { formatMoney } from '@/lib/utils';
import { Button } from '../base/button';
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from '../base/item';
import { SmartDate } from '../common/smart-date';
import {
	type RecurringPayment,
	recurringPayments,
} from './mock-recurring-payments';

type Payment = RecurringPayment & { date: string };

export const RecurringPaymentsTimeline: FC = () => {
	const [timesExpanded, setTimesExpanded] = useState(0);

	const expand = () => setTimesExpanded(timesExpanded + 1);
	const collapse = () => setTimesExpanded(0);

	const payments = useMemo<Payment[]>(() => {
		const targetCount = (timesExpanded + 1) * 3;

		// create intervals with their first date
		const intervals = recurringPayments.flatMap((recurringPayment) =>
			recurringPayment.schedule.map((cronString) => {
				const interval = CronExpressionParser.parse(cronString, {
					currentDate: new Date(),
				});
				return {
					interval,
					recurringPayment,
					nextDate: interval.next().toDate(),
				};
			}),
		);

		const allPayments: Payment[] = [];

		// generate payments by repeatedly picking the earliest
		for (let i = 0; i < targetCount && intervals.length > 0; i++) {
			const earliest = intervals.reduce(
				(min, curr, idx) =>
					curr.nextDate < min.date
						? { interval: curr, index: idx, date: curr.nextDate }
						: min,
				{ interval: intervals[0], index: 0, date: intervals[0].nextDate },
			);

			allPayments.push({
				...earliest.interval.recurringPayment,
				date: earliest.date.toISOString(),
			});

			// advance this interval to its next date
			earliest.interval.nextDate = earliest.interval.interval.next().toDate();
		}

		return allPayments;
	}, [timesExpanded]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 5,
				marginTop: 15,
			}}
		>
			{payments.map((p, i) => {
				return (
					<>
						<div
							key={p.name}
							style={{ display: 'flex', gap: 3, alignItems: 'center' }}
						>
							{p.amount < 0 ? <CircleMinus /> : <CirclePlus />}
							<Item variant="outline">
								<ItemContent>
									<ItemMedia>
										{p.amount < 0 ? <CircleMinus /> : <CirclePlus />}
									</ItemMedia>
									<ItemTitle>{p.name}</ItemTitle>
									<ItemDescription>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: 3,
											}}
										>
											<div style={{ display: 'flex', gap: 3 }}>
												{formatMoney(Math.abs(p.amount))}
												<SmartDate date={p.date} unit="day" />
											</div>
											<div style={{ display: 'flex', gap: 5 }}>
												<p>Projected checking:</p>
												{formatMoney(592.11)}
											</div>
										</div>
									</ItemDescription>
								</ItemContent>
							</Item>
						</div>
						{i < payments.length - 1 && (
							<Minus style={{ transform: 'rotate(90deg)' }} />
						)}
					</>
				);
			})}
			<div style={{ display: 'flex', alignSelf: 'center' }}>
				<Button variant="ghost" onClick={expand}>
					<ChevronDown /> See more
				</Button>
				{timesExpanded > 0 && (
					<Button variant="ghost" onClick={collapse}>
						<ChevronUp /> Collapse
					</Button>
				)}
			</div>
		</div>
	);
};
