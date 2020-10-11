import React, { useRef, useEffect } from 'react';
import { loadAndProcessData } from './loadAndProcessData';
import { colorLegendWithBG } from './lib/colorLegendWithBG';

import { select, event, geoPath, geoNaturalEarth1, zoom, scaleOrdinal, schemeSpectral } from 'd3';


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

        const colorScale = scaleOrdinal();
        const colorValue = d => d.properties.economy;

        loadAndProcessData(svg, pathGenerator).then(countries => {
            colorScale
                .domain(countries.features.map(colorValue))
                .domain(colorScale.domain().sort().reverse())
                .range(schemeSpectral[colorScale.domain().length]);


            svg.selectAll('path')
                .data(countries.features)
                .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .attr('fill', d => colorScale(colorValue(d)))
                .append('title')
                .text(d => d.properties.name + ": " + colorValue(d));

            const colorLegendG = svg.append('g')
                .attr('transform', `translate(10,260)`);

            colorLegendG.call(colorLegendWithBG, { colorScale, cirlcleRadius: 12, spacing: 25, textOffset: 25, backgroundRectWidth: 220, textClass: 'nested-element-choro-map' });
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



