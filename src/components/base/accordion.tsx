import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/shadcn';

const accordionVariants = {
	default: {
		root: '',
		item: 'border-b last:border-b-0',
		trigger: 'hover:underline py-4',
		content: 'pt-0 pb-4',
	},
	card: {
		root: 'flex flex-col gap-3',
		item: 'bg-panel rounded-lg border px-2',
		trigger: 'hover:no-underline py-3',
		content: 'pt-0 pb-2 ',
	},
} as const;

type AccordionVariant = keyof typeof accordionVariants;

interface AccordionContextValue {
	variant: AccordionVariant;
}

const AccordionContext = React.createContext<AccordionContextValue>({
	variant: 'default',
});

function Accordion({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
	variant?: AccordionVariant;
}) {
	return (
		<AccordionContext.Provider value={{ variant }}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				className={cn('w-max', accordionVariants[variant].root, className)}
				{...props}
			/>
		</AccordionContext.Provider>
	);
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	const { variant } = React.useContext(AccordionContext);

	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(accordionVariants[variant].item, className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	const { variant } = React.useContext(AccordionContext);

	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
					accordionVariants[variant].trigger,
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	const { variant } = React.useContext(AccordionContext);

	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
			{...props}
		>
			<div className={cn(accordionVariants[variant].content, className)}>
				{children}
			</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
