import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sortBy' })

export class SortByPipe  implements PipeTransform {
  transform(array: any, field: string, quest:string): any[] {
    if (!Array.isArray(array)) {
      return;
    }

    switch(quest){
      case 'asc':
        array.sort((a: any, b: any) => {
          if (a[field] > b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
      break;
      case 'desc':
        array.sort((a: any, b: any) => {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
      break;
    }

  
    return array;
  }
}