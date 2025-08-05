import { Button } from '@/components/base/button';
import { Card, CardContent } from '@/components/base/card';
import { Form } from '@/components/base/form';
import { Input } from '@/components/base/input';
import { Label } from '@/components/base/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type DefaultValues, type FieldValues } from 'react-hook-form';
import { z, type ZodType, type ZodObject } from 'zod';
import type { NavigateOptions } from '@tanstack/react-router';

type FieldConfig = {
	type: string;
	display: string;
	schema: ZodType;
};
type FieldsConfig = Record<string, FieldConfig>;

type FormValues<T extends FieldsConfig> = {
	[K in keyof T]: z.infer<T[K]['schema']>;
};

export function configToSchema(config: FieldsConfig): ZodObject {
	const shape: Record<string, ZodType> = {};

	Object.keys(config).forEach((key) => {
		shape[key] = config[key].schema;
	});

	return z.object(shape);
}

export function schemaToForm(schema: ZodObject<FieldValues>) {
	const defaultValues: DefaultValues<FieldValues> = {};

	if ('shape' in schema && schema.shape) {
		Object.keys(schema.shape).forEach((key) => {
			(defaultValues as FieldValues)[key] = '';
		});
	}

	return useForm<FieldValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});
}

export function FormCard<T extends FieldsConfig>({
	config,
	onSubmit,
	navigate,
}: {
	config: FieldsConfig;
	onSubmit: (
		values: FormValues<T>,
		navigate?: (options: NavigateOptions) => void,
	) => void;
	navigate?: (options: NavigateOptions) => void;
}) {
	const zodSchema = configToSchema(config);
	const form = schemaToForm(zodSchema);
	const handleSubmit = (values: FormValues<T>) => onSubmit(values, navigate);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<Card>
					<CardContent>
						<div className="flex flex-col gap-6 mt-4">
							{Object.entries(config).map(([key, field]) => (
								<div key={key} className="grid gap-2">
									<Label htmlFor={key}>{field.display}</Label>
									<Input id={key} type={field.type} {...form.register(key)} />
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
