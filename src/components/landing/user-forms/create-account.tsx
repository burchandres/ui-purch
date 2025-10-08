import { z } from 'zod';
import { configToSchema, FormCard } from './shared-form';
import { createUser } from '@/lib/api/user';
import type { CreateUserData } from '@/lib/api/user';
import { toast } from 'sonner';
import { submitLogin } from './login';
import { useNavigate, type UseNavigateResult } from '@tanstack/react-router';

const fields = {
	username: {
		type: 'text',
		display: 'Username',
		schema: z
			.string()
			.min(2, { message: 'Username must be at least 2 characters' })
			.max(20, { message: 'Username must be less than 20 characters' }),
	},
	password: {
		type: 'password',
		display: 'Password',
		schema: z
			.string()
			.min(4, { message: 'Password must be at least 4 characters' })
			.max(20, { message: 'Password must be less than 20 characters' }),
	},
	firstName: {
		type: 'text',
		display: 'First Name',
		schema: z
			.string()
			.min(1, { message: 'First name is required' })
			.max(20, { message: 'First name must be less than 20 characters' }),
	},
	lastName: {
		type: 'text',
		display: 'Last Name',
		schema: z
			.string()
			.min(1, { message: 'Last name is required' })
			.max(20, { message: 'Last name must be less than 20 characters' }),
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
		await submitLogin({...values}, navigate);
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
