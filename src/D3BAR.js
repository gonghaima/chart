import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, scaleLinear, max, scaleBand } from 'd3'
import data from './data/d3/worldPopulation.csv'

// import *  as dd from './data/d3/worldPopulation.csv'



export const D3BAR = () => {
    const visEl = useRef(null);
    const width = '400';
    const height = '400';

    useEffect(() => {

        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);

        csv(data).then(data => {
            data.forEach(d => d.population = +d.population * 1000);
            // console.log(data);
            const xScale = scaleLinear()
                .domain([0, max(data, d => d.population)])
                .range([0, 960]);

            const yScale = scaleBand()
                .domain(data.map(d => d.country))
                .range([0, height]);
            // console.log(`yscale: ${yScale.domain()}`);

            svg.selectAll().data(data).enter().append('rect')
                .attr('y', d => yScale(d.country))
                .attr('width', d => xScale(d.population))
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
