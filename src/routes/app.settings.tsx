import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/settings')({
	component: () => <p className="m-4">Settings</p>,
});
