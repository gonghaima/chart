import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, extent, scaleLinear, max, axisLeft, axisBottom, format } from 'd3'
import dataFile from './data/d3/auto-mpg.csv'



export const D3SCATTERPLOTCAR = () => {
    const visEl = useRef(null);
    const width = '850';
    const height = '450';

    useEffect(() => {
        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);


        csv(dataFile).then(data => {
            data.forEach(d => {
                d.mpg = +d.mpg;
                d.cylinders = +d.cylinders;
                d.displacement = +d.displacement;
                d.horsepower = +d.horsepower;
                d.weight = +d.weight;
                d.acceleration = +d.acceleration;
                d.year = +d.year;
            });

            const title = "Cars: Horsepower vs. Weight";
            const xValue = xs => d => xs(d.horsepower);
            const yValue = ys => d => ys(d.weight);
            const circleRadius = 10;
            const xAxisLabel = "Horsepower";
            const yAxisLabel = "Weight";
            const margin = { top: 60, right: 40, bottom: 90, left: 200 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = scaleLinear()
                .domain(extent(data, d => d.horsepower))
                .range([0, innerWidth]).nice();

            const yScale = scaleLinear()
                .domain(extent(data, d => d.weight))
                .range([0, innerHeight]).nice();

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const xAxis = axisBottom(xScale)
                .tickSize(-innerHeight)
                .tickPadding(15);

            const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

            g.append('g').call(yAxis).selectAll('.domain').remove();

            const yAxisG = g.append('g').call(yAxis);
            yAxisG.select('.domain').remove();

            yAxisG.append('text')
                .attr('class', 'axis-label')
                .attr('y', -80)
                .attr('x', -innerHeight / 2)
                .attr('fill', 'black')
                .attr('transform', `rotate(-90)`)
                .attr('text-anchor', 'middle')
                .text(yAxisLabel);

            const xAxisG = g.append('g').call(xAxis)
                .attr('transform', `translate(0,${innerHeight})`);
            xAxisG.select('.domain').remove();
            xAxisG.append('text')
                .attr('class', 'axis-label')
                .attr('y', 60)
                .attr('x', innerWidth / 2)
                .attr('fill', 'black')
                .text(xAxisLabel);

            g.selectAll().data(data).enter().append('circle')
                .attr('fill', 'red')
                .attr('opacity', 0.5)
                .attr('cy', yValue(yScale))
                .attr('cx', xValue(xScale))
                .attr('r', circleRadius)
            g.append('text')
                .attr('class', 'title')
                .attr('y', -10)
                .text(title);
        }).catch(err => {
        })
    });
    return (
        <div>
            <div ref={visEl}></div>
        </div>
    );
}