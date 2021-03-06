import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './App.css';
import { summaryData } from "./data/DataSummary";

export const SummaryV1 = () => {
    const getOption = () => {
        let countries = [];
        let existingNumbers = [];
        let newConfirmedNumbers = [];
        const topCountries = summaryData.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 26);
        topCountries.map(d => {
            countries.push(d.Country);
            existingNumbers.push(d.TotalConfirmed - d.NewConfirmed);
            newConfirmedNumbers.push(d.NewConfirmed);
        })

        return {
            baseOption: {

                color: ["#e91e63", "#354EF6"],
                title: {
                    subtext: "Data from the Singapore Department of Statistics",
                    textAlign: "left",
                    left: "5%"
                },
                tooltip: { backgroundColor: "#555", borderWidth: 0, padding: 10 },
                legend: {
                    data: ["ExistingCases", "NewCases"],
                    itemGap: 35,
                    itemHeight: 18,
                    right: "11%",
                    top: 20
                },
                calculable: true,
                grid: {
                    top: 100,
                    bottom: 150,
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                            label: {
                                show: true,
                                formatter: function (params) {
                                    return params.value.replace("\n", "");
                                }
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
                series: [{ name: "ExistingCases", stack: "group", type: "bar", data: existingNumbers }, { name: "NewCases", stack: "group", type: "bar", data: newConfirmedNumbers }]
            }
        };
    };

    return (
        <ReactEcharts
            option={getOption()}
            style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
            opts={{ renderer: "svg" }}
        />
    );
}
