import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroName'
})
export class HeroNamePipe implements PipeTransform {

  transform(value: String): string {
    var stringArray = value.split('-');

    for ( var i = 0; i < stringArray.length; i++ ){
      stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].substring(1);
    }

    return stringArray.join(' ');
  }

}
