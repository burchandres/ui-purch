import { type FC, useEffect } from 'react';
import { useUserInfo } from '@/hooks/user/login-logout';
import {
	AccountCard,
	type CreateAccountFormData,
} from '../landing/user-forms/account';

export const AccountSettings: FC = () => {
	const { user } = useUserInfo();
	useEffect(() => {
		console.log('user', user);
	}, [user]);
	console.log;
	return (
		<AccountCard
			mode="edit"
			defaultValues={
				{
					...user,
					// income:
					// 	user?.income && !Number.isNaN(parseFloat(user.income))
					// 		? parseFloat(user.income)
					// 		: undefined,
					password: undefined,
					// id: user?.id,
				} as Partial<CreateAccountFormData>
			}
		/>
	);
};
