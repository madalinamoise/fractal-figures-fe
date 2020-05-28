import {Injectable} from '@angular/core';
import {RectangleCoordinates} from '../models/RectangleCoordinates';
import {IGitRepositoryContributor} from '../models/IGitRepositoryContributor';
import {IRectangleCoordinates} from '../models/IRectangleCoordinates';

@Injectable({
  providedIn: 'root'
})

export class FractalService {
  public fractalCoordinates: Array<IRectangleCoordinates> = [];

  constructor() {
  }

  constructFractalCoordinates(figWidth: number, noOfLines: number, contributors: Array<IGitRepositoryContributor>): Array<IRectangleCoordinates> {
    this.fractalCoordinates = [];
    const metric = this.getMetric(figWidth, noOfLines);
    contributors.forEach((contributor: IGitRepositoryContributor, index: number) => {
      if (index === 0) {
        this.fractalCoordinates.push(new RectangleCoordinates(0, 0, contributor.lines * metric, figWidth, this.getRandomColor()));
      } else {
        const coordinates = new RectangleCoordinates(0, 0, 0, 0);
        if (index % 2 === 1) {
          for (let i = 0; i < index; i = i + 2) {
            coordinates.x += this.fractalCoordinates[i].w;
          }
          coordinates.y = this.fractalCoordinates[index - 1].y;
          coordinates.w = figWidth - coordinates.x;
          coordinates.h = contributor.area / (coordinates.w / metric) * metric;
        } else {
          for (let i = 1; i < index; i = i + 2) {
            coordinates.y += this.fractalCoordinates[i].h;
          }
          coordinates.x = this.fractalCoordinates[index - 1].x;
          coordinates.h = figWidth - coordinates.y;
          coordinates.w = contributor.area / (coordinates.h / metric) * metric;
        }
        coordinates.color = this.getRandomColor();
        this.fractalCoordinates.push(coordinates);
      }
    });
    return this.fractalCoordinates;
  }

  // the width is the value represented in pixels, transformMetrics makes the ratio between lines and pixels
  getMetric(figWidth: number, noOfLines: number): number {
    return figWidth / noOfLines;
  }

  getRandomColor(): string {
    const rgb = [];
    for (let i = 0; i < 3; i++) {
      rgb.push(Math.floor(Math.random() * 255));
    }
    return 'rgb(' + rgb.join(',') + ')';
  }
}
