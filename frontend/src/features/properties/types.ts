export type PropertyType = {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  thubnail: string;
  location: string;
  price: number;
  features?: string[];
};
