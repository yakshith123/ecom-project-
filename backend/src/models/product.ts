export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string; // legacy, for compatibility
  images: string[]; // NEW
  stock: number;
}