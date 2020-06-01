import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { range, scaleOrdinal } from 'd3';

const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const D3GENERALUPDATEPATTERN = () => {
    const visEl = useRef(null);

    useEffect(() => {
        // const width = '100%';
        // const height = '100vh';

        const width = '600';
        const height = '400';
        const faceXOffset = 0;
        const faceYOffset = 0;
        const eyeXOffset = 90;
        const eyeYOffset = 50;

        const eyebrowWidth = 70;
        const eyebrowHeight = 15;
        const leftEyebrowYOffset = -105;
        const rightEyebrowYOffset = 15;

        const colorScale = scaleOrdinal().domain(['apple', 'lemon']).range(['#c11d1d', '#eae600']);

        const radiusScale = scaleOrdinal().domain(['apple', 'lemon']).range([30, 20]);

        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);
        svg.attr('viewBox', "0 0 400 400");

        const render = (selection, { fruits }) => {
            const circles = selection
                .selectAll('circle')
                .data(fruits);
            circles.enter()
                .append('circle')
                // .attr('class', 'd3-pattern')
                .attr('cx', (d, i) => i * 90 + 40)
                .attr('cy', height / 2)
                .attr('fill', d => colorScale(d.type))
                .attr('r', d => radiusScale(d.type))


            circles
                .attr('fill', d => colorScale(d.type))
                .attr('r', d => radiusScale(d.type))

            circles.exit().remove();
        }

        const makeFruit = type => ({ type });
        const fruits = range(5).map(() => makeFruit('apple'));
        render(svg, { fruits });

        // Eat an apple.
        setTimeout(() => {
            fruits.pop();
            render(svg, { fruits });
        }, 1000);

        //Replacing an apple with a lemon
        setTimeout(() => {
            fruits[2].type = 'lemon';
            render(svg, { fruits });
        }, 2000);
    });
    return (
        <div>
            <h1>Bowl of Fruit - General Update Pattern</h1>
            <div style={basicSvgStyle} ref={visEl}></div>
        </div>


    )
}
