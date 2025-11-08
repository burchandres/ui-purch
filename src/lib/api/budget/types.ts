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

export type DepositorySubType = {
	Checking: 'checking';
	Savings: 'savings';
};

export type CreditSubType = {
	CreditCard: 'credit card';
};

export type InvestmentSubType = {
	IRA: 'ira';
	_401k: '401k';
};

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
	type: 'depository';
	subType?: DepositorySubType;
};

type CreditAccount = BaseAccount & {
	type: 'credit';
	subType?: CreditSubType;
};

type InvestmentAccount = BaseAccount & {
	type: 'investment';
	subType?: InvestmentSubType;
};

export type Account = DepositoryAccount | CreditAccount | InvestmentAccount;
