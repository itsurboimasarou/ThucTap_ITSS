import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/navbar/components/search-bar/search-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { Product } from './components/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { StoreService } from './services/store.service';
import { CartItemCardComponent } from './components/cart-item-card/cart-item-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SearchBarComponent,
    SidebarComponent,
    ProductCardComponent,
    CurrencyPipe,
    CartItemCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'duocday';

  constructor(public storeService: StoreService) {
    console.log(this.storeService.products);
  }
}
