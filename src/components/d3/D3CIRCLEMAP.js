import React, { useRef, useEffect } from 'react';
import { loadAndProcessData } from './loadAndProcessCircleMapData';
import { sizeLegend } from './lib/sizeLegend';
import { select, event, geoPath, geoNaturalEarth1, geoCentroid, zoom, format, scaleSqrt, max } from 'd3';


const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const D3CIRCLEMAP = () => {
    const visEl = useRef(null);
    let choroplethMapG;
    let colorLegendG;


    useEffect(() => {
        const svg = select(visEl.current)
            .append('svg')
            .attr('class', 'd3-circle-map');

        const projection = geoNaturalEarth1();
        const pathGenerator = geoPath().projection(projection);
        const radiusValue = d => d.properties['2018'];


        const g = svg.append('g');

        const colorLegendG = svg.append('g').attr('transform', `translate(10,260)`);

        g.append('path')
            .attr('class', 'spherelight')
            .attr('d', pathGenerator({ type: 'Sphere' }));

        svg.call(
            zoom().on('zoom', () => {
                g.attr('transform', event.transform);
            })
        );

        const populationFormat = format(',');


        loadAndProcessData().then(countries => {
            const sizeScale = scaleSqrt()
                .domain([0, max(countries.features, radiusValue)])
                .range([0, 33]);

            g.selectAll('path')
                .data(countries.features)
                .enter()
                .append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .attr('fill', d => (d.properties['2018'] ? '#e8e8e8' : '#fecccc'))
                .append('title')
                .text(d =>
                    isNaN(radiusValue(d))
                        ? 'Missing data'
                        : [
                            d.properties['Region, subregion, country or area *'],
                            populationFormat(radiusValue(d))
                        ].join(': ')
                );

            countries.featuresWithPopulation.forEach(d => {
                d.properties.projected = projection(geoCentroid(d));
            });

            g.selectAll('circle')
                .data(countries.featuresWithPopulation)
                .enter()
                .append('circle')
                .attr('class', 'country-circle')
                .attr('cx', d => d.properties.projected[0])
                .attr('cy', d => d.properties.projected[1])
                .attr('r', d => sizeScale(radiusValue(d)));

            g.append('g')
                .attr('transform', `translate(45,215)`)
                .call(sizeLegend, {
                    sizeScale,
                    spacing: 45,
                    textOffset: 10,
                    numTicks: 5,
                    tickFormat: populationFormat
                })
                .append('text')
                .attr('class', 'legend-title')
                .text('Population')
                .attr('y', -45)
                .attr('x', -30);
        });




    });
    return (
        <div style={basicSvgStyle} ref={visEl}></div>
    )
}



