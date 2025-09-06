import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../products/products';
import { Categories } from '../categories/categories';
import { MainSlider } from '../main-slider/main-slider';

@Component({
  selector: 'app-home',
  imports: [Products, Categories, MainSlider],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
}
