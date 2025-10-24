export interface Order {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
}