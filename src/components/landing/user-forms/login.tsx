import { z } from 'zod';
import { configToSchema, FormCard } from './shared-form';

const fields = {
	username: {
		type: 'text',
		display: 'Username',
		schema: z
			.string()
			.min(1, { message: 'Username is required' })
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
} as const;

const zodSchema = configToSchema(fields);
function onSubmit(values: z.infer<typeof zodSchema>) {
	// make api call
	console.log(values);
}

export const LoginCard = () =>
	FormCard({
		config: fields,
		onSubmit: onSubmit,
	});
