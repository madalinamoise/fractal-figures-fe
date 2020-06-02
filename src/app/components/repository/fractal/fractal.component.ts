import {AfterViewInit, Component, Input} from '@angular/core';
import {GitService} from '../../../services/git.service';
import * as d3 from 'd3';
import {IGitRepositoryContributor} from '../../../models/IGitRepositoryContributor';
import {FractalService} from '../../../services/fractal.service';
import {IRectangleCoordinates} from '../../../models/IRectangleCoordinates';

@Component({
  selector: 'app-fractal',
  templateUrl: './fractal.component.html',
  styleUrls: ['./fractal.component.css']
})
export class FractalComponent implements AfterViewInit {
  private fractalCoordinates: Array<IRectangleCoordinates>;
  private noOfFractals: number;
  @Input('noOfLines') noOfLines: number;
  @Input('contributors') contributors: Array<IGitRepositoryContributor>;
  @Input('figWidth') figWidth: number;
  @Input('fractalSVGId') fractalSVGId: number;

  constructor(private gitService: GitService, private fractalService: FractalService) {
  }

  ngAfterViewInit() {
    this.fractalCoordinates = [];
    this.createRectangle(this.figWidth, this.noOfLines, this.contributors);
  }

  private createRectangle(figWidth: number, noOfLines: number, contributors: Array<IGitRepositoryContributor>) {
    this.fractalCoordinates = [...this.fractalService.constructFractalCoordinates(figWidth, noOfLines, contributors)];
    this.noOfFractals = this.fractalCoordinates.length;

    console.log(this.fractalCoordinates);

    const svg = d3.select(`#svg${this.fractalSVGId}`)
      .append('svg')
      .attr('width', figWidth)
      .attr('height', figWidth);

    svg.selectAll('foo')
      .data(this.fractalCoordinates)
      .enter()
      .append('rect')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.w)
      .attr('height', d => d.h)
      .style('fill', d => d.color)
      .style('opacity', 0.5);
  }

}
