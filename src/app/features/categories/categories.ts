import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/service/Categories/categories-service';
import {
  DataC,
  emittedCategory,
  Icategories,
} from '../../Interfaces/categories/icategories';
import {
  DataSC,
  ISubcategories,
} from '../../Interfaces/subcategories/isubcategories';
import { Categorycard } from '../categorycard/categorycard';
import { SubcategoriesService } from '../../core/service/Subcategories/subcategories-service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [Categorycard],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  private categoriesSerivce = inject(CategoriesService);
  private s_subcategories = inject(SubcategoriesService);
  categoryName!: string;
  categoriesData: WritableSignal<DataC[]> = signal([]);
  subCategoriesData: WritableSignal<DataSC[]> = signal([]);

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

  //we will recieve category emitted from the category card
  //then we will filter the data to get subcategories (sc) that belong to that category
  getSubcategories(category: emittedCategory) {
    this.categoryName = category.name;
    this.s_subcategories
      .getSubCategories()
      .pipe(
        map((res: ISubcategories) =>
          res.data.filter((sc) => sc.category === category.id)
        )
      )
      .subscribe({
        next: (res) => {
          this.subCategoriesData.set(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getData();
  }
}
