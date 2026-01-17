import { api } from '../api';
import { parseTransaction } from '../utils';
import type {
	Account,
	Category,
	Item,
	Transaction,
	TransactionResponse,
	TransactionUpdateRequest,
} from './types';

// -------- transactions --------

// GET /budget/transactions
export const getTransactions = async (): Promise<Transaction[]> => {
	const res = await api.get('/budget/transactions');
	return res.data
		? (res.data as TransactionResponse[]).map(parseTransaction)
		: [];
};

// GET /budget/transactions/:id
export const getTransaction = async (id: string): Promise<Transaction> => {
	const res = await api.get(`/budget/transactions/${id}`);
	return parseTransaction(res.data as TransactionResponse);
};

// PATCH /budget/transactions/:id
export const updateTransaction = async (
	id: string,
	data: Partial<TransactionUpdateRequest>,
): Promise<Transaction> => {
	const res = await api.patch(`/budget/transactions/${id}`, data);
	return res.data as Transaction;
};

// DELETE /budget/transactions/:id
export const deleteTransaction = async (id: string): Promise<void> => {
	await api.delete(`/budget/transactions/${id}`);
};

// -------- categories --------

// GET /budget/categories
export const getCategories = async (): Promise<Category[]> => {
	const res = await api.get('/budget/categories');
	return res.data as Category[];
};

// -------- items --------

// GET /budget/items
export const getItems = async (): Promise<Item[]> => {
	const res = await api.get('/budget/items');
	return res.data as Item[];
};

// -------- accounts --------

// GET /budget/accounts
export const getAccounts = async (): Promise<Account[]> => {
	const res = await api.get('/budget/accounts');
	return res.data as Account[];
};
