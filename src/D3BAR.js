import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import { arc, csv } from 'd3'
import data from './data/d3/worldPopulation.csv'

// import *  as dd from './data/d3/worldPopulation.csv'



export const D3BAR = () => {
    useEffect(() => {
        csv(data).then(data => {
            data.forEach(d => d.population = +d.population * 1000);
            console.log(data);
        }).catch(err => {
        })
    });
    return (
        <div>
            hello
        </div>
    );
}
