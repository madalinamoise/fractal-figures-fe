import {IRectangleCoordinates} from './IRectangleCoordinates';

export class RectangleCoordinates implements IRectangleCoordinates {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  name: string;
  metricArea: number;

  constructor(x: number, y: number, w: number, h: number, color?: string, name?: string, metricArea?: number) {
    this.x = x;
    this.h = h;
    this.w = w;
    this.y = y;
    this.color = color;
    this.name = name;
    this.metricArea = metricArea;
  }
}
