import { createFileRoute, redirect } from '@tanstack/react-router';
import { checkIfLoggedIn } from '@/lib/api/user';

export const Route = createFileRoute('/')({
	loader: async () => {
		const loggedIn = await checkIfLoggedIn();
		if (!loggedIn) throw redirect({ to: '/landing' });
		throw redirect({ to: '/dashboard' });
	},
});
