import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { type FC, useEffect } from 'react';
import { useTransactions } from '@/hooks/budget';
import type { Transaction } from '@/lib/api/budget/types';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../base/table';

export const TransactionsTable: FC = () => {
	const { transactions, isError, isLoading } = useTransactions();

	useEffect(() => {
		console.log('ts', transactions);
	}, [transactions]);

	const columns: ColumnDef<Transaction>[] = [
		{
			accessorKey: 'authorizedDate',
			header: 'Date authorized',
			enableSorting: true,
		},
		{
			accessorKey: 'categoryLabel',
			header: 'Category',
		},
		{
			accessorKey: 'amount',
			header: 'Amount',
		},
		{
			accessorKey: 'merchant',
			header: 'Merchant',
		},
	];

	const table = useReactTable({
		data: transactions ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return transactions?.length ? (
		<div className="overflow-hidden rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	) : isLoading ? (
		<p>loading</p>
	) : isError ? (
		<p>error</p>
	) : (
		<p>no data</p>
	);
};
