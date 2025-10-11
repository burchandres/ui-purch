import type { ReactNode } from 'react';
import { Label } from '@/components/base/label';

interface FormFieldProps {
	id: string;
	label: string;
	error?: string;
	children: ReactNode;
	className?: string;
}

export const FormField = ({
	id,
	label,
	error,
	children,
	className,
}: FormFieldProps) => {
	return (
		<div className={`grid gap-2 ${className || ''}`}>
			<Label htmlFor={id}>{label}</Label>
			{children}
			<div>{error && <p className="text-red-500 text-sm pl-3">{error}</p>}</div>
		</div>
	);
};
