import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
// import { mapDataUSA } from './data/DataMapUSA'
import './App.css';

// echarts.registerMap('usa', mapDataUSA);

const usaUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/USA_geo.json';
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
    const [option, setOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {

        !loading && fetch(usaUrl).then(response => response.json()).then(usaJson => {
            setOption({
                series: [{
                    type: 'map',
                    map: 'usa'
                }]
            });
            echarts.registerMap('usa', usaJson, mapModifier);
            // console.log(JSON.stringify(usaJson));
            // 
            // echarts.registerMap('usa', mapDataUSA);
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
