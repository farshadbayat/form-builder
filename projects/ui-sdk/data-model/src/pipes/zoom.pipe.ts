import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'zoom'})
export class ZoomPipe implements PipeTransform {
  transform(value: number): string {
    return (Math.floor(value * 100)   ).toString() + '%';
  }
}