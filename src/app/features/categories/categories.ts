import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/service/Categories/categories-service';
import { CategorySlider } from '../category-slider/category-slider';
import { Data, Icategories } from '../../Interfaces/categories/icategories';

@Component({
  selector: 'app-categories',
  imports: [CategorySlider],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  private categoriesSerivce = inject(CategoriesService);
  categoriesData: WritableSignal<Data[]> = signal([]);

  getData() {
    this.categoriesSerivce.getCategories().subscribe({
      next: (res: Icategories) => {
        this.categoriesData.set(res.data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
