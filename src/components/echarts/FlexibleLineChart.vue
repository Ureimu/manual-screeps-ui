<template>
    {{ runRenderWhenVisable ? `` : `not rendered` }}
    <div :id="id + time + random" style="height: 260px; width: 520px; margin: 0 auto"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import { TooltipComponent } from "echarts/components";
import { DataZoomComponent } from "echarts/components";
import { TitleComponent } from "echarts/components";
import { AXIS_TYPE } from "@/store/mutations";
/* eslint-disable no-unused-vars */
echarts.use([GridComponent, LineChart, SVGRenderer, TooltipComponent, DataZoomComponent, TitleComponent]);

// Define the component in class-style
@Options({
    props: {
        name: String,
        id: String,
        timeData: Object,
        yData: Object,
        visable: Boolean,
        gameTimeData: Object
    },
    computed: {
        runRenderWhenVisable() {
            this.runRender();
            return this.visable && this.hasMounted && this.xAxis;
        },
        xAxis() {
            return this.$store.state.options[AXIS_TYPE];
        }
    }
})
export default class FlexibleLineChart extends Vue {
    id!: string;
    timeData!: number[];
    yData!: number[];
    visable!: boolean;
    hasMounted = false;
    name!: string;
    gameTimeData!: number[];
    time = Date.now().toString();
    random = Math.random().toFixed(10);
    myChart!: echarts.ECharts;
    xAxis!: string;
    mounted(): void {
        this.hasMounted = true;
    }
    runRender(): void {
        if (!this.yData) return;
        console.log(`${this.id} runRender`);
        let chartDom = document.getElementById(this.id + this.time + this.random);
        let fullData: [number, number][];
        if (this.xAxis === "time") {
            fullData = this.yData.map((value, index) => {
                return [this.timeData[index], value];
            });
        } else {
            fullData = this.yData.map((value, index) => {
                return [this.gameTimeData[index], value];
            });
        }

        const numberFormatter = (value: number) => {
            const absoluteValue = Math.abs(value);
            const magnitude = Math.log10(absoluteValue);
            const size = magnitude % 3;
            const magnitudeDivideKilo = magnitude - size;
            const LevelMap: { [size: number]: string } = {
                0: "",
                3: "k",
                6: "M",
                9: "B",
                12: "T",
                15: "P",
                18: "E",
                21: "Z",
                24: "Y"
            };
            return `${value >= 0 ? "" : "-"}${
                magnitude >= 3 ? (absoluteValue / 10 ** magnitudeDivideKilo).toFixed(size >= 2 ? 0 : 1) : absoluteValue
            }${LevelMap[magnitudeDivideKilo] ? LevelMap[magnitudeDivideKilo] : ""}`;
        };
        const varingRateOriginData: [[number, number], [number, number]][] = [];
        fullData.forEach((value, index, array) => {
            if (index > 0) varingRateOriginData.push([value, array[index - 1]]);
        });
        const varingRateData = varingRateOriginData.map(value => [value[0][0], value[0][1] - value[1][1]]);
        const neededData: { [name: string]: unknown } = {
            chartDom,
            timeData: this.timeData,
            yData: this.yData
        };
        for (const key in neededData) {
            if (!neededData[key]) {
                console.log(`${this.id} ${key} notExist.`);
                return;
            }
        }
        if (!chartDom) return;
        console.log(`${this.id} start render line chart`);
        let myChart;
        if (!this.myChart) {
            myChart = echarts.init(chartDom);
            this.myChart = myChart;
        } else {
            myChart = this.myChart;
        }
        console.log(this.xAxis);
        let option = {
            tooltip: {
                trigger: "axis",
                position: function (
                    pos: number[],
                    _params: any,
                    _dom: any,
                    _rect: any,
                    size: { contentSize: [width: number, height: number]; viewSize: [width: number, height: number] }
                ) {
                    let obj: { top: number | string; left?: number; right?: number } = { top: "-20%", left: 50 };
                    return obj;
                },
                extraCssText: "text-align: left",
                formatter: (
                    params: {
                        data: [timeStamp: number, value: number];
                        dataIndex: number;
                        seriesName: string;
                        color: string;
                        marker: string;
                    }[]
                ) => {
                    console.log(params);
                    let str = "";
                    if (!params[0]) return str;
                    const { dataIndex } = params[0];
                    str += `时间: ${this.getTime(this.timeData[dataIndex])}<br>tick: ${
                        this.gameTimeData[dataIndex]
                    }<br>`;
                    for (let index = 0; index < params.length; index++) {
                        const { data, seriesName, marker } = params[index];
                        str += `${marker} ${seriesName}: <b>${data[1]}</b> <br>`;
                    }
                    return str;
                }
            },
            title: {
                text: this.name,
                top: "top",
                left: "center"
            },
            xAxis: {},
            yAxis: [
                {
                    type: "value",
                    name: "value",
                    scale: true,
                    axisLabel: {
                        formatter: numberFormatter
                    },
                    splitLine: {
                        lineStyle: {
                            color: ["#16f"],
                            opacity: 0.2
                        }
                    }
                },
                {
                    type: "value",
                    scale: true,
                    name: "delta",
                    axisLabel: {
                        formatter: numberFormatter
                    },
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                            color: ["#392"],
                            opacity: 0
                        }
                    }
                }
            ],
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100
                },
                {
                    type: "inside",
                    realtime: true,
                    start: 25,
                    end: 85
                }
            ],
            series: [
                {
                    name: this.name,
                    type: "line",
                    smooth: true,
                    symbol: "none",
                    areaStyle: {},
                    data: fullData
                },
                {
                    name: this.name + " delta",
                    type: "line",
                    yAxisIndex: 1,
                    lineStyle: {
                        width: 0
                    },
                    showSymbol: false,
                    data: varingRateData
                }
            ]
        };
        if (this.xAxis === "time") {
            option.xAxis = {
                type: "time",
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true
                }
            };
        } else {
            option.xAxis = {
                type: "value",
                min: "dataMin",
                max: "dataMax",
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true
                }
            };
        }
        myChart.setOption(option);
    }
    getTime(time: number): string {
        const addZero = (time: number): string => {
            if (time < 10) {
                return `0${time}`;
            } else {
                return `${time}`;
            }
        };
        const date = new Date(time);
        const dateData = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            min: date.getMinutes(),
            s: date.getSeconds()
        };
        return `${dateData.y}-${addZero(dateData.m)}-${addZero(dateData.d)},${addZero(dateData.h)}:${addZero(
            dateData.min
        )}:${addZero(dateData.s)}`;
    }
}
</script>

<style scoped>
.uli li {
    list-style-type: "disc";
    color: gray;
}
</style>
