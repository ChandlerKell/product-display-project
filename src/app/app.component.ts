import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../types';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,    ProductComponent,  CommonModule, MatIconModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor (
  ) {}
  products: Product[] = [];
  allProducts: Product[] = [];
  selectedOption: string = 'All';
  ascending: boolean = false;
  pageNumber: number = 1;
  pageLength: number = 6;

  toggleAscending() {
    this.ascending = !this.ascending; 
    this.allProducts = this.allProducts.reverse();
    this.loadProducts();
  }
  onOptionChange() {
    if (this.selectedOption == "All"){
      this.loadProducts();
    }
    else {
      this.products = this.allProducts.filter((item) => item.category == this.selectedOption);
    }
  }
  shouldDisplayPagination() {
    if(this.allProducts.length > this.pageLength){ return true; }
    else {return false;}
  }
  pageLeft() {
    this.pageNumber--;
    this.loadProducts();
  }
  pageRight() {
    this.pageNumber++;
    this.loadProducts();
  }
  isFirstPage() {
    return this.pageNumber == 1;
  }
  isLastPage() {
    return this.pageNumber >= (this.allProducts.length  / this.pageLength)
  }
  loadProducts() {
    this.products = this.allProducts.slice((this.pageNumber - 1) * this.pageLength,(this.pageNumber - 1) * this.pageLength + this.pageLength )
  }
  numberOfPages() {
    if((this.allProducts.length  / this.pageLength) % 1 == 0 )
      return this.allProducts.length  / this.pageLength;
    return this.allProducts.length  / this.pageLength +1;
  }
  ngOnInit() {
    // if there was an API endpoint you would put this 
    // this.productsService.getProducts('http://localhost:4200/products')
    // .subscribe((products: Products) => {
    //   this.allProducts = products.items;
    // })
    let inputData = [
      {"id": 1, "name": "Product 1", "category": "Category A", "price": 10.99, "image": "../assets/images/product-1.png"},
      {"id": 2, "name": "Product 2", "category": "Category B", "price": 19.99, "image": "../assets/images/product-2.png"},
      {"id": 3, "name": "Product 3", "category": "Category A", "price": 14.99, "image": "../assets/images/product-3.png"}, 
    ].sort((a, b) => a.price - b.price)
    this.allProducts = inputData;
    this.loadProducts();
}
}
