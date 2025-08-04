import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/dashboard')({
	component: () => <p>Dashboard</p>,
});
