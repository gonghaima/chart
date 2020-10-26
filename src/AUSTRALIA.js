import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { mapDataAU } from './data/DataMapAU'
import './App.css';

// echarts.registerMap('usa', mapDataAU);

// const ausiUrl = 'https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.json';
const ausiUrl = `https://raw.githubusercontent.com/simaQ/maps-data/master/Australia-states.geo.json`;


export const AUSTRALIA = () => {
    const [option, setOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {

        !loading && fetch(ausiUrl).then(response => response.json()).then(ausiJson => {
            setOption({
                series: [{
                    type: 'map',
                    map: 'au'
                }]
            });
            echarts.registerMap('au', ausiJson);
            // console.log(JSON.stringify(ausiJson));
            // 
            // echarts.registerMap('au', mapDataAU);
            setLoaded(true);
        })
        setLoading(true);
    }, [option, loading, loaded]);

    return (
        loaded && <ReactEcharts
            option={option}
            style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
            opts={{ renderer: "svg" }}
        />
    );
}
