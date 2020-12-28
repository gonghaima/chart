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
    let selectedYear = 2018;
    let data;
    let svg;
    let colorLegendG;

    const setYr = year => {
        selectedYear = year;
        lineChart(width, height, data, svg, selectedYear, setYr, colorLegendG);
    }

    const render = (data, svg) => {
        // lineChart()
        lineChart(width, height, data, svg, selectedYear, setYr, colorLegendG);
    };
    useEffect(() => {
        svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', containerWidth);
        svg.attr('height', height);
        colorLegendG = colorLegendG ?? svg.append('g');


        // https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv
        loadAndProcessData()
            .then(dataResult => {
                data = dataResult;
                render(data, svg);
            })
            .catch(err => {
            })
    });
    return (
        <div>
            <div ref={visEl}></div>
        </div>
    );
}