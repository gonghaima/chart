import React, { useRef, useEffect } from 'react'

import { select, arc, event, json, tsv, geoPath, geoMercator, geoOrthographic, geoEquirectangular, geoNaturalEarth1, zoom } from 'd3';
import { feature } from "topojson";

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
        }))

        Promise.all([
            tsv('https://cdn.jsdelivr.net/npm/world-atlas@1/world/50m.tsv'),
            json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
        ]).then(([tsvData, topoJSONdata]) => {
            console.log(tsvData);
            console.log(topoJSONdata);
            const rowById = tsvData.reduce((accumulator, d) => {
                accumulator[d.iso_n3] = d;
                return accumulator;
            }, {});
            const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

            console.log(countries);

            const g = svg.append('g');
            g.append('path')
                .attr('class', 'sphere')
                .attr('d', pathGenerator({ type: "Sphere" }));



            countries.features.forEach(d => {
                Object.assign(d.properties, rowById[d.id]);
            });
            svg.selectAll('path')
                .data(countries.features)
                .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .attr('fill', 'red')
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



