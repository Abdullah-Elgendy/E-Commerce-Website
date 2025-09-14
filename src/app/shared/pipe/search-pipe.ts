import { Pipe, PipeTransform } from '@angular/core';
import { DataList } from '../../Interfaces/products/iproducts';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(searchList: DataList[], searchInput: String): DataList[] {
    return searchList?.filter((product) => {
      return product.title.toLowerCase().includes(searchInput.toLowerCase());
    });
  }
}
