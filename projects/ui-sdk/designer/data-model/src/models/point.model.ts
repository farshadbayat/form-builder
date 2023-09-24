export class Point implements IPoint
{
  x!: number;
  y!: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public distanceFrom(point: IPoint = {x: 0, y: 0}) {
    return Math.sqrt( (this.x-point.x)*(this.x-point.x) + (this.y-point.y)*(this.y-point.y));
  }

}


export interface IPoint{
  x: number;
  y: number;
}
