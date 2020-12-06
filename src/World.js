import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { mapData } from './data/DataMap'
import './App.css';

echarts.registerMap('world', mapData);

export const World = () => {
    const getOption = () => ({
        series: [{
            type: 'map',
            map: 'world'
        }]
    })

    const Chart = () => <ReactEcharts
        option={getOption()}
        style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
        opts={{ renderer: "svg" }}
    />


    return (
        <Chart />
    );
}
