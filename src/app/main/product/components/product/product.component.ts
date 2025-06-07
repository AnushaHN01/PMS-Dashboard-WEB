import {
  Component,
  inject,
  OnInit,
  computed,
  signal,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ApplicationRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { Store } from '@ngxs/store';
import {
  LoadProducts,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} from '../../state/product.actions';
import { ProductState } from '../../state/product.state';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  productForm!: FormGroup;
  editingProductId: number | null = null;

  products$ = this.store.select(ProductState.productList);

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(new LoadProducts());
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addOrUpdateProduct() {
    if (this.productForm.invalid) return;
    const formValue = this.productForm.value;

    if (this.editingProductId !== null) {
      const updatedProduct = { ...formValue, id: this.editingProductId };
      this.store
        .dispatch(new UpdateProduct(this.editingProductId, updatedProduct))
        .subscribe(() => {
          this.editingProductId = null;
          this.productForm.reset();
        });
    } else {
      const newProduct = { ...formValue };
      this.store.dispatch(new AddProduct(newProduct)).subscribe(() => {
        this.productForm.reset();
      });
    }
  }

  trackById(index: number, product: Product) {
    return product.id;
  }

  editProduct(product: Product): void {
    this.editingProductId = product.id ?? null;
    this.productForm.setValue({
      name: product.name,
      price: product.price,
    });
  }

  deleteProduct(id: number): void {
    this.store.dispatch(new DeleteProduct(id));
    if (this.editingProductId === id) {
      this.editingProductId = null;
      this.productForm.reset();
    }
  }
}
