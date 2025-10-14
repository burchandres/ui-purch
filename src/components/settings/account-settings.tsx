import { type FC, useEffect } from 'react';
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
					user?.income && !Number.isNaN(parseInt(user.income))
						? parseInt(user.income)
						: undefined,
				// password: undefined,
			} as Partial<CreateAccountFormData>)}
		/>
	);
};
