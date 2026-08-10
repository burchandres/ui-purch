import { useEffect } from 'react';
import type { FC } from 'react';
import { useUserInfo } from '@/hooks/user/login-logout';
import { AccountCard } from '../landing/user-forms/account';
import type { CreateAccountFormData } from '../landing/user-forms/account';

export const AccountSettings: FC = () => {
  const { user } = useUserInfo();
  useEffect(() => {
    console.log('user', user);
  }, [user]);
  return (
    <AccountCard
      mode='edit'
      defaultValues={
        {
          ...user,
          // Income:
          // 	User?.income && !Number.isNaN(parseFloat(user.income))
          // 		? parseFloat(user.income)
          // 		: undefined,
          password: undefined,
          // Id: user?.id,
        } as Partial<CreateAccountFormData>
      }
    />
  );
};
