import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../shared/type';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: Array<Employee>, searchText: string): Array<Employee> {
    if (!items) {
      return []
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toString().toLowerCase();

    return items.filter(it => {
      return it.name?.toString().toLowerCase().includes(searchText);
    });
  }
}