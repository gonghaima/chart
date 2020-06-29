import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { arc, json, geoPath, geoMercator } from 'd3';
import { feature } from "topojson";

const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const D3WORLDMAP = () => {
    const visEl = useRef(null);
    // json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')

    useEffect(() => {
        // const width = '100%';
        // const height = '100vh';
        json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(data => {
            console.log(`logging data...`);
            const countries = feature(data, data.objects.countries);

            console.log(countries);

        })

        const width = '400';
        const height = '400';

        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);
        svg.attr('viewBox', "0 0 400 400");

        const group = svg.append('g');
        group.attr("transform", "translate(200, 200)");


    });
    return (
        <div style={basicSvgStyle} ref={visEl}></div>
    )
}



