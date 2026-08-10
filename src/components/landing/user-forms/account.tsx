import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Lock } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/base/button';
import { Card, CardContent } from '@/components/base/card';
import { Form } from '@/components/base/form';
import { Input } from '@/components/base/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/base/tooltip';
import { IncomeRateSelect } from '@/components/inputs/income-rate-select';
import { MoneyInput } from '@/components/inputs/money-input';
import { appearanceConfig } from '@/config/appearance';
import type { IncomeRate } from '@/config/inputs';
import { useLogin } from '@/hooks/user/login-logout';
import { useRegisterUser, useUpdateUser } from '@/hooks/user/user-mutations';
import { parseErrorMessage } from '@/lib/api/utils';
import { FormField } from './form-field';
import { createEditSchema } from './utils';

// Create schema requires all fields
const createAccountSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name must be less than 20 characters' }),
  income: z
    .number()
    .optional() // Not actually optional. just wanted to customize empty message
    .refine((val) => val !== undefined, 'Income is required'),
  incomeRate: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(20, { message: 'Last name must be less than 20 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters' })
    .max(20, { message: 'Username must be less than 20 characters' }),
});

// Edit schema - at least one field must be provided
const editAccountSchema = createEditSchema(createAccountSchema, {
  message: 'You must update at least one field',
}).extend({
  password: z
    .string()
    .optional()
    .refine((pw) => !pw || (pw.length >= 4 && pw.length <= 20), {
      message: 'New password must be between 4 and 20 characters in length',
    }),
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;
type EditAccountFormData = z.infer<typeof editAccountSchema>;

interface AccountCardProps {
  mode?: 'create' | 'edit';
  defaultValues?: Partial<CreateAccountFormData> & { id?: number };
}

export function AccountCard({ mode = 'create', defaultValues }: AccountCardProps) {
  const navigate = useNavigate();
  const isEditMode = mode === 'edit';

  const { register, isLoading: isRegistering } = useRegisterUser();
  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const { login } = useLogin();

  const form = useForm<CreateAccountFormData | EditAccountFormData>({
    defaultValues: isEditMode
      ? defaultValues
      : {
          firstName: '',
          income: undefined,
          incomeRate: 'annual',
          lastName: '',
          password: undefined,
          username: '',
        },
    resolver: zodResolver(isEditMode ? editAccountSchema : createAccountSchema),
  });

  const handleSubmit = async (values: CreateAccountFormData | EditAccountFormData) => {
    if (isEditMode) {
      // Filter out undefined values to only send changed fields
      // Special handling: exclude password if undefined, but include all other fields
      const updates = Object.fromEntries(
        Object.entries(values).filter(([key, value]) => {
          // Exclude password only if it's undefined
          if (key === 'password') {
            return value !== undefined && value !== '';
          }
          // Include all other fields regardless of value
          return value !== undefined && value !== '';
        }),
      );

      updateUser(updates, {
        onError: (error: Error) => {
          toast.error(parseErrorMessage(error));
        },
        onSuccess: () => {
          toast.success('Profile successfully updated');
        },
      });
    } else {
      register(
        {
          ...values,
          incomeRate: values.incomeRate as IncomeRate,
        },
        {
          onError: (error: Error) => {
            toast.error(parseErrorMessage(error));
          },
          onSuccess: () => {
            toast.success('User successfully created');
            login(
              {
                password: values.password as string,
                username: values.username,
              },
              {
                onError: (error: Error) => {
                  toast.error(parseErrorMessage(error));
                },
                onSuccess: () => {
                  toast.success('Successfully logged in');
                  navigate({ to: '/dashboard' });
                },
              },
            );
          },
        },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <Card>
          <CardContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: appearanceConfig.smGap,
              }}
            >
              <FormField
                id='username'
                label='Username'
                error={form.formState.errors.username?.message}
              >
                <Input id='username' type='text' {...form.register('username')} />
              </FormField>

              <FormField
                id='password'
                label='Password'
                error={form.formState.errors.password?.message}
              >
                <Input id='password' type='password' {...form.register('password')} />
              </FormField>

              <FormField
                id='firstName'
                label='First Name'
                error={form.formState.errors.firstName?.message}
              >
                <Input id='firstName' type='text' {...form.register('firstName')} />
              </FormField>

              <FormField
                id='lastName'
                label='Last Name'
                error={form.formState.errors.lastName?.message}
              >
                <Input id='lastName' type='text' {...form.register('lastName')} />
              </FormField>

              <div
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  gap: appearanceConfig.lgGap,
                }}
              >
                <FormField id='income' label='Income' error={form.formState.errors.income?.message}>
                  <Controller
                    control={form.control}
                    name='income'
                    render={({ field }) => (
                      <MoneyInput
                        id='income'
                        value={field.value}
                        onChange={field.onChange}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  id='incomeRate'
                  label='Rate'
                  error={form.formState.errors.incomeRate?.message}
                >
                  <Controller
                    control={form.control}
                    name='incomeRate'
                    render={({ field }) => (
                      <IncomeRateSelect
                        id='incomeRate'
                        value={field.value}
                        onChange={field.onChange}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    )}
                  />
                </FormField>
              </div>
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: appearanceConfig.mdGap,
                marginTop: appearanceConfig.mdGap,
              }}
            >
              <Button type='submit' disabled={isRegistering || isUpdating}>
                {isEditMode ? 'Update' : 'Submit'}
              </Button>
              {!isEditMode && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Lock size={16} />
                  </TooltipTrigger>
                  <TooltipContent side='right' className='max-w-45'>
                    <p>Purch doesn't share your data with anyone else</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
