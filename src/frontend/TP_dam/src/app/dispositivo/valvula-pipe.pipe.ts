import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valvulaPipe'
})
export class ValvulaPipePipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1)
    {
      return "Valvula abierta";
    }
    else if (value == 0)
    {
      return "Valvula cerrada";
    } 
    else
    {
      return "Error";
    }
  }

}
