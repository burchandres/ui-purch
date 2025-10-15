import type { FC } from 'react';
import { useUser } from '@/hooks/user/login-logout';
import { keysToCamelCase } from '@/lib/api/utils';
import {
	AccountCard,
	type CreateAccountFormData,
} from '../landing/user-forms/account';

export const AccountSettings: FC = () => {
	const { user } = useUser();
	return (
		<AccountCard
			mode="edit"
			defaultValues={keysToCamelCase({
				...user,
				income:
					user?.income && !Number.isNaN(parseFloat(user.income))
						? parseFloat(user.income)
						: undefined,
				password: undefined,
			} as Partial<CreateAccountFormData>)}
		/>
	);
};
