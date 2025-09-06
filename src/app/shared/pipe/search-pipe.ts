import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(searchList: any[], searchInput: String): any[] {
    return searchList.filter((product) => {
      return product.title.toLowerCase().includes(searchInput.toLowerCase());
    });
  }
}
