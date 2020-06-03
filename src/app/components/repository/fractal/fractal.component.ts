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
    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('font-size', '20px')
      .style('color', 'rgba(58, 0, 136, 1)');

    const svg = d3.select(`#svg${this.fractalSVGId}`)
      .append('svg')
      .attr('width', figWidth)
      .attr('height', figWidth);

    svg.selectAll('rect')
      .data(this.fractalCoordinates)
      .enter()
      .append('rect')
      .attr('id', d => `svg${this.fractalSVGId}-rect${this.fractalCoordinates.indexOf(d)}`)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.w)
      .attr('height', d => d.h)
      .style('fill', d => d.color)
      .style('opacity', 0.8)
      .style('cursor', 'pointer')
      .attr('transform', 'translate(0, 0)')
      .on('mouseover', d => {
        tooltip.style('visibility', 'visible').text(`@${d.name}`);
        d3.select(`#svg${this.fractalSVGId}-rect${this.fractalCoordinates.indexOf(d)}`).style('opacity', 0.5);
      })
      .on('mousemove', () => {
        return tooltip.style('top',
          (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
      })
      .on('mouseout', d => {
        tooltip.style('visibility', 'hidden');
        d3.select(`#svg${this.fractalSVGId}-rect${this.fractalCoordinates.indexOf(d)}`).style('opacity', 0.8);
      });
  }
}
