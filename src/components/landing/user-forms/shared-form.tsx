import { zodResolver } from '@hookform/resolvers/zod';
import type { NavigateOptions } from '@tanstack/react-router';
import type { FC } from 'react';
import { Controller, type FieldValues, useForm } from 'react-hook-form';
import { type ZodType, z } from 'zod';
import { Button } from '@/components/base/button';
import { Card, CardContent } from '@/components/base/card';
import { Form } from '@/components/base/form';
import { Input } from '@/components/base/input';
import { Label } from '@/components/base/label';

export type FieldConfig = {
	inputType: string;
	display: string;
	schema: ZodType;
	component?: FC;
};
export type FieldsConfig = Record<string, FieldConfig>;

export function configToSchema(config: FieldsConfig) {
	const shape: Record<string, ZodType> = {};

	Object.keys(config).forEach((key) => {
		if (key !== 'component') shape[key] = config[key].schema;
	});

	return z.object(shape);
}

export function FormCard({
	config,
	onSubmit,
	navigate,
}: {
	config: FieldsConfig;
	onSubmit: (
		// biome-ignore lint/suspicious/noExplicitAny: i dont think this matters
		values: any,
		navigate?: (options: NavigateOptions) => void,
	) => void;
	navigate?: (options: NavigateOptions) => void;
}) {
	const zodSchema = configToSchema(config);

	const form = useForm({
		resolver: zodResolver(zodSchema),
		defaultValues: Object.keys(config).reduce(
			(acc, key) => {
				if (key)
					acc[key] =
						config[key].inputType === 'income'
							? undefined
							: config[key].inputType === 'incomeRate'
								? 'annual'
								: '';
				return acc;
			},
			{} as Record<string, string | undefined>,
		),
	});

	const handleSubmit = (values: FieldValues) => onSubmit(values, navigate);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<Card>
					<CardContent>
						<div className="flex flex-col gap-6 mt-4">
							{Object.entries(config).map(([key, field]) => (
								<div key={key} className="grid gap-2">
									<Label htmlFor={key}>{field.display}</Label>
									{field.component ? (
										<Controller
											control={form.control}
											name={key}
											render={({ field: controllerField }) => (
												<field.component
													id={key}
													value={controllerField.value}
													onChange={controllerField.onChange}
													onValueChange={controllerField.onChange}
													onBlur={controllerField.onBlur}
													name={controllerField.name}
												/>
											)}
										/>
									) : (
										<Input
											id={key}
											type={field.inputType}
											{...form.register(key)}
										/>
									)}
									{form.formState.errors[key] && (
										<p className="text-red-500 text-sm">
											{form.formState.errors[key]?.message as string}
										</p>
									)}
								</div>
							))}
						</div>
						<Button className="mt-4" type="submit">
							Submit
						</Button>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
