import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
// import { mapDataUSA } from './data/DataMapUSA'
import { usaData } from "./data/USA_geo";
import './App.css';

// echarts.registerMap('usa', mapDataUSA);

const mapModifier = {
    Alaska: {              // 把阿拉斯加移到美国主大陆左下方
        left: -131,
        top: 25,
        width: 15
    },
    Hawaii: {
        left: -110,        // 夏威夷
        top: 28,
        width: 5
    },
    'Puerto Rico': {       // 波多黎各
        left: -76,
        top: 26,
        width: 2
    }
};

export const USA = () => {
    const getOption = () => {
        return {
            baseOption: {
                series: [{
                    type: 'map',
                    map: 'usa'
                }]
            }
        };
    };

    const usaJson = usaData;


    echarts.registerMap('usa', usaJson, mapModifier);

    return (
        <ReactEcharts
            option={getOption()}
            style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
            opts={{ renderer: "svg" }}
        />
    );
}
