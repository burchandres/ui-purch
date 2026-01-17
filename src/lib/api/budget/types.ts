export type Transaction = {
	id: string;
	accountId: string;
	categoryLabel?: string;
	authorizedDate: Date;
	settledDate?: Date;
	merchant?: string;
	amount: number;
	currencyCode?: string;
	pending: boolean;
};

export type TransactionResponse = Omit<
	Transaction,
	'authorizedDate' | 'settledDate'
> & {
	authorizedDate?: string;
	settledDate?: string;
};

export type TransactionUpdateRequest = Partial<TransactionResponse>;

export type Category = {
	id: string;
	userId: string;
	label: string;
	currentSpending: number;
	allocatedSpending: number;
};

export type Item = {
	id: string;
	userId: string;
	accessToken: string;
	name: string;
	transactionCursor: string;
};

export type DepositorySubType = 'Checking' | 'Savings';

export type CreditSubType = 'Credit Card';

export type InvestmentSubType = 'IRA' | '401k';

export type AccountSubType =
	| DepositoryAccount
	| CreditSubType
	| InvestmentSubType;

type BaseAccount = {
	id: string;
	itemId: string;
	name: string;
	availableBalance?: number;
	currentBalance?: number;
};

type DepositoryAccount = BaseAccount & {
	type: 'Depository';
	subType?: DepositorySubType;
};

type CreditAccount = BaseAccount & {
	type: 'Credit';
	subType?: CreditSubType;
};

type InvestmentAccount = BaseAccount & {
	type: 'Investment';
	subType?: InvestmentSubType;
};

export type Account = DepositoryAccount | CreditAccount | InvestmentAccount;
