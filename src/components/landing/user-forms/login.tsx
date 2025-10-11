import type { UseNavigateResult } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { type LoginData, login } from '@/lib/api/user';
import { configToSchema, type FieldsConfig, FormCard } from './shared-form';

const fields: FieldsConfig = {
	username: {
		inputType: 'text',
		display: 'Username',
		schema: z
			.string()
			.min(1, { message: 'Username is required' })
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
} as const;

const zodSchema = configToSchema(fields);
type LoginFormData = z.infer<typeof zodSchema>;

export async function submitLogin(
	values: LoginFormData,
	navigate: UseNavigateResult<string>,
) {
	console.log('vals', values);
	const res = await login(values as LoginData);
	console.log('res', res);
	if (res && res.status === 200) {
		toast.success(res?.data.message || 'Successfully logged in');
		navigate({ to: '/app/dashboard' });
	} else {
		toast.error(res?.data.message || 'Unable to login');
	}
}

export const LoginCard = () => {
	const navigate = useNavigate();
	return FormCard({
		config: fields,
		onSubmit: (vals) => submitLogin(vals, navigate),
		navigate: navigate,
	});
};
