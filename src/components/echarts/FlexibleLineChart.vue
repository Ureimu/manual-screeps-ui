<template>
    {{ runRenderWhenVisable ? `` : `not rendered` }}
    <div :id="id + time + random" style="height: 260px; width: 520px; margin: 0 auto"></div>
    <!-- 新增：显示选区计算结果 -->
    <div style="text-align:center; margin-top:6px; color: #333; font-size: 13px;">
        <span v-if="selectionDelta !== null"
            >变化值(delta): <b>{{ selectionDelta }}</b></span
        >
        <!-- 修改：显示平均变化率并附加单位 -->
        <span v-if="selectionAvg !== null" style="margin-left:12px;"
            >平均变化率(avg): <b>{{ selectionAvg }}{{ selectionAvgUnit }}</b></span
        >
        <span v-if="selectionDelta === null && selectionAvg === null">请选择或缩放区间以查看计算结果</span>
    </div>
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
    // 新增响应式字段：框选结果
    selectionDelta: number | null = null;
    selectionAvg: number | null = null;
    // 新增：平均值单位（"/s" 或 "/tick"）
    selectionAvgUnit: string | null = null;
    mounted(): void {
        this.hasMounted = true;
    }
    // 新增：根据 dataZoom 百分比计算选区（右端点y - 左端点y），以及选区平均值
    computeSelectionFromPercent(startPercent: number, endPercent: number, fullData: [number, number][]) {
        if (!fullData || fullData.length === 0) {
            this.selectionDelta = null;
            this.selectionAvg = null;
            this.selectionAvgUnit = null;
            return;
        }
        const len = fullData.length;
        // clamp and convert percent to indices
        const sIdx = Math.max(0, Math.min(len - 1, Math.round((startPercent / 100) * (len - 1))));
        const eIdx = Math.max(0, Math.min(len - 1, Math.round((endPercent / 100) * (len - 1))));
        const left = Math.min(sIdx, eIdx);
        const right = Math.max(sIdx, eIdx);
        if (right < 0 || left >= len) {
            this.selectionDelta = null;
            this.selectionAvg = null;
            this.selectionAvgUnit = null;
            return;
        }
        const yLeft = Number(fullData[left][1]) || 0;
        const yRight = Number(fullData[right][1]) || 0;
        const delta = yRight - yLeft;

        const xLeft = Number(fullData[left][0]);
        const xRight = Number(fullData[right][0]);
        const span = xRight - xLeft;

        let avgRate: number | null = null;
        let unit: string | null = null;

        if (span === 0) {
            // 无跨度，无法定义速率
            avgRate = null;
            unit = null;
        } else {
            if (this.xAxis === "time") {
                // 时间轴：x 单位为毫秒，转换为秒再计算 (/s)
                const spanSeconds = span / 1000;
                if (spanSeconds > 0) {
                    avgRate = delta / spanSeconds;
                    unit = "/s";
                }
            } else {
                // tick 轴：按 tick 计算 (/tick)
                const spanTicks = span;
                if (spanTicks > 0) {
                    avgRate = delta / spanTicks;
                    unit = "/tick";
                }
            }
        }

        this.selectionDelta = Number.isFinite(delta) ? Number(delta) : null;
        this.selectionAvg = avgRate !== null && Number.isFinite(avgRate) ? Number(Number(avgRate).toFixed(2)) : null;
        this.selectionAvgUnit = unit;
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

        // 绑定 datazoom 事件，避免重复绑定先移除
        myChart.off("datazoom");
        myChart.on("datazoom", (params: any) => {
            // params 结构在不同版本可能不同，兼容 batch 与 非 batch 形式
            let start = 0;
            let end = 100;
            if (params.batch && params.batch.length > 0) {
                start = params.batch[0].start ?? params.batch[0].startValue ?? start;
                end = params.batch[0].end ?? params.batch[0].endValue ?? end;
            } else {
                start = params.start ?? start;
                end = params.end ?? end;
            }
            this.computeSelectionFromPercent(start, end, fullData);
        });

        // 首次用当前 dataZoom 范围做一次计算（默认 option 中 start=0 end=100）
        // 如果图表已有 dataZoom 状态，也可以从 myChart.getOption() 读取，但使用初始值保证显示
        this.computeSelectionFromPercent(0, 100, fullData);
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
