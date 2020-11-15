import React, { useRef, useEffect } from 'react';

import * as d3 from 'd3';
import { csv, extent, scaleLinear, max, axisLeft, axisBottom, select } from 'd3';
import dataFile from './data/d3/auto-mpg.csv';
import { dropdownMenu } from './components/d3/lib/dropdownMenu';
import scatterPlot from './components/d3/lib/scatterPlot';

export const D3SCATTERPLOTTWOMENUS = () => {
    const xmenu = useRef(null);
    const ymenu = useRef(null);


    const visEl = useRef(null);
    const width = '850';
    const height = '450';
    let data;
    let svg;
    let xColumn;
    let yColumn;

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

        select(xmenu.current).call(dropdownMenu, {
            options: data.columns,
            onOptionClicked: onXcolumnClicked
        });
        select(ymenu.current).call(dropdownMenu, {
            options: data.columns,
            onOptionClicked: onYcolumnClicked
        });

        svg.call(scatterPlot, {
            title: 'Cars: Horsepower vs. Weight',
            xColumn,
            yColumn,
            width,
            height,
            scaleLinear,
            extent,
            data,
            axisBottom,
            axisLeft
        });
    };

    const onXcolumnClicked = column => {
        xColumn = column;
        render();
    };

    const onYcolumnClicked = column => {
        yColumn = column;
        render();
    };

    useEffect(() => {
        svg = svg ? svg : d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);

        csv(dataFile).then(loadedData => {
            data = loadedData;
            console.log(`effect triggered`);
            render();
        }).catch(err => {
        })
    }, [svg]);
    return (
        <div>
            <div className={'menuwrapper'}>
                <div ref={xmenu}></div>
                VS.
                <div ref={ymenu}></div>
            </div>
            <div ref={visEl}></div>
        </div>
    );
}