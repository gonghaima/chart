import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, scaleLinear, max, scalePoint, axisLeft, axisBottom, format } from 'd3'
import data from './data/d3/worldPopulation.csv'

// import *  as dd from './data/d3/worldPopulation.csv'



export const D3SCATTERPLOT = () => {
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


        csv(data).then(data => {
            data.forEach(d => d.population = +d.population * 1000);


            const xValue = xs => d => xs(d.population);
            const yValue = ys => d => ys(d.country);
            const margin = { top: 50, right: 40, bottom: 90, left: 200 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = scaleLinear()
                .domain([0, max(data, d => d.population)])
                .range([0, innerWidth]).nice();

            const yScale = scalePoint()
                .domain(data.map(d => d.country))
                .range([0, innerHeight])
                .padding(0.5);
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