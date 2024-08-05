import { Injectable } from '@angular/core';
import { Product } from '../components/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  cart: any[] = [];
  products: Product[] = [
    {
      id: 1,
      image: '../assets/images/product1.jpg',
      pName: 'AMD Ryzen 7 7800X3D',
      price: 100,
      description: 'description 1',
      quantity: 1,
      inStock: 10,
    },
    {
      id: 2,
      image: '../assets/images/product2.jpg',
      pName: 'MSI MAG X670E TOMAHAWK WIFI',
      price: 200,
      description: 'description 1',
      quantity: 1,
      inStock: 10,
    },
    {
      id: 3,
      image: '../assets/images/product3.jpg',
      pName: 'MSI GeForce RTX 4080 SUPER 16G GAMING X SLIM',
      price: 300,
      description: 'description 1',
      quantity: 1,
      inStock: 10,
    },
    {
      id: 4,
      image: '../assets/images/product4.jpg',
      pName: 'Kingston KC3000',
      price: 400,
      description: 'description 1',
      quantity: 1,
      inStock: 10,
    },
  ];

  addToCart(item: any) {
    console.log(item);
    let index: number = this.cart.findIndex(
      (product: any) => product.id === item.id,
    );
    console.log('index:', index);
    let indexProduct: number = this.products.findIndex(
      (product: any) => product.id === item.id,
    );
    if (this.products[indexProduct].inStock === 0) {
      return;
    }
    if (index != -1) {
      this.cart[index].quantity++;
      this.products[indexProduct].inStock--;
    } else {
      this.cart.push(item);
      this.products[indexProduct].inStock--;
    }
    // console.log('Product added to cart:', item);
    // console.log('Current cart:', this.cart);
  }

  removeFromCart(product: Product) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }
}
