import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './App.css';
import { summaryData } from "./data/DataSummary";

export const Pie = () => {
    const getOption = () => {
        let countries = [];
        let confirmedNumbers = [];
        const topCountries = summaryData.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 26);
        topCountries.map(d => {
            countries.push(d.Country);
            confirmedNumbers.push({ name: d.Country, value: d.TotalConfirmed });
        })
        return {
            title: {
                text: 'Summary of COVID19 cases'
            },
            tooltip: {},
            legend: {
                data: ['Summary']
            },
            series: [{
                type: 'pie',
                data: confirmedNumbers
            }]
        }
    }

    const Chart = () => <ReactEcharts
            option={getOption()}
            style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
            opts={{ renderer: "svg" }}
        />

    return (
        <Chart />
    );
}
