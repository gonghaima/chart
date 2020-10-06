import React, { useRef, useEffect } from 'react';
import { loadAndProcessData } from './loadAndProcessData';

import { select, event, geoPath, geoNaturalEarth1, zoom, scaleOrdinal, schemeCategory10 } from 'd3';


const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const D3CHOROMAP = () => {
    const visEl = useRef(null);
    const projection = geoNaturalEarth1();
    const pathGenerator = geoPath().projection(projection);

    useEffect(() => {
        const svg = select(visEl.current)
            .append('svg')
            .attr('class', 'd3-world-map-svg');

        svg.call(zoom().on("zoom", function () {
            svg.attr("transform", event.transform)
        }));

        const colorScale = scaleOrdinal(schemeCategory10);
        const colorValue = d => d.properties.economy;

        loadAndProcessData(svg, pathGenerator).then(countries => {
            colorScale
                .domain(countries.features.map(colorValue))
                .domain(colorScale.domain().sort());
            svg.selectAll('path')
                .data(countries.features)
                .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .attr('fill', d => colorScale(colorValue(d)))
                .append('title')
                .text(d => d.properties.name);
        });


        const width = '800';
        const height = '600';


        svg.attr('width', width);
        svg.attr('height', height);
        svg.attr('viewBox', "0 0 1000 800");

        const group = svg.append('g');
        group.attr("transform", "translate(200, 200)");


    });
    return (
        <div style={basicSvgStyle} ref={visEl}></div>
    )
}



