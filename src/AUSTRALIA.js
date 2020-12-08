import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { mapDataAU } from './data/DataMapAU'
import './App.css';


export const AUSTRALIA = () => {
    const getOption = () => {
        return {
            baseOption: {
                series: [{
                    type: 'map',
                    map: 'au'
                }]
            }
        };
    };
    echarts.registerMap('au', mapDataAU);

    return (
        <ReactEcharts
            option={getOption()}
            style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
            opts={{ renderer: "svg" }}
        />
    );
}
