import { Component, inject, OnInit } from '@angular/core';
import { Products } from '../products/products';
import { MainSlider } from '../main-slider/main-slider';
import { CategorySlider } from '../category-slider/category-slider';

@Component({
  selector: 'app-home',
  imports: [Products, CategorySlider, MainSlider],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
}
