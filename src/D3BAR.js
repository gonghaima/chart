import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format } from 'd3'
import dt from './data/d3/worldPopulation.csv'

// import *  as dd from './data/d3/worldPopulation.csv'




const D3BARCOMPONENT = () => {
    const visEl1 = useRef(null);
    const width = '850';
    const height = '450';
    let data;

    useEffect(async () => {
        const svg = d3
            .select(visEl1.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);
        // svg.attr('viewBox', "0 0 20 20");


        data = data ? data : await csv(dt);
        data.forEach(d => d.population = +d.population * 1000);


        const xValue = xs => d => xs(d.population);
        const yValue = ys => d => ys(d.country);
        const margin = { top: 50, right: 40, bottom: 90, left: 200 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = scaleLinear()
            .domain([0, max(data, d => d.population)])
            .range([0, innerWidth]);

        const yScale = scaleBand()
            .domain(data.map(d => d.country))
            .range([0, innerHeight])
            .padding(0.1);
        // console.log(`yscale: ${yScale.domain()}`);
        //const yAxis = axisLeft(yScale);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xAxisTickFormat = number => format('.3s')(number).replace('G', 'B');
        const xAxis = axisBottom(xScale
        ).tickFormat(xAxisTickFormat)
            .tickSize(- innerHeight);
        //yAxis(g.append('g'));  same as below
        g.append('g').call(axisLeft(yScale)).selectAll('.domain, .tick line').remove();
        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);
        xAxisG.select('.domain').remove();
        xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', 60)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text('Population');

        g.selectAll().data(data).enter().append('rect')
            .attr('y', yValue(yScale))
            .attr('width', xValue(xScale))
            .attr('height', yScale.bandwidth())
        g.append('text')
            .attr('class', 'title')
            .attr('y', -10)
            .text('Top 10 Most Populous Countries');
    });
    return (

        <div ref={visEl1}></div>

    );
};

export default () => {
    return (
        <D3BARCOMPONENT />
    )
}