import { createFileRoute } from '@tanstack/react-router';
import { AccountsPage } from '@/components/accounts/accounts-page';

export const Route = createFileRoute('/_auth/accounts')({
	component: AccountsPage,
});
