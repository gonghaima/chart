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

        const root = hierarchy(data);
        const margin = { top: 0, right: 50, bottom: 0, left: 75 };

        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const treeLayout = tree().size([innerHeight, innerWidth]);

        const links = treeLayout(root).links();
        const linkPathGenerator = linkHorizontal().x(d => d.y).y(d => d.x);

        g.selectAll('path').data(links).enter().append('path').attr('d', linkPathGenerator);
        g.selectAll('text').data(root.descendants()).enter().append('text')
            .attr('x', d => d.y)
            .attr('y', d => d.x)
            .attr('dy', '0.32em')
            .attr('text-anchor', d => d.children ? 'middle' : 'start')
            .attr('font-size', d => 3.25 - d.depth + 'em')
            .text(d => d.data.data.id);
    });
    return (
        <div style={basicSvgStyle} ref={visEl}>
        </div>
    )
}



