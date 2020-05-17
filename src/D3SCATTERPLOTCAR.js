import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, extent, scaleLinear, max, axisLeft, axisBottom, format } from 'd3'
import data from './data/d3/worldPopulation.csv'

// import *  as dd from './data/d3/worldPopulation.csv'



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
        // svg.attr('viewBox', "0 0 20 20");


        csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then(data => {
            data.forEach(d => {
                d.mpg = +d.mpg;
                d.cylinders = +d.cylinders;
                d.displacement = +d.displacement;
                d.horsepower = +d.horsepower;
                d.weight = +d.weight;
                d.acceleration = +d.acceleration;
                d.year = +d.year;
            });


            const xValue = xs => d => xs(d.cylinders);
            const yValue = ys => d => ys(d.horsepower);
            const margin = { top: 50, right: 40, bottom: 90, left: 200 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = scaleLinear()
                .domain(extent(data, d => d.cylinders))
                .range([0, innerWidth]).nice();

            const yScale = scaleLinear()
                .domain(extent(data, d => d.horsepower))
                .range([0, innerHeight]);
            // console.log(`yscale: ${yScale.domain()}`);
            //const yAxis = axisLeft(yScale);

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const xAxisTickFormat = number => format('.3s')(number).replace('G', 'B');
            const xAxis = axisBottom(xScale
            ).tickFormat(xAxisTickFormat)
                .tickSize(-innerHeight);

            const yAxis = axisLeft(yScale).tickSize(-innerWidth);
            //yAxis(g.append('g'));  same as below
            g.append('g').call(yAxis).selectAll('.domain').remove();
            const xAxisG = g.append('g').call(xAxis)
                .attr('transform', `translate(0,${innerHeight})`);
            xAxisG.select('.domain').remove();
            xAxisG.append('text')
                .attr('class', 'axis-label')
                .attr('y', 60)
                .attr('x', innerWidth / 2)
                .attr('fill', 'black')
                .text('Population');

            g.selectAll().data(data).enter().append('circle')
                .attr('cy', yValue(yScale))
                .attr('cx', xValue(xScale))
                .attr('r', 10)
            g.append('text')
                .attr('class', 'title')
                .attr('y', -10)
                .text('Top 10 Most Populous Countries');
        }).catch(err => {
        })
    });
    return (
        <div>
            <div ref={visEl}></div>
        </div>
    );
}