import React, { useRef, useEffect } from 'react';
import { loadAndProcessData } from './loadAndProcessData-v1';
import { colorLegendWithInteractive } from './lib/colorLegendWithInteractive';
import { choroplethMap } from './lib/choroplethMap';
import { select, event, geoPath, geoNaturalEarth1, zoom, scaleOrdinal, schemeSpectral } from 'd3';


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
            .attr('class', 'd3-world-map-svg');

        choroplethMapG = svg.append('g');

        colorLegendG = svg.append('g')
            .attr('transform', `translate(10,260)`);

        const colorScale = scaleOrdinal();

        const colorValue = d => d.properties.economy;

        let selectedColorValue;
        let features;

        const onClick = d => {
            selectedColorValue = d;
            render();
        }

        !selectedColorValue && loadAndProcessData().then(countries => {
            features = countries.features;

            render();
        });

        const render = () => {
            ;
            colorScale
                .domain(features.map(colorValue))
                .domain(colorScale.domain().sort().reverse())
                .range(schemeSpectral[colorScale.domain().length]);


            ;
            colorLegendG.call(colorLegendWithInteractive,
                {
                    onClick,
                    colorScale,
                    cirlcleRadius: 12,
                    spacing: 25,
                    textOffset: 25,
                    backgroundRectWidth: 220,
                    textClass: 'nested-element-choro-map',
                    selectedColorValue
                }
            );

            choroplethMapG.call(choroplethMap, { features, colorScale, colorValue, selectedColorValue });

        };

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



