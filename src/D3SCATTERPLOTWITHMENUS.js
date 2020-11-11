import React, { useRef, useEffect } from 'react';

import * as d3 from 'd3';
import { csv, extent, scaleLinear, max, axisLeft, axisBottom, select } from 'd3';
import dataFile from './data/d3/auto-mpg.csv';
import { dropdownMenu } from './components/d3/lib/dropdownMenu';
import scatterPlot from './components/d3/lib/scatterPlot';

export const D3SCATTERPLOTWITHMENUS = () => {
    const mn = useRef(null);


    const visEl = useRef(null);
    const width = '850';
    const height = '450';
    let data;
    let svg;
    let xColumn;

    const render = () => {
        data.forEach(d => {
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horsepower = +d.horsepower;
            d.weight = +d.weight;
            d.acceleration = +d.acceleration;
            d.year = +d.year;
        });

        select(mn.current).call(dropdownMenu, {
            options: data.columns,
            onOptionClicked: onXcolumnClicked
        });

        svg.call(scatterPlot, {
            title: 'Cars: Horsepower vs. Weight',
            xColumn,
            width,
            height,
            scaleLinear,
            extent,
            data,
            svg,
            axisBottom,
            axisLeft
        });
    };

    const onXcolumnClicked = column => {
        xColumn = column;
        render();
    };

    useEffect(() => {
        svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);

        csv(dataFile).then(loadedData => {
            data = loadedData;
            console.log(data.columns);
            render();
        }).catch(err => {
        })
    });
    return (
        <div>
            <div ref={mn}></div>
            <div ref={visEl}></div>
        </div>
    );
}