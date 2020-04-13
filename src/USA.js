import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { mapDataUSA } from './data/DataMapUSA'
import './App.css';

echarts.registerMap('usa', mapDataUSA);

const usaUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/USA_geo.json';

export const USA = () => {
    const [option, setOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoading(true);
        !loading && fetch(usaUrl).then(chinaJson => {
            setOption({
                series: [{
                    type: 'map',
                    map: 'usa'
                }]
            });
            setLoaded(true);
            // echarts.registerMap('world', chinaJson);
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
