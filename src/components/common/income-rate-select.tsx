import { capitalize } from 'lodash';
import { type ComponentRef, forwardRef } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/base/select';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/base/tooltip';
import { inputsConfig } from '@/config/inputs';

interface IncomeRateSelectProps {
	value?: string | number;
	id: string;
	onValueChange?: (value: string) => void;
	onChange?: (value: string) => void;
	onBlur?: () => void;
	name?: string;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

const IncomeRateSelect = forwardRef<
	ComponentRef<typeof SelectTrigger>,
	IncomeRateSelectProps
>(
	(
		{
			value,
			onValueChange,
			onChange,
			placeholder = 'Select rate',
			className,
			disabled,
			onBlur,
			name,
		},
		ref,
	) => {
		const rates = inputsConfig.income.rates;

		// helper function to capitalize first letter
		const formatLabel = (rate: (typeof rates)[0]) =>
			rate.label || capitalize(rate.value);

		const handleValueChange = (val: string) => {
			onValueChange?.(val);
			onChange?.(val);
		};

		return (
			<Select
				defaultValue="annual"
				value={typeof value === 'number' ? value.toString() : value}
				onValueChange={handleValueChange}
				disabled={disabled}
				name={name}
			>
				<SelectTrigger ref={ref} className={className} onBlur={onBlur}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<TooltipProvider>
					<SelectContent>
						{rates.map((rate) => (
							<Tooltip key={rate.value}>
								<TooltipTrigger asChild>
									<SelectItem value={rate.value}>
										<div className="flex items-center justify-between w-full">
											<span>{formatLabel(rate)}</span>
										</div>
									</SelectItem>
								</TooltipTrigger>
								<TooltipContent side="right" className="max-w-41">
									{rate.tooltip && <p className="max-w-xs">{rate.tooltip}</p>}
								</TooltipContent>
							</Tooltip>
						))}
					</SelectContent>
				</TooltipProvider>
			</Select>
		);
	},
);

IncomeRateSelect.displayName = 'IncomeRateSelect';

export { IncomeRateSelect };
export type { IncomeRateSelectProps };
