export type IncomeRate = 'hourly' | 'weekly' | 'biweekly' | 'bimonthly' | 'monthly' | 'annual';

export interface InputsConfig {
  income: {
    min: number;
    max: number;
    rates: { label?: string; value: IncomeRate; tooltip?: string }[];
  };
}

export const inputsConfig: InputsConfig = {
  income: {
    max: 999_999_999_999_999,
    min: 0,
    rates: [
      {
        tooltip: 'You get paid this amount for every hour you work',
        value: 'hourly',
      },
      {
        tooltip: 'You get paid this amount once a week',
        value: 'weekly',
      },
      {
        label: 'Bi-weekly',
        tooltip: 'You get paid this amount twice a week',
        value: 'biweekly',
      },
      {
        tooltip: 'You get paid this amount once a month',
        value: 'monthly',
      },
      {
        label: 'Bi-monthly',
        tooltip: 'You get paid this amount twice a month',
        value: 'bimonthly',
      },
      {
        tooltip: 'You get paid this amount once a year',
        value: 'annual',
      },
    ],
  },
} as const;
