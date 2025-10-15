import { zodResolver } from '@hookform/resolvers/zod';
import type { UseNavigateResult } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/base/button';
import { Card, CardContent } from '@/components/base/card';
import { Form } from '@/components/base/form';
import { Input } from '@/components/base/input';
import { useLogin } from '@/hooks/user/login-logout';
import { parseErrorMessage } from '@/lib/api/utils';
import { FormField } from './form-field';

const loginSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Username is required' })
		.max(20, { message: 'Username must be less than 20 characters' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 4 characters' })
		.max(20, { message: 'Password must be less than 20 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Keep this exported for use in AccountCard
export async function submitLogin(
	values: LoginFormData,
	navigate: UseNavigateResult<string>,
) {
	// This function is still used by AccountCard after registration
	// You might want to refactor AccountCard to use useLogin hook instead
	const { login } = useLogin();
	login(values, {
		onSuccess: () => {
			toast.success('Successfully logged in');
			navigate({ to: '/dashboard' });
		},
		onError: (error: Error) => {
			toast.error(parseErrorMessage(error));
		},
	});
}

export const LoginCard = () => {
	const navigate = useNavigate();
	const { login, isLoading } = useLogin();

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const handleSubmit = (values: LoginFormData) => {
		login(values, {
			onSuccess: () => {
				toast.success('Successfully logged in');
				navigate({ to: '/dashboard' });
			},
			onError: (error: Error) => {
				toast.error(parseErrorMessage(error));
			},
		});
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
									disabled={isLoading}
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
									disabled={isLoading}
								/>
							</FormField>
						</div>
						<Button className="mt-4" type="submit" disabled={isLoading}>
							'Submit'
						</Button>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
};
