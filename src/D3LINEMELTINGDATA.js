import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, curveBasis, descending, extent, format, line, scaleLinear, scaleTime, scaleOrdinal, axisLeft, axisBottom, nest, schemeCategory10 } from 'd3'
import { colorLegend } from './components/d3/lib/colorLegendMeltingData';
import { loadAndProcessData } from './components/d3/loadAndProcessData-v2';
import data from './data/d3/worldPopulation.csv'
import { color } from 'echarts/lib/export'
import { ascend } from 'ramda';

// import *  as dd from './data/d3/worldPopulation.csv'



export const D3LINEMELTINGDATA = () => {
    const visEl = useRef(null);
    const width = '850';
    const containerWidth = '100%';
    const height = '450';

    const render = (data, svg) => {
        const title = 'Population over Time by Region';

        const xValue = d => d.year;
        const xAxisLabel = 'Time';

        const yValue = d => d.population;
        const circleRadius = 6;
        const yAxisLabel = 'Population';

        const colorValue = d => d.name;

        const margin = { top: 60, right: 280, bottom: 88, left: 105 };
        const innerWidth = width - margin.left - margin.right + 50;
        const innerHeight = height - margin.top - margin.bottom + 50;

        const xScale = scaleTime()
            .domain(extent(data, xValue))
            .range([0, innerWidth]);

        const yScale = scaleLinear()
            .domain(extent(data, yValue))
            .range([innerHeight, 0])
            .nice();

        const colorScale = scaleOrdinal(schemeCategory10);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left + 40},${margin.top})`);

        const xAxis = axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickPadding(15);

        const yAxisTickFormat = number =>
            format('.2s')(number)
                .replace('G', 'B')
                .replace('.0', '');

        const yAxis = axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickFormat(yAxisTickFormat)
            .tickPadding(10);

        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();

        yAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', -60)
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
            .attr('y', 80)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text(xAxisLabel);

        const lineGenerator = line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(curveBasis);

        const lastYValue = d =>
            yValue(d.values[d.values.length - 1]);

        const nested = nest()
            .key(colorValue)
            .entries(data)
            .sort((a, b) =>
                descending(lastYValue(a), lastYValue(b))
            );

        console.log(nested);

        colorScale.domain(nested.map(d => d.key));

        g.selectAll('.line-path').data(nested)
            .enter().append('path')
            .attr('class', 'line-path-melting-data')
            .attr('d', d => lineGenerator(d.values))
            .attr('stroke', d => colorScale(d.key));

        g.append('text')
            .attr('class', 'title')
            .attr('x', 240)
            .attr('y', -10)
            .text(title);

        svg.append('g')
            .attr('transform', `translate(700,110)`)
            .call(colorLegend, {
                colorScale,
                circleRadius: 10,
                spacing: 55,
                textOffset: 15
            });
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