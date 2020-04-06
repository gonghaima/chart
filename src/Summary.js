import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './App.css';
import { summaryData } from "./data/DataSummary";

export const Summary = () => {
    const getOption = () => {
        let countries = [];
        let confirmedNumbers = [];
        summaryData.Countries.map(d => {
            countries.push(d.Country);
            confirmedNumbers.push(d.TotalConfirmed);
        })
        return {
            title: {
                text: 'Summary of COVID19 cases'
            },
            tooltip: {},
            legend: {
                data: ['Summary']
            },
            xAxis: {
                data: countries
            },
            yAxis: {},
            series: [{
                name: 'Summary',
                type: 'bar',
                data: confirmedNumbers
            }]
        }
    }

    return (
        <ReactEcharts
            option={getOption()}
            style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
            opts={{ renderer: "svg" }}
        />
    );
}
