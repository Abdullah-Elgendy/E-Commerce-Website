import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  private http = inject(HttpClient);

  getSubCategories(): Observable<any> {
    return this.http.get(`${environment.baseURL}subcategories`);
  }
}
