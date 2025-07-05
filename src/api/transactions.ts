import axios from '../lib/axios';

export type Transaction = {
  order_id: string;
  product: { title: string; price?: number; country?: { name: string } };
  price: number;
  purchase_time: string;
  user?: { username: string };
  // Add other fields as needed
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await axios.get('/purchase/transactions');
  return res.data;
};

export const fetchTransaction = async (id: string): Promise<Transaction> => {
  const res = await axios.get(`/purchase/transactions/${id}`);
  return res.data;
};
