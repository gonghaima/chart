import React, { useRef, useEffect } from 'react';
import { fruitBowlWithHoverEvent } from './lib/fruitBowlWithHoverEvent';

import * as d3 from 'd3'
import { range } from 'd3';

const basicSvgStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

export const D3HOVER = () => {
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



        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', width);
        svg.attr('height', height);
        svg.attr('viewBox', "0 0 400 400");

        const makeFruit = type => ({ type, id: Math.random() });
        let fruits = range(5).map(() => makeFruit('apple'));
        let selectedFruit = null;

        const setSelectedFruit = id => {
            selectedFruit = id;
            render();
        }


        const render = () => {
            console.log(selectedFruit);
            fruitBowlWithHoverEvent(svg, { fruits, height, setSelectedFruit, selectedFruit });
        }


        render();

        // Eat an apple.
        setTimeout(() => {
            fruits.pop();
            render();
        }, 1000);

        //Replacing an apple with a lemon
        setTimeout(() => {
            fruits[2].type = 'lemon';
            render(svg, { fruits });
        }, 2000);

        // Eat another apple.
        setTimeout(() => {
            fruits = fruits.filter((d, i) => i !== 1);
            render();
        }, 3000);
    });
    return (
        <div>
            <h1>Bowl of Fruit - hover</h1>
            <div style={basicSvgStyle} ref={visEl}></div>
        </div>


    )
}
