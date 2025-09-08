import { Pipe, PipeTransform } from '@angular/core';
import { ProductData } from '../../Interfaces/products/iproducts';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(
    searchList: ProductData[] | undefined,
    searchInput: String
  ): ProductData[] | undefined {
    return searchList?.filter((product) => {
      return product.title.toLowerCase().includes(searchInput.toLowerCase());
    });
  }
}
