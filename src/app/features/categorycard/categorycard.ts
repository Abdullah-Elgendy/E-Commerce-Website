import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DataC,
  emittedCategory,
} from '../../Interfaces/categories/icategories';

@Component({
  selector: 'app-categorycard',
  imports: [],
  templateUrl: './categorycard.html',
  styleUrl: './categorycard.scss',
})
export class Categorycard {
  //recieve the data as an input FROM the parent
  @Input() categoryData!: DataC;

  //send the ID as an output TO the parent when clicking card
  @Output() categoryId = new EventEmitter<emittedCategory>();
  sendId() {
    this.categoryId.emit({
      id: this.categoryData._id,
      name: this.categoryData.name,
    });
  }
}
