import { Product } from '../models/product.model';

export class LoadProducts {
  static readonly type = '[Product] Load Products';
}

export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public payload: Product) {}
}

export class UpdateProduct {
  static readonly type = '[Product] Update Product';
  constructor(public id: number, public payload: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Product] Delete Product';
  constructor(public id: number) {}
}
