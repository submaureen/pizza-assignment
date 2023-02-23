import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acronym'
})
export class AcronymPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'S':
        return 'Small';
      case 'M':
        return 'Medium';
      case 'L':
        return 'Large';
      default:
        break;
    }
    return '';
  }

}
