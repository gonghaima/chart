import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, curveBasis, extent, area, scaleLinear, scaleTime, max, format, tickFormat, timeFormat, axisLeft, axisBottom } from 'd3'
import data from './data/d3/worldPopulation.csv'

// import *  as dd from './data/d3/worldPopulation.csv'



export const D3AREAPOPULATION = () => {
    const visEl = useRef(null);
    const width = '850';
    const height = '450';

    useEffect(() => {
        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);
        // svg.attr('viewBox', "0 0 20 20");

        //https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv
        //https://vizhub.com/curran/datasets/world-population-by-year-2015.csv
        // csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv').then(data => {});

        csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv').then(data => {
            data.forEach(d => {
                d.population = +d.population;
                d.year = new Date(d.year);
            });

            const title = "World Population";
            const x = d => d.year;
            const y = d => d.population;
            const xValue = xs => d => xs(d.year);
            const yValue = ys => d => ys(d.population);
            const circleRadius = 6;
            const xAxisLabel = "Time";
            const yAxisLabel = "Population";
            const margin = { top: 60, right: 40, bottom: 90, left: 105 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = scaleTime()
                .domain(extent(data, d => d.year))
                .range([0, innerWidth])
                .nice();

            const yScale = scaleLinear()
                .domain([0, max(data, y)])
                .range([innerHeight, 0]).nice();

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const areaGenerator = area()
                .x(xValue(xScale))
                .y0(innerHeight)
                .y1(yValue(yScale))
                .curve(curveBasis);

            g.append('path')
                .attr('class', 'area-path')
                .attr('d', areaGenerator(data));

            const xAxis = axisBottom(xScale)
                .ticks(6)
                .tickSize(-innerHeight)
                .tickFormat(timeFormat("%Y"))
                .tickPadding(15);

            const yAxisTickFormat = number => format('.1s')(number).replace('G', 'B');
            const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10).tickFormat(yAxisTickFormat);

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



            svg.append('text')
                .attr('class', 'title')
                .attr('x', width / 2)
                .attr('y', 45)
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