import { tv } from 'tailwind-variants';

export type ButtonVariants = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

export const buttonVariants = tv({
	base: 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		variant: {
			default: [
				'bg-[hsl(var(--primary))]',
				'text-[hsl(var(--primary-foreground))]',
				'border border-[hsl(345,82%,35%)]',
				'shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]', // More pronounced shadow
				'hover:bg-[hsl(345,82%,35%)]',
				'transition-all duration-200'
			],
			destructive: [
				'bg-[hsl(var(--destructive))]',
				'text-[hsl(var(--destructive-foreground))]',
				'border border-[hsl(0,72.2%,45.6%)]',
				'shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]',
				'hover:bg-[hsl(0,72.2%,45.6%)]',
				'transition-all duration-200'
			],
			outline: [
				'border',
				'border-[hsl(var(--border))]',
				'bg-transparent',
				'hover:bg-slate-50',
				'hover:text-slate-900',
				'shadow-sm'
			],
			secondary: [
				'bg-[hsl(var(--secondary))]',
				'text-[hsl(var(--secondary-foreground))]',
				'hover:bg-slate-200',
				'shadow-sm'
			],
			ghost: ['hover:bg-slate-100', 'hover:text-slate-900'],
			link: ['text-[hsl(var(--primary))]', 'underline-offset-4', 'hover:underline']
		},
		size: {
			default: 'h-9 px-4 py-2',
			sm: 'h-8 rounded-md px-3 text-xs',
			lg: 'h-10 rounded-md px-8',
			icon: 'h-9 w-9'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});
