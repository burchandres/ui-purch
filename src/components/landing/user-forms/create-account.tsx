import { zodResolver } from '@hookform/resolvers/zod';
import { type UseNavigateResult, useNavigate } from '@tanstack/react-router';
import { Lock } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/base/button';
import { Card, CardContent } from '@/components/base/card';
import { Form } from '@/components/base/form';
import { Input } from '@/components/base/input';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/base/tooltip';
import { IncomeRateSelect } from '@/components/inputs/income-rate-select';
import { MoneyInput } from '@/components/inputs/money-input';
import type { CreateUserData } from '@/lib/api/user';
import { createUser } from '@/lib/api/user';
import { FormField } from './form-field';
import { submitLogin } from './login';

const createAccountSchema = z.object({
	username: z
		.string()
		.min(2, { message: 'Username must be at least 2 characters' })
		.max(20, { message: 'Username must be less than 20 characters' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 4 characters' })
		.max(20, { message: 'Password must be less than 20 characters' }),
	firstName: z
		.string()
		.min(1, { message: 'First name is required' })
		.max(20, { message: 'First name must be less than 20 characters' }),
	lastName: z
		.string()
		.min(1, { message: 'Last name is required' })
		.max(20, { message: 'Last name must be less than 20 characters' }),
	income: z
		.number()
		.optional()
		.refine((val) => val !== undefined, 'Income is required'),
	incomeRate: z.string().optional(),
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

async function onSubmit(
	values: CreateAccountFormData,
	navigate: UseNavigateResult<string>,
) {
	console.log('vals', values);
	const res = await createUser(values as CreateUserData);
	console.log('res', res);
	if (res.status && res.status === 200) {
		toast.success('User successfully created.');
		await submitLogin(
			{ username: values.username, password: values.password },
			navigate,
		);
	} else {
		toast.error(typeof res?.data === 'string' ? res.data : 'An error occurred');
	}
}

export const CreateAccountCard = () => {
	const navigate = useNavigate();

	const form = useForm<CreateAccountFormData>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			income: undefined,
			incomeRate: 'annual',
		},
	});

	const handleSubmit = (values: CreateAccountFormData) =>
		onSubmit(values, navigate);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<Card>
					<CardContent>
						<div className="flex flex-col gap-4">
							<FormField
								id="username"
								label="Username"
								error={form.formState.errors.username?.message}
							>
								<Input
									id="username"
									type="text"
									{...form.register('username')}
								/>
							</FormField>

							<FormField
								id="password"
								label="Password"
								error={form.formState.errors.password?.message}
							>
								<Input
									id="password"
									type="password"
									{...form.register('password')}
								/>
							</FormField>

							<FormField
								id="firstName"
								label="First Name"
								error={form.formState.errors.firstName?.message}
							>
								<Input
									id="firstName"
									type="text"
									{...form.register('firstName')}
								/>
							</FormField>

							<FormField
								id="lastName"
								label="Last Name"
								error={form.formState.errors.lastName?.message}
							>
								<Input
									id="lastName"
									type="text"
									{...form.register('lastName')}
								/>
							</FormField>

							<div className="flex gap-4 items-start">
								<FormField
									id="income"
									label="Income"
									error={form.formState.errors.income?.message}
								>
									<Controller
										control={form.control}
										name="income"
										render={({ field }) => (
											<MoneyInput
												id="income"
												value={field.value}
												onChange={field.onChange}
												onValueChange={field.onChange}
												onBlur={field.onBlur}
												name={field.name}
											/>
										)}
									/>
								</FormField>

								<FormField
									id="incomeRate"
									label="Rate"
									error={form.formState.errors.incomeRate?.message}
								>
									<Controller
										control={form.control}
										name="incomeRate"
										render={({ field }) => (
											<IncomeRateSelect
												id="incomeRate"
												value={field.value}
												onChange={field.onChange}
												onValueChange={field.onChange}
												onBlur={field.onBlur}
												name={field.name}
											/>
										)}
									/>
								</FormField>
							</div>
						</div>
						<div className="flex gap-4 mt-4 items-center">
							<Button type="submit">Submit</Button>
							<Tooltip>
								<TooltipTrigger asChild>
									<Lock size={16} />
								</TooltipTrigger>
								<TooltipContent side="right" className="max-w-45">
									<p>Purch doesn't share your data with anyone else</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
};
