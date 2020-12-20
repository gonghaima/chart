import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, curveBasis, descending, extent, format, line, mouse, scaleLinear, scaleTime, scaleOrdinal, axisLeft, axisBottom, nest, schemeCategory10 } from 'd3'
import { colorLegend } from './components/d3/lib/colorLegendMeltingData';
import { lineChart } from './components/d3/lib/lineChart';
import { loadAndProcessData, parseYear } from './components/d3/loadAndProcessData-v2';
import data from './data/d3/worldPopulation.csv'
import { color } from 'echarts/lib/export'
import { ascend } from 'ramda';

// import *  as dd from './data/d3/worldPopulation.csv'


export const D3LINESELECTION = () => {
    const visEl = useRef(null);
    const width = '850';
    const containerWidth = '100%';
    const height = '450';

    const render = (data, svg) => {
        // lineChart()
        lineChart(width, height, data, svg);
    };
    useEffect(() => {
        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', containerWidth);
        svg.attr('height', height);


        // https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv
        loadAndProcessData().then(data => render(data, svg)).catch(err => {
        })
    });
    return (
        <div>
            <div ref={visEl}></div>
        </div>
    );
}