import React, { useRef, useEffect } from 'react'

import { select, arc, event, json, tsv, geoPath, geoMercator, geoOrthographic, geoEquirectangular } from 'd3';
import { feature } from "topojson";

const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const D3CANVAS = () => {
    const visEl = useRef(null);

    useEffect(() => {
        const svg = select(visEl.current)
            .append('svg');

        const width = document.body.clientWidth;
        const height = document.body.clientHeight;


        svg.attr('width', width);
        svg.attr('height', height);

        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('rx', 40);


    });
    return (
        <div style={basicSvgStyle} ref={visEl}>
        </div>
    )
}



