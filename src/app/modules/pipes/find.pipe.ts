import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {
  transform(array: any[] | undefined, id: string): any {
    if (!array) return null;
    return array.find(item => item.id === id);
  }
}