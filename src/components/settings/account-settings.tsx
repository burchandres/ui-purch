import type { FC } from 'react';
import { useUserInfo } from '@/hooks/user/login-logout';
import { keysToUnCap } from '@/lib/api/utils';
import {
	AccountCard,
	type CreateAccountFormData,
} from '../landing/user-forms/account';

export const AccountSettings: FC = () => {
	const { user } = useUserInfo();
	return (
		<AccountCard
			mode="edit"
			defaultValues={keysToUnCap({
				...user,
				income:
					user?.Income && !Number.isNaN(parseFloat(user.Income))
						? parseFloat(user.Income)
						: undefined,
				password: undefined,
			} as Partial<CreateAccountFormData>)}
		/>
	);
};
