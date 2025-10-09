import { z } from 'zod';
import { configToSchema, FormCard, type FieldsConfig } from './shared-form';
import { createUser } from '@/lib/api/user';
import type { CreateUserData } from '@/lib/api/user';
import { toast } from 'sonner';
import { submitLogin } from './login';
import { useNavigate, type UseNavigateResult } from '@tanstack/react-router';
import { MoneyInput } from '@/components/inputs/money-input';
import { IncomeRateSelect } from '@/components/inputs/income-rate-select';
import { inputsConfig } from '@/config/inputs';

const fields: FieldsConfig = {
	username: {
		inputType: 'text',
		display: 'Username',
		schema: z
			.string()
			.min(2, { message: 'Username must be at least 2 characters' })
			.max(20, { message: 'Username must be less than 20 characters' }),
	},
	password: {
		inputType: 'password',
		display: 'Password',
		schema: z
			.string()
			.min(4, { message: 'Password must be at least 4 characters' })
			.max(20, { message: 'Password must be less than 20 characters' }),
	},
	firstName: {
		inputType: 'text',
		display: 'First Name',
		schema: z
			.string()
			.min(1, { message: 'First name is required' })
			.max(20, { message: 'First name must be less than 20 characters' }),
	},
	lastName: {
		inputType: 'text',
		display: 'Last Name',
		schema: z
			.string()
			.min(1, { message: 'Last name is required' })
			.max(20, { message: 'Last name must be less than 20 characters' }),
	},
	income: {
		inputType: 'income',
		display: 'Income',
		schema: z
			.number()
			.optional() // not actually optional. just wanted to customize undefined msg
			.refine((val) => {
				return val !== undefined;
			}, 'Income is required'),
		component: MoneyInput,
	},
	incomeRate: {
		inputType: 'incomeRate',
		display: 'Income Rate',
		schema: z.string().optional(),
		component: IncomeRateSelect,
	},
} as const;

const zodSchema = configToSchema(fields);
type CreateAccountFormData = z.infer<typeof zodSchema>;

async function onSubmit(
	values: CreateAccountFormData,
	navigate: UseNavigateResult<string>,
) {
	const res = await createUser(values as CreateUserData);
	console.log('res', res);
	if (res.status && res.status === 200) {
		toast.success('User successfully created.');
		await submitLogin({ ...values }, navigate);
	} else {
		toast.error(typeof res?.data === 'string' ? res.data : 'An error occurred');
	}
}

export const CreateAccountCard = () => {
	const navigate = useNavigate();
	return FormCard({
		config: fields,
		onSubmit: (vals) => onSubmit(vals, navigate),
	});
};
