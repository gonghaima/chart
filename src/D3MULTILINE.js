import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { csv, curveBasis, descending, extent, line, scaleLinear, scaleTime, scaleOrdinal, axisLeft, axisBottom, nest, schemeCategory10 } from 'd3'
import { colorLegend } from './components/d3/lib/colorLegendForLines';
import data from './data/d3/worldPopulation.csv'
import { color } from 'echarts/lib/export'
import { ascend } from 'ramda';

// import *  as dd from './data/d3/worldPopulation.csv'

export const D3MULTILINE = () => {
    const visEl = useRef(null);
    const width = '850';
    const containerWidth = '1050';
    const height = '450';

    useEffect(() => {
        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', containerWidth);
        svg.attr('height', height);

        // https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv
        csv('https://raw.githubusercontent.com/gonghaima/data/master/data-canvas-sense-your-city-one-week.csv').then(data => {
            data.forEach(d => {
                d.temperature = +d.temperature;
                d.timestamp = new Date(d.timestamp);
            });

            const title = "A Week of Temperature Around the world";
            const x = d => d.timestamp;
            const y = d => d.temperature;
            const xValue = xs => d => xs(d.timestamp);
            const yValue = ys => d => ys(d.temperature);
            const circleRadius = 6;
            const xAxisLabel = "Time";
            const yAxisLabel = "Temperature";
            const colorValue = d => d.city;
            const margin = { top: 60, right: 40, bottom: 90, left: 105 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = scaleTime()
                .domain(extent(data, d => d.timestamp))
                .range([0, innerWidth]).nice();

            const yScale = scaleLinear()
                .domain(extent(data, d => d.temperature))
                .range([innerHeight, 0]).nice();

            const colorScale = scaleOrdinal(schemeCategory10);


            const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const xAxis = axisBottom(xScale)
                .tickSize(-innerHeight)
                .tickPadding(15);

            const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

            g.append('g').call(yAxis).selectAll('.domain').remove();

            const yAxisG = g.append('g').call(yAxis);
            yAxisG.select('.domain').remove();

            yAxisG.append('text')
                .attr('class', 'axis-label')
                .attr('y', -80)
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
                .attr('y', 60)
                .attr('x', innerWidth / 2)
                .attr('fill', 'black')
                .text(xAxisLabel);

            const lineGenerator = line()
                .x(xValue(xScale))
                .y(yValue(yScale))
                .curve(curveBasis);

            const lastYValue = d => (d.values[d.values.length - 1]).temperature;
            const nested = nest()
                .key(colorValue).entries(data)
                .sort((a, b) => descending(lastYValue(a), lastYValue(b)));

            colorScale.domain(nested.map(d => d.key));

            g.selectAll('.line-path-multi').data(nested).enter()
                .append('path')
                .attr('class', 'line-path-multi')
                .attr('d', d => lineGenerator(d.values))
                .attr('stroke', d => colorScale(d.key));

            g.append('text')
                .attr('class', 'title')
                .attr('x', innerWidth / 2)
                .attr('y', -10)
                .text(title);
            svg.append('g')
                .attr('transform', `translate(880,${height / 2 - 110})`)
                .call(colorLegend, { colorScale, cirlcleRadius: 10, spacing: 30, textOffset: 70 });
        }).catch(err => {
        })
    });
    return (
        <div>
            <div ref={visEl}></div>
        </div>
    );
}