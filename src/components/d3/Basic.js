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
        const faceXOffset = 0;
        const faceYOffset = 0;
        const eyeXOffset = 90;
        const eyeYOffset = 50;

        const eyebrowWidth = 70;
        const eyebrowHeight = 15;
        const leftEyebrowYOffset = -105;
        const rightEyebrowYOffset = 15;

        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);
        svg.attr('viewBox', "0 0 400 400");

        const group = svg.append('g');
        group.attr("transform", "translate(200, 200)");

        const circle = group.append('circle').attr('r', 200)
            .attr('cx', faceXOffset)
            .attr('cy', faceYOffset)
            .attr('fill', "yellow")
            .attr('stroke', "black");

        const leftEye = group.append('circle')
            .attr('r', 30)
            .attr('cx', faceXOffset - eyeXOffset)
            .attr('cy', faceYOffset - eyeYOffset)
            .attr('fill', "yellow")
            .attr('fill', "black");

        const rightEye = group.append('circle')
            .attr('r', 30)
            .attr('cx', faceXOffset + eyeXOffset)
            .attr('cy', faceYOffset - eyeYOffset)
            .attr('fill', "yellow")
            .attr('fill', "black");

        const leftEyebrow = group.append('rect')
            .attr('x', -eyeXOffset - eyebrowWidth / 2)
            .attr('y', leftEyebrowYOffset)
            .attr('width', eyebrowWidth)
            .attr('height', eyebrowHeight);

        const rightEyebrow = group
            .append('rect')
            .attr('x', eyeXOffset - eyebrowWidth / 2)
            .attr('y', leftEyebrowYOffset)
            .attr('width', eyebrowWidth)
            .attr('height', eyebrowHeight)
            .transition().duration(2000).attr('y', leftEyebrowYOffset - 30)
            .transition().duration(2000).attr('y', leftEyebrowYOffset);


        const g = group.append('g')
            .attr('transform', `translate(${width},translate(${height})`);
        const mouth = g.append('path')
            .attr('d', arc()({
                innerRadius: 130,
                outerRadius: 150,
                startAngle: Math.PI / 2,
                endAngle: Math.PI * 3 / 2
            }));
    });
    return (

        <div style={basicSvgStyle} ref={visEl}></div>

    )
}

export default Basic
