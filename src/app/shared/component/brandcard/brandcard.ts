import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Data } from '../../../Interfaces/brands/ibrands';
import { BrandsService } from '../../../core/service/Brands/brands-service';
import { FlowbiteService } from '../../../core/service/Flowbite/flowbite-service';
import { Modal } from 'flowbite';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-brandcard',
  imports: [RouterLink],
  templateUrl: './brandcard.html',
  styleUrl: './brandcard.scss',
})
export class Brandcard implements AfterViewInit {
  @Input() brandData!: Data;
  @ViewChild('brandModal') brandModal!: ElementRef;
  modal!: Modal;
  private s_brands = inject(BrandsService);
  private router = inject(Router);
  specificBrand: WritableSignal<Data> = signal({} as Data);

  getBrand(id: string) {
    this.s_brands.getSpecificBrand(id).subscribe({
      next: (res: Data) => {
        this.specificBrand.set(res);
        this.modal.show();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeModal() {
    this.modal.hide();
  }

  browseProducts() {
    this.closeModal();
    this.router.navigate(['/products']);
  }

  ngAfterViewInit(): void {
    this.modal = new Modal(this.brandModal.nativeElement);
  }
}
