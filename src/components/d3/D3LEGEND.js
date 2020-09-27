import React, { useRef, useEffect } from 'react';
import { colorLegend } from './lib/colorLegend';

import * as d3 from 'd3'
import { range, scaleOrdinal } from 'd3';

const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const D3LEGEND = () => {
    const visEl = useRef(null);

    useEffect(() => {
        // const width = '100%';
        // const height = '100vh';

        const width = '600';
        const height = '400';



        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);
        svg.attr('viewBox', "0 0 400 400");

        const colorScale = scaleOrdinal().domain(['apple', 'lemon']).range(['#c11d1d', '#eae600']);

        svg.append('g')
            .attr('transform', `translate(40,${height / 2})`)
            .call(colorLegend, { colorScale, cirlcleRadius: 30, spacing: 90, textOffset: 70 });

    });
    return (
        <div>
            <h1>Color and Size Legends</h1>
            <div style={basicSvgStyle} ref={visEl}></div>
        </div>


    )
}
