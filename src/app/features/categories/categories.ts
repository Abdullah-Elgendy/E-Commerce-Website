import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/service/Categories/categories-service';
import { CategorySlider } from '../category-slider/category-slider';

@Component({
  selector: 'app-categories',
  imports: [CategorySlider],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  private categoriesSerivce = inject(CategoriesService);
  categoriesData: WritableSignal<any[]> = signal([]);
  isLoading: boolean = false;

  getData() {
    this.categoriesSerivce.getCategories().subscribe({
      next: (res: any) => {
        this.categoriesData.set(res.data);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getData();
  }
}
