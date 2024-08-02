import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop-la-mot-cai-gi-day';

  products = [
    {
      id: 1,
      name: 'AMD Ryzen 7 7800X3D',
      price: 10990000,
      inStock: 10,
      image: '../assets/images/product1.jpg',
    },
    {
      id: 2,
      name: 'MSI MAG X670E TOMAHAWK WIFI',
      price: 9250000,
      inStock: 5,
      image: '../assets/images/product2.jpg',
    },
    {
      id: 3,
      name: 'MSI GeForce RTX 4080 SUPER 16G GAMING X SLIM',
      price: 31500000,
      inStock: 3,
      image: '../assets/images/product3.jpg',
    },
    {
      id: 4,
      name: 'Kingston KC3000 2TB M.2 NVMe PCIe 4.0 SSD',
      price: 4250000,
      inStock: 7,
      image: '../assets/images/product4.jpg',
    },
    {
      id: 5,
      name: 'G.Skill Trident Z5 Neo 48GB (2 x 24GB) DDR5 6000MHz CL30',
      price: 4790000,
      inStock: 4,
      image: '../assets/images/product5.jpg',
    },
    {
      id: 6,
      name: 'MSI MAG A850GL PCIe 5.0 850W 80 Plus Gold - Full Modular ',
      price: 2990000,
      inStock: 9,
      image: '../assets/images/product6.jpg',
    },
    {
      id: 7,
      name: 'DeepCool LT360 ARGB 360mm AIO Cooler',
      price: 3290000,
      inStock: 2,
      image: '../assets/images/product7.jpg',
    },
    {
      id: 8,
      name: 'Cougar MX600 ARGB Black',
      price: 2890000,
      inStock: 8,
      image: '../assets/images/product8.jpg',
    },
  ];

  cart: any[] = [];

  addToCart(index: number) {
    let findIndex = this.cart.findIndex((element) => {
      return element.id == this.products[index].id;
    });
    if (findIndex != -1) {
      this.cart[findIndex].quantity += 1;
      if (this.products[index].inStock > 0) {
        this.products[index].inStock--;
      }
    } else {
      this.cart.push({
        id: this.products[index].id,
        name: this.products[index].name,
        price: this.products[index].price,
        quantity: 1,
        image: this.products[index].image,
      });
      this.products[index].inStock--;
    }
  }

  removeFromCart(index: number) {
    const productInCart = this.cart[index];
    const product = this.products.find(p => p.id === productInCart.id);

    if (product) {
      product.inStock += productInCart.quantity;
    }

    this.cart.splice(index, 1);
  }

  calculateTotal() {
    return this.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  }
}
