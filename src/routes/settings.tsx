import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/components/settings/settings-page';

export type SettingsParams = {
	section: 'application' | 'user';
};

export const Route = createFileRoute('/settings')({
	component: SettingsPage,
});
