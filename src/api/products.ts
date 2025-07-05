import axios from '../lib/axios';
import { Product } from '../types';

export const fetchProducts = async (
  skip: number,
  limit: number,
  location: string,
): Promise<{ items: Product[]; count: number }> => {
  const normalizedLocation =
    !location || location.toLowerCase() === 'all' || location.toLowerCase() === 'null'
      ? 'all'
      : location;
  const res = await axios.get(
    `/products?skip=${skip}&limit=${limit}&location=${normalizedLocation}`,
  );
  return res.data;
};

export const purchaseProduct = async (productId: string): Promise<any> => {
  const res = await axios.post('/purchase', { productId });
  return res.data;
};
