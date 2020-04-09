import React from 'react';
import ReactEcharts from 'echarts-for-react';
import './App.css';
import { summaryData } from "./data/DataSummary";

export const SummaryV1 = () => {
    const getOption = () => {
        let countries = [];
        let confirmedNumbers = [];
        let existingNumbers = [];
        let newConfirmedNumbers = [];
        const topCountries = summaryData.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 26);
        topCountries.map(d => {
            countries.push(d.Country);
            existingNumbers.push(d.TotalConfirmed - d.NewConfirmed);
            newConfirmedNumbers.push(d.NewConfirmed);
        })

        const years = [0];
        let options = years.map(year => {
            let obj = {};

            obj["series"] = [
                {
                    stack: "group",
                    data: existingNumbers
                },
                {
                    stack: "group",
                    data: newConfirmedNumbers
                }
            ];

            obj["title"] = {
                text: `Population of Singapore by District, ${year}`
            };

            return obj;
        });

        return {
            baseOption: {
                timeline: {
                    bottom: 20,
                    height: null,
                    inverse: true,
                    left: null,
                    orient: "vertical",
                    playInterval: 1000,
                    right: 0,
                    top: 20,
                    width: 55,
                    label: {
                        normal: {
                            textStyle: {
                                color: "#aaa"
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: "#333"
                            }
                        }
                    },
                    symbol: "none"
                },
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
                series: [{ name: "ExistingCases", type: "bar" }, { name: "NewCases", type: "bar" }]
            },
            options: options
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
