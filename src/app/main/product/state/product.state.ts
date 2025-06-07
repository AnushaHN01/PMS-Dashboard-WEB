import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import {
  AddProduct,
  DeleteProduct,
  LoadProducts,
  UpdateProduct,
} from './product.actions';
import { ProductStateModel } from './product.model';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {}

  @Selector()
  static productList(state: ProductStateModel): Product[] {
    return state.products;
  }

  @Action(LoadProducts)
  loadProducts(ctx: StateContext<ProductStateModel>) {
    return this.productService.getProducts().pipe(
      tap((products) => {
        ctx.patchState({ products });
      })
    );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, action: AddProduct) {
    return this.productService.addProduct(action.payload).pipe(
      tap((newProduct) => {
        const state = ctx.getState();
        ctx.patchState({ products: [...state.products, newProduct] });
      })
    );
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct) {
    return this.productService.updateProduct(action.id, action.payload).pipe(
      tap((updatedProduct) => {
        const state = ctx.getState();
        const updatedList = state.products.map((p) =>
          p.id === action.id ? updatedProduct : p
        );
        ctx.patchState({ products: updatedList });
      })
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, action: DeleteProduct) {
    return this.productService.deleteProduct(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const filtered = state.products.filter((p) => p.id !== action.id);
        ctx.patchState({ products: filtered });
      })
    );
  }
}

// Component
//    ↓
// Dispatch(Action)
//    ↓
// @Action handler (in State class)
//    ↓
// Patch State (with ctx.setState / patchState)
//    ↓
// @Select() or store.select()
//    ↓
// Component auto-updates
