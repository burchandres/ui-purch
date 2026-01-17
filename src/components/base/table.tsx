import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/shadcn';

const tableVariants = cva('w-full caption-bottom text-sm', {
	variants: {
		variant: {
			default: '',
			open: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

const tableRowVariants = cva('transition-colors', {
	variants: {
		variant: {
			default: 'hover:bg-muted/50 data-[state=selected]:bg-muted border-b',
			open: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

const tableHeaderVariants = cva('', {
	variants: {
		variant: {
			default: '[&_tr]:border-b',
			open: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

const tableBodyVariants = cva('', {
	variants: {
		variant: {
			default: '[&_tr:last-child]:border-0',
			open: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

const tableCellVariants = cva(
	'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
	{
		variants: {
			variant: {
				default: '',
				open: 'py-3',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

const tableHeadVariants = cva(
	'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
	{
		variants: {
			variant: {
				default: '',
				open: 'h-auto py-4',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

type TableContextValue = {
	variant?: 'default' | 'open';
};

const TableContext = React.createContext<TableContextValue>({
	variant: 'default',
});

interface TableProps
	extends React.ComponentProps<'table'>,
		VariantProps<typeof tableVariants> {}

function Table({ className, variant, ...props }: TableProps) {
	return (
		<TableContext.Provider value={{ variant: variant ?? 'default' }}>
			<div
				data-slot="table-container"
				className="relative w-full overflow-x-auto"
			>
				<table
					data-slot="table"
					className={cn(tableVariants({ variant }), className)}
					{...props}
				/>
			</div>
		</TableContext.Provider>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	const { variant } = React.useContext(TableContext);
	return (
		<thead
			data-slot="table-header"
			className={cn(tableHeaderVariants({ variant }), className)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	const { variant } = React.useContext(TableContext);
	return (
		<tbody
			data-slot="table-body"
			className={cn(tableBodyVariants({ variant }), className)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	const { variant } = React.useContext(TableContext);
	return (
		<tr
			data-slot="table-row"
			className={cn(tableRowVariants({ variant }), className)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	const { variant } = React.useContext(TableContext);
	return (
		<th
			data-slot="table-head"
			className={cn(tableHeadVariants({ variant }), className)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	const { variant } = React.useContext(TableContext);
	return (
		<td
			data-slot="table-cell"
			className={cn(tableCellVariants({ variant }), className)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot="table-caption"
			className={cn('text-muted-foreground mt-4 text-sm', className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};
