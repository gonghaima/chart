import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { arc } from 'd3';

const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const Basic = () => {
    const visEl = useRef(null);

    useEffect(() => {
        // const width = '100%';
        // const height = '100vh';

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


        const circleWidth = 0;
        const circleHeight = 0;

        const circle = group.append('circle').attr('r', 200)
            .attr('cx', circleWidth)
            .attr('cy', circleHeight)
            .attr('fill', "yellow")
            .attr('stroke', "black");


        const eyeSpacing = 100;
        const eyeYOffset = 70;

        const leftEye = group.append('circle')
            .attr('r', 30)
            .attr('cx', circleWidth - eyeSpacing)
            .attr('cy', circleHeight - eyeYOffset)
            .attr('fill', "yellow")
            .attr('fill', "black");

        const rightEye = group.append('circle')
            .attr('r', 30)
            .attr('cx', circleWidth + eyeSpacing)
            .attr('cy', circleHeight - eyeYOffset)
            .attr('fill', "yellow")
            .attr('fill', "black");


        const g = group.append('g')
            .attr('transform', `translate(${width},translate(${height})`);
        const mouth = g.append('path')
            .attr('d', arc()({
                innerRadius: 80,
                outerRadius: 100,
                startAngle: Math.PI / 2,
                endAngle: Math.PI * 3 / 2
            }));
    });
    return (

        <div style={basicSvgStyle} ref={visEl}></div>

    )
}

export default Basic
