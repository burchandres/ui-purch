import { startCase } from 'lodash';
import { type FC, useEffect, useMemo } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/base/accordion';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/base/card';
import { appearanceConfig } from '@/config/appearance';
import { useAccounts, useItems } from '@/hooks/budget';
import type { Account, Item } from '@/lib/api/budget/types';
import { formatMoney } from '@/lib/utils';
import { Separator } from '../base/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '../base/tooltip';
import { Heading3 } from '../common/heading-3';
import { ActivityFeed } from './activity-feed';
import { mockAccounts } from './mock-accounts';

const MIN_CARD_WIDTH = 220;

export type AccountCardProps = {
	itemName?: string;
	account: Account;
	onClick: (id: string) => void;
};
export const AccountCard: FC<AccountCardProps> = ({
	itemName,
	account,
	onClick,
}) => (
	<Card
		variant="clickable"
		style={{ minWidth: `${MIN_CARD_WIDTH}px` }}
		onClick={() => onClick(account.id)}
	>
		<CardHeader
			style={{
				marginBottom: -20,
				marginTop: -10,
				marginLeft: -5,
				whiteSpace: 'nowrap',
				overflow: 'hidden',
			}}
		>
			<CardTitle style={{ fontSize: '16px' }}>{account.name}</CardTitle>
			{itemName && (
				<CardDescription style={{ fontStyle: 'italic' }}>
					{itemName}
				</CardDescription>
			)}
		</CardHeader>
		<CardContent>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'end',
				}}
			>
				<Tooltip>
					<TooltipTrigger>
						<span style={{ fontSize: '21px', fontWeight: 'bold' }}>
							{formatMoney(account.currentBalance ?? '')}
						</span>
					</TooltipTrigger>
					<TooltipContent side="bottom" sideOffset={-17}>
						<p>Current balance</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</CardContent>
	</Card>
);

export const AccountCards: FC = () => {
	const {
		accounts: actualAccounts,
		isLoading: accountsLoading,
		isError: accountsError,
	} = useAccounts();
	const { items, isLoading: itemsLoading, isError: itemsError } = useItems();
	const accounts = mockAccounts;

	const isLoading = accountsLoading || itemsLoading;
	const isError = accountsError || itemsError;

	const itemTypes: { value: string; label: string }[] = [
		{
			value: 'Credit',
			label: 'Credit Cards',
		},
		{
			value: 'Depository',
			label: `Checking & Savings`,
		},
		{
			value: 'Investment',
			label: 'Investment Accounts',
		},
	];

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				gap: 20,
				marginBottom: 10,
				justifyContent: 'space-evenly',
			}}
		>
			{accounts?.length ? (
				itemTypes.map((type) => {
					const filteredAccounts = accounts
						.sort((a, b) => (a.itemId < b.itemId ? -1 : 1))
						.filter((account) => account.type === type.value);
					return filteredAccounts.length ? (
						<div
							key={`${type.value}-accounts`}
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: appearanceConfig.lgGap,
							}}
						>
							<Accordion
								type="multiple"
								variant="card"
								defaultValue={[type.value]}
								style={{
									minWidth: `${MIN_CARD_WIDTH + 25}px`,
								}}
							>
								<AccordionItem value={type.value}>
									<AccordionTrigger>{type.label}</AccordionTrigger>
									<AccordionContent>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: appearanceConfig.smGap,
											}}
										>
											{filteredAccounts.map((account) => (
												<AccountCard
													key={account.id}
													account={account}
													itemName={
														items?.find((item) => item.id === account.itemId)
															?.name || ''
													}
													onClick={(id) => console.log('id', id)}
												/>
											))}
										</div>
									</AccordionContent>

									<div
										style={{
											display: 'flex',
											gap: 5,
											marginBottom: 10,
											marginLeft: 16,
											fontStyle: 'italic',
											color: 'darkcyan',
										}}
									>
										<span>{`Total: `}</span>
										<span style={{ fontWeight: 'bold' }}>
											{formatMoney(
												filteredAccounts.reduce((acc, curr) => {
													return acc + (curr?.currentBalance ?? 0);
												}, 0),
											)}
										</span>
									</div>
								</AccordionItem>
							</Accordion>
						</div>
					) : null;
				})
			) : isLoading ? (
				<span>loading</span>
			) : isError ? (
				<span>error</span>
			) : (
				<span>no data</span>
			)}
		</div>
	);
};

export const AccountsOverview: FC = () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			gap: appearanceConfig.lgGap,
		}}
	>
		<AccountCards />
		<Separator />
		<Heading3 content="Activity" />
		<ActivityFeed />
	</div>
);
