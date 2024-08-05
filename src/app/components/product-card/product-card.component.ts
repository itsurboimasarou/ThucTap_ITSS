import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(public storeService: StoreService) {}
}
