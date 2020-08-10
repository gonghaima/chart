import React, { useRef, useEffect } from 'react'

import { select, tree, hierarchy, linkHorizontal } from 'd3';
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

        svg.attr('class', 'd3-tree-svg');

        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        svg.attr('width', width);
        svg.attr('height', height);

        console.log(data);
        const root = hierarchy(data);
        const treeLayout = tree().size([height, width]);
        const links = treeLayout(root).links();
        const linkPathGenerator = linkHorizontal().x(d => d.y).y(d => d.x);

        svg.selectAll('path').data(links).enter().append('path').attr('d', linkPathGenerator);
    });
    return (
        <div style={basicSvgStyle} ref={visEl}>
        </div>
    )
}



