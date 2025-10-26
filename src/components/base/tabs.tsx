import * as TabsPrimitive from '@radix-ui/react-tabs';
import type * as React from 'react';
import { appearanceConfig } from '@/config/appearance';
import { cn } from '@/lib/shadcn';

function Tabs({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn(`flex flex-col gap-${appearanceConfig.mdGap}`, className)}
			{...props}
		/>
	);
}

function TabsList({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(
				'inline-flex gap-2 w-fit items-center',
				'data-[orientation=horizontal]:flex-row',
				'data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-auto data-[orientation=vertical]:items-start',
				className,
			)}
			{...props}
		/>
	);
}

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:border-ring hover:ring-[1px] hover:ring-ring/50",
				'h-9 px-4 py-2 has-[>svg]:px-3',
				'hover:bg-accent dark:hover:bg-accent/50',
				'data-[state=active]:bg-accent data-[state=active]:border-ring data-[state=active]:ring-[1px] data-[state=active]:ring-ring/50',
				'data-[orientation=vertical]:w-full',
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn('flex-1 outline-none', className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
