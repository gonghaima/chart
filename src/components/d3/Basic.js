import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'

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

        const leftEye = group.append('circle')
            .attr('r', 30)
            .attr('cx', circleWidth - 100)
            .attr('cy', circleHeight - 70)
            .attr('fill', "yellow")
            .attr('fill', "black");

        const rightEye = group.append('circle')
            .attr('r', 30)
            .attr('cx', circleWidth + 100)
            .attr('cy', circleHeight - 70)
            .attr('fill', "yellow")
            .attr('fill', "black")
    });
    return (

        <div style={basicSvgStyle} ref={visEl}></div>

    )
}

export default Basic
