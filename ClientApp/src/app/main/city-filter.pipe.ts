import { Pipe, PipeTransform } from '@angular/core';
import { City } from 'app/city/city';

@Pipe({
  name: 'cityFilter'
})
export class CityFilterPipe implements PipeTransform {

  transform(value: City[], filterText?: string): City[] {
    filterText
    filterText = filterText?filterText.toLocaleLowerCase() : "";

    return filterText?value.filter(
          (p: City) => p.cityName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }

}
