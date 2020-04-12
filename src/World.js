import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { mapData } from './data/DataMap'
import './App.css';

echarts.registerMap('world', mapData);

export const World = () => {
    const [option, setOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoading(true);
        !loading && fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/world.json').then(chinaJson => {
            setOption({
                series: [{
                    type: 'map',
                    map: 'world'
                }]
            });
            setLoaded(true);
            echarts.registerMap('world', chinaJson);
        })
    }, [option, loading, loaded]);

    return (
        loaded && <ReactEcharts
            option={option}
            style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
            opts={{ renderer: "svg" }}
        />
    );
}
