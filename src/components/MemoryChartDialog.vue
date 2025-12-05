<template>
    <el-button type="primary" align="left" @click="dialogTableVisible = true">Memory内存分布图</el-button>

    <el-dialog title="Memory Profiler Dialog" :fullscreen="true" v-model="dialogTableVisible" @opened="runRender()">
        <div :id="id + time + random" style="height: 800px; width: 1800px; margin: 0 auto"></div>
    </el-dialog>
</template>

<script lang="ts">
// Memory占用分析器【Memory占用过大分析用的】 作者：6g3y 修改者(添加ts类型): Ureimu
import { Options, Vue } from "vue-class-component";
import * as echarts from "echarts/core";

import { TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption } from "echarts/components";
import { TreemapChart, TreemapSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([TitleComponent, TooltipComponent, TreemapChart, CanvasRenderer]);
type EChartsOption = echarts.ComposeOption<TitleComponentOption | TooltipComponentOption | TreemapSeriesOption>;
type treeChildren = {
    name: string;
    value: number;
    datas?: string;
    children?: treeChildren[];
};

// Define the component in class-style
@Options<MemoryChartDialog>({
    props: {
        name: String,
        id: String,
        visable: Boolean,
        memoryString: String
    },
    computed: {
        runRenderWhenVisable() {
            this.runRender();
            return this.visable && this.hasMounted && this.xAxis;
        }
    }
})
export default class MemoryChartDialog extends Vue {
    id!: string;
    visable!: boolean;
    hasMounted = false;
    name!: string;
    memoryString!: string;
    time = Date.now().toString();
    random = Math.random().toFixed(10);
    myChart!: echarts.ECharts;
    dialogTableVisible = false;
    mounted(): void {
        this.hasMounted = true;
    }
    runRender(): void {
        let chartDom = document.getElementById(this.id + this.time + this.random);
        if (!chartDom) return;
        console.log(`${this.id} start render multi line chart`);
        let myChart: echarts.ECharts;
        if (!this.myChart) {
            myChart = echarts.init(chartDom);
            this.myChart = myChart;
        } else {
            myChart = this.myChart;
        }

        var option: EChartsOption;

        let json = this.memoryString ?? "{}";

        myChart.showLoading();
        myChart.hideLoading();

        let oriData = JSON.parse(json);
        console.log(oriData);

        let diskData: treeChildren[] | undefined = [];

        function getType(obj: Object) {
            return "" + Object.prototype.toString.call(obj).replace("[object ", "") + "";
        }

        function getChildrens(data: string, name: string, len: number): treeChildren {
            let out = {
                name: name,
                value: len,
                datas: name + ":" + data,
                children: [] as treeChildren[]
            };
            let da = JSON.parse(data);
            let obj = "[" + Object.prototype.toString.call(da).replace("[object ", "") + "";
            //Object.prototype.toString.call(da)
            //out.name+=obj;
            if (typeof da == "object") {
                for (let k in da) {
                    //if(!da[k])continue;
                    let subJson = JSON.stringify(da[k]);
                    //console.log(k,typeof(subJson),da)
                    let keyLen = obj != "[Array]" ? ("" + k).length : 0; //  如果是数组不用key
                    keyLen += getType(k) == "Number" ? 0 : 2; // 不是数字要加双引号
                    let namet = obj == "[Array]" ? "[" + k + "]" : k; // 数组 [ 0 ]
                    if (da[k] == undefined) out.children.push({ name: namet, value: keyLen });
                    else out.children.push(getChildrens(subJson, namet, keyLen + (subJson ? subJson.length : 0)));
                }
            } else {
                out.name += ":" + data;
            }
            if (out.children.length == 0) delete (out as treeChildren).children;
            return out;
        }
        diskData = getChildrens(json, "Memoey", json.length).children;
        //console.log(diskData)

        var formatUtil = echarts.format;

        function getLevelOption() {
            return [
                {
                    itemStyle: {
                        borderColor: "#777",
                        borderWidth: 0,
                        gapWidth: 1
                    },
                    upperLabel: {
                        show: false
                    }
                },
                {
                    itemStyle: {
                        borderColor: "#555",
                        borderWidth: 5,
                        gapWidth: 1
                    },
                    emphasis: {
                        itemStyle: {
                            borderColor: "#ddd"
                        }
                    }
                },
                {
                    colorSaturation: [0.35, 0.5],
                    itemStyle: {
                        borderWidth: 5,
                        gapWidth: 1,
                        borderColorSaturation: 0.7
                    }
                }
            ].concat(
                [...Array(12).keys()].map(e => {
                    return {
                        colorSaturation: [0.35, 0.5],
                        itemStyle: {
                            borderWidth: 5,
                            gapWidth: 1,
                            borderColorSaturation: 0.75 - e * 0.05
                        }
                    };
                })
            );
        }

        function transform(datas: string) {
            if (datas.length > 2500 / 2) {
                datas = datas.substr(0, 2500 / 2 - 4) + "...";
            }
            let out = "";
            for (let i = 0; i < datas.length; i += 50) {
                out += '<div class="tooltip-title">' + datas.substr(i, 50) + "</div>";
            }

            return out;
        }

        function update(json: string) {
            diskData = getChildrens("" + json, "Memoey", json.length).children;

            myChart.setOption(
                (option = {
                    tooltip: {
                        formatter: function(info: any) {
                            var value = info.value;
                            var datas = info.data.datas;
                            var treePathInfo = info.treePathInfo;
                            var treePath = [];
                            //if(datas.length>50)datas=datas.substr(0,50)+"..."
                            datas = transform(datas);

                            for (var i = 1; i < treePathInfo.length; i++) {
                                treePath.push(treePathInfo[i].name);
                            }

                            return [
                                '<div class="tooltip-title">' +
                                    formatUtil
                                        .encodeHTML(treePath.join("."))
                                        .replace(".[", "[")
                                        .replace(".[", "[")
                                        .replace(".[", "[")
                                        .replace(".[", "[") +
                                    "</div>",
                                '<div class="tooltip-title">' + datas + "</div>",
                                "Memory Usage: " + formatUtil.addCommas(value) + " 字符占用"
                            ].join("");
                        }
                    },
                    // visualMap: [{
                    //type: 'continuous',//连续型
                    //dimension: 2,//对应的数组维度
                    //show: false,//颜色范围选择的小工具不显示
                    //color: ['#1710c0', '#0b9df0', '#00fea8', '#00ff0d', '#f5f811', '#f09a09', '#fe0300'].reverse(),//颜色过渡，可自选
                    //}],
                    series: [
                        {
                            name: "Memory",
                            type: "treemap",
                            visibleMin: 5000,
                            label: {
                                show: true,
                                formatter: "{b}"
                            },
                            upperLabel: {
                                show: true,
                                height: 30
                            },
                            itemStyle: {
                                borderColor: "#fff"
                            },
                            levels: getLevelOption(),
                            data: diskData
                        }
                    ]
                })
            );

            if (option && typeof option === "object") {
                myChart.setOption(option);
            }
        }
        update(json);
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
