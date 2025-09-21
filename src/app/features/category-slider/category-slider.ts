import {
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Data, Icategories } from '../../Interfaces/categories/icategories';
import { CategoriesService } from '../../core/service/Categories/categories-service';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.html',
  styleUrl: './category-slider.scss',
})
export class CategorySlider {
  slideData: WritableSignal<Data[]> = signal([]);
  private s_categories = inject(CategoriesService);
  getData() {
    this.s_categories.getCategories().subscribe({
      next: (res: Icategories) => {
        this.slideData.set(res.data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1280: {
        items: 5,
      },
      1536: {
        items: 7,
      },
    },
    nav: true,
  };
}
