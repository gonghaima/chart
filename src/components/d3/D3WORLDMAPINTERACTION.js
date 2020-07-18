import React, { useRef, useEffect } from 'react'

import { select, arc, event, json, tsv, geoPath, geoMercator, geoOrthographic, geoEquirectangular, geoNaturalEarth1, zoom } from 'd3';
import { feature } from "topojson";

const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const D3WORLDMAPINTERACTION = () => {
    const visEl = useRef(null);
    const projection = geoNaturalEarth1();
    const pathGenerator = geoPath().projection(projection);

    useEffect(() => {
        const svg = select(visEl.current)
            .append('svg')
            .attr('class', 'd3-world-map-svg');

        Promise.all([
            tsv('https://cdn.jsdelivr.net/npm/world-atlas@1/world/110m.tsv'),
            json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        ]).then(([tsvData, topoJSONdata]) => {
            console.log(tsvData);
            console.log(topoJSONdata);
            const countryName = tsvData.reduce((accumulator, d) => {
                accumulator[d.iso_n3] = d.name;
                return accumulator;
            }, {});
            const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

            console.log(countries);

            svg.append('path')
                .attr('class', 'sphere')
                .attr('d', pathGenerator({ type: "Sphere" }));

            svg.call(zoom().on("zoom", function () {
                console.log('zoomming!');
                // svg.attr("transform", event.transform)
            }))

            svg.selectAll('path')
                .data(countries.features)
                .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .append('title')
                .text(d => countryName[d.id]);
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



