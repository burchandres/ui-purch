type Time = string;

export type Transaction = {
	id: string;
	accountId: string;
	categoryLabel?: string;
	authorizedDate: Time;
	settledDate?: Time;
	merchant?: string;
	amount: number;
	currencyCode?: string;
	pending: boolean;
};

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

type DepositoryAccount = {
	id: string;
	itemId: string;
	name: string;
	availableBalance?: number;
	currentBalance?: number;
	type: 'depository';
	subType?: DepositorySubType;
};

type CreditAccount = {
	id: string;
	itemId: string;
	name: string;
	availableBalance?: number;
	currentBalance?: number;
	type: 'credit';
	subType?: CreditSubType;
};

type InvestmentAccount = {
	id: string;
	itemId: string;
	name: string;
	availableBalance?: number;
	currentBalance?: number;
	type: 'investment';
	subType?: InvestmentSubType;
};

export type Account = DepositoryAccount | CreditAccount | InvestmentAccount;
