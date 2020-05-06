import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, scaleLinear, max, scaleBand } from 'd3'
import data from './data/d3/worldPopulation.csv'

// import *  as dd from './data/d3/worldPopulation.csv'



export const D3BAR = () => {
    const visEl = useRef(null);
    const width = '960';
    const height = '400';

    useEffect(() => {
        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);

        csv(data).then(data => {
            data.forEach(d => d.population = +d.population * 1000);


            const xValue = xs => d => xs(d.population);
            const yValue = ys => d => ys(d.country);
            const margin = { top: 20, right: 40, bottom: 20, left: 20 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = scaleLinear()
                .domain([0, max(data, d => d.population)])
                .range([0, innerWidth]);

            const yScale = scaleBand()
                .domain(data.map(d => d.country))
                .range([0, innerHeight]);
            // console.log(`yscale: ${yScale.domain()}`);

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.right})`);

            g.selectAll().data(data).enter().append('rect')
                .attr('y', yValue(yScale))
                .attr('width', xValue(xScale))
                .attr('height', yScale.bandwidth())
        }).catch(err => {
        })
    });
    return (
        <div>
            hello
            <div ref={visEl}></div>
        </div>
    );
}