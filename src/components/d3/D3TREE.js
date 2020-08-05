import React, { useRef, useEffect } from 'react'

import { select, arc, event, json, tsv, geoPath, geoMercator, geoOrthographic, geoEquirectangular } from 'd3';
import { feature } from "topojson";

import data from "../../data/d3/countryHierarchy.json"

const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

//https://bl.ocks.org/curran/1dd7ab046a4ed32380b21e81a38447aa

export const D3TREE = () => {
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

        console.log(data);
    });
    return (
        <div style={basicSvgStyle} ref={visEl}>
        </div>
    )
}



