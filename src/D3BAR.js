import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv } from 'd3'
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
            console.log(data);
            svg.selectAll().data(data).enter().append('rect')
                .attr('width', 300)
                .attr('height', 300)
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
