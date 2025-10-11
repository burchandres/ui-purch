import { createFileRoute, redirect } from '@tanstack/react-router';
import { LandingPage } from '@/components/landing/landing-page';
import { checkIfLoggedIn } from '@/lib/api/user';

export const Route = createFileRoute('/landing')({
	component: () => <LandingPage />,
	loader: async () => {
		const loggedIn = await checkIfLoggedIn();
		if (loggedIn) throw redirect({ to: '/dashboard' });
		// else, stay on landing page
	},
});
