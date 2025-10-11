import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { checkIfLoggedIn } from '@/lib/api/user';

export const Route = createFileRoute('/_auth')({
	component: Outlet,
	loader: async () => {
		const loggedIn = await checkIfLoggedIn();
		if (!loggedIn) throw redirect({ to: '/landing' });
		// else, continue to normal page
	},
});
