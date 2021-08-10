<template>
    <div :id="id"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

echarts.use([GridComponent, LineChart, SVGRenderer]);

let chartDom = document.getElementById("main");
if (chartDom) {
    let myChart = echarts.init(chartDom);
    let option = {
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: "line"
            }
        ]
    };
    myChart.setOption(option);
}

// Define the component in class-style
@Options({
    props: {
        id: String
    }
})
export default class Counter extends Vue {
    id!: string;
}
</script>

<style scoped></style>
