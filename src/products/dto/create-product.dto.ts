export class CreateProductDto {
  name: string;
  image: string;
  price: number;
  deliveryPrice: number;
  stock: number;
  status?: string;
  adsLinks?: string[];
}
