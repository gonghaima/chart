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
            grid: {
                top: 100,
                bottom: 150,
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            show: true
                        }
                    }
                }
            },
            xAxis: [
                {
                    axisLabel: {
                        interval: 0,
                        rotate: 55,
                        textStyle: {
                            baseline: "top",
                            color: "#333",
                            fontSize: 10,
                            fontWeight: "bold"
                        }
                    },
                    axisLine: { lineStyle: { color: "#aaa" }, show: true },
                    axisTick: { show: false },
                    data: countries,
                    splitLine: { show: false },
                    type: "category"
                }
            ],
            yAxis: [
                {
                    axisLabel: {
                        textStyle: { fontSize: 10 }
                    },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    name: "Population",
                    splitLine: {
                        lineStyle: {
                            type: "dotted"
                        }
                    },
                    type: "value"
                }
            ],
            series: [{
                type: 'pie',
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
