// Example type for a Product
export interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  country?: {
    id: number;
    name: string;
    iso: string;
  };
  // Add more fields as needed
}

// Example type for a Receipt
export interface Receipt {
  id: string;
  date: string;
  total: number;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface User {
  id: string;
  username: string;
  // Add other user fields as needed
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
