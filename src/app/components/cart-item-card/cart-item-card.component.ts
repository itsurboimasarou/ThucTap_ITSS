// src/app/components/cart-item-card/cart-item-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-cart-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.scss'],
})
export class CartItemCardComponent {
  @Input() item!: Product;

  constructor(private storeService: StoreService) {}

  removeItem() {
    this.storeService.removeFromCart(this.item);
  }
}
