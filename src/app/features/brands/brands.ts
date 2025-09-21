import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { BrandsService } from '../../core/service/Brands/brands-service';
import { Data, IBrands } from '../../Interfaces/brands/ibrands';
import { Brandcard } from '../brandcard/brandcard';

@Component({
  selector: 'app-brands',
  imports: [Brandcard],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands implements OnInit {
  private s_brands = inject(BrandsService);
  brandsList: WritableSignal<Data[]> = signal([]);

  getBrands() {
    this.s_brands.getAllBrands().subscribe({
      next: (res: IBrands) => {
        this.brandsList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getBrands();
  }
}
