import { NumericFormat } from 'react-number-format';
import type { NumericFormatProps } from 'react-number-format';

import { cn } from '@/lib/shadcn';
import { forwardRef } from 'react';

interface MoneyInputProps
	extends Omit<
		NumericFormatProps,
		| 'thousandSeparator'
		| 'decimalSeparator'
		| 'prefix'
		| 'decimalScale'
		| 'fixedDecimalScale'
	> {
	min?: number;
	max?: number;
	onChange?: (value: number) => void;
}

const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
	({ className, min = 0, max, onValueChange, onChange, ...props }, ref) => {
		return (
			<NumericFormat
				{...props}
				getInputRef={ref}
				thousandSeparator=","
				decimalSeparator="."
				prefix="$ "
				decimalScale={2}
				fixedDecimalScale={true}
				allowNegative={min < 0}
				isAllowed={(values) => {
					const { floatValue } = values;
					if (floatValue === undefined) return true;
					if (min !== undefined && floatValue < min) return false;
					if (max !== undefined && floatValue > max) return false;
					return true;
				}}
				onValueChange={(values, sourceInfo) => {
					// call the original onValueChange if provided
					onValueChange?.(values, sourceInfo);
					// call RHF onChange with numeric value instead of formatted string
					if (onChange) {
						// create a synthetic event-like object if needed, or just pass the number
						onChange(values.floatValue ?? 0);
					}
				}}
				// remove the default onChange behavior by not passing it through
				onChange={undefined}
				className={cn(
					'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					// 'font-mono',
					className,
				)}
				placeholder="$"
			/>
		);
	},
);

MoneyInput.displayName = 'MoneyInput';

export { MoneyInput };
export type { MoneyInputProps };
