import {Injectable} from '@angular/core';
import {RectangleCoordinates} from '../models/RectangleCoordinates';
import {IGitRepositoryContributor} from '../models/IGitRepositoryContributor';
import {IRectangleCoordinates} from '../models/IRectangleCoordinates';
import {colors} from '../shared/colors';

@Injectable({
  providedIn: 'root'
})

export class FractalService {
  fractalCoordinates: Array<IRectangleCoordinates> = [];
  contributorsColorsMap: { [key: string]: string } = {};
  colorIndex = -1;

  constructFractalCoordinates(figWidth: number, noOfLines: number, contributors: Array<IGitRepositoryContributor>): Array<IRectangleCoordinates> {
    this.fractalCoordinates = [];
    const metric = this.getMetric(figWidth, noOfLines);
    contributors.forEach((contributor: IGitRepositoryContributor, index: number) => {
      if (index === 0) {
        this.fractalCoordinates.push(new RectangleCoordinates(
          0,
          0,
          contributor.lines * metric,
          figWidth,
          this.getContributorColorByName(contributor.name),
          contributor.name
        ));
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
        coordinates.name = contributor.name;
        coordinates.color = this.getContributorColorByName(contributor.name);
        this.fractalCoordinates.push(coordinates);
      }
    });
    return this.fractalCoordinates;
  }

  // the width is the value represented in pixels, transformMetrics makes the ratio between lines and pixels
  getMetric(figWidth: number, noOfLines: number): number {
    return figWidth / noOfLines;
  }

  getContributorColorByName(name: string): string {
    if (!this.contributorsColorsMap[name]) {
      this.colorIndex += 1;
      this.contributorsColorsMap = {
        ...this.contributorsColorsMap, [name]: colors[this.colorIndex]
      };
    }
    return this.contributorsColorsMap[name];
  }
}

