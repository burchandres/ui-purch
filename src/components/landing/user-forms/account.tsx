import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
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
import { useRegisterUser, useUpdateUser } from '@/hooks/user/user-mutations';
import { parseErrorMessage } from '@/lib/api/utils';
import { FormField } from './form-field';
import { submitLogin } from './login';
import { createEditSchema } from './utils';

// create schema requires all fields
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
		.optional() // not actually optional. just wanted to customize empty message
		.refine((val) => val !== undefined, 'Income is required'),
	incomeRate: z.string().optional(),
});

// edit schema - at least one field must be provided
const editAccountSchema = createEditSchema(createAccountSchema, {
	message: 'You must update at least one field',
}).extend({
	password: z
		.string()
		.optional()
		.refine(
			(pw) => {
				return !pw || (pw.length >= 4 && pw.length <= 20);
			},
			{
				message: 'New password must be between 4 and 20 characters in length',
			},
		),
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
type EditAccountFormData = z.infer<typeof editAccountSchema>;

interface AccountCardProps {
	mode?: 'create' | 'edit';
	defaultValues?: Partial<CreateAccountFormData>;
}

export const AccountCard = ({
	mode = 'create',
	defaultValues,
}: AccountCardProps) => {
	const navigate = useNavigate();
	const isEditMode = mode === 'edit';

	const { register, isLoading: isRegistering } = useRegisterUser();
	const { updateUser, isLoading: isUpdating } = useUpdateUser();

	const form = useForm<CreateAccountFormData | EditAccountFormData>({
		resolver: zodResolver(isEditMode ? editAccountSchema : createAccountSchema),
		defaultValues: isEditMode
			? defaultValues
			: {
					username: '',
					password: undefined,
					firstName: '',
					lastName: '',
					income: undefined,
					incomeRate: 'annual',
				},
	});

	const handleSubmit = async (
		values: CreateAccountFormData | EditAccountFormData,
	) => {
		if (isEditMode) {
			// filter out undefined values to only send changed fields
			const updates = Object.fromEntries(
				Object.entries(values).filter(
					([_, value]) => value !== undefined && value !== '',
				),
			);

			updateUser(updates, {
				onSuccess: () => {
					toast.success('Profile successfully updated');
				},
				onError: (error: Error) => {
					toast.error(parseErrorMessage(error));
				},
			});
		} else {
			const createValues = values as CreateAccountFormData;
			register(
				{
					...createValues,
				},
				{
					onSuccess: async () => {
						toast.success('User successfully created.');
						await submitLogin(
							{
								username: createValues.username,
								password: createValues.password,
							},
							navigate,
						);
					},
					onError: (error: Error) => {
						toast.error(parseErrorMessage(error));
					},
				},
			);
		}
	};

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
							<Button type="submit" disabled={isRegistering || isUpdating}>
								{isEditMode ? 'Update' : 'Submit'}
							</Button>
							{!isEditMode && (
								<Tooltip>
									<TooltipTrigger asChild>
										<Lock size={16} />
									</TooltipTrigger>
									<TooltipContent side="right" className="max-w-45">
										<p>Purch doesn't share your data with anyone else</p>
									</TooltipContent>
								</Tooltip>
							)}
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
};
