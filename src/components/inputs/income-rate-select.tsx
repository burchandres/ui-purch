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
} from '@/components/base/tooltip'; // Adjust import path as needed
import { inputsConfig } from '@/config/inputs';

interface IncomeRateSelectProps {
	value?: string;
	onValueChange?: (value: string) => void;
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
			placeholder = 'Select rate',
			className,
			disabled,
			...props
		},
		ref,
	) => {
		const rates = inputsConfig.income.rates;

		// helper function to capitalize first letter
		const formatLabel = (rate: (typeof rates)[0]) => {
			return (
				rate.label || rate.value.charAt(0).toUpperCase() + rate.value.slice(1)
			);
		};

		return (
			<Select
				defaultValue="annual"
				value={value}
				onValueChange={onValueChange}
				disabled={disabled}
				{...props}
			>
				<SelectTrigger ref={ref} className={className}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<TooltipProvider>
					<SelectContent>
						{rates.map((rate) => (
							<Tooltip key={rate.value}>
								<TooltipTrigger asChild>
									<SelectItem key={rate.value} value={rate.value}>
										<div className="flex items-center justify-between w-full">
											<span>{formatLabel(rate)}</span>
										</div>
									</SelectItem>
								</TooltipTrigger>
								<TooltipContent side="right">
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
