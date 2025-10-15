import { createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '@/components/landing/landing-page';
import { redirectIfAuth } from '@/lib/auth-loader';

export const Route = createFileRoute('/landing')({
	component: () => <LandingPage />,
	loader: redirectIfAuth,
});
