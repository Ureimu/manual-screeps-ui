<template>
    {{ runRenderWhenVisable ? `` : `not rendered` }}
    <div :id="id + time + random" style="height: 520px; width: 460px; margin: 0 auto"></div>
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
import { SunburstChart } from "echarts/charts";
import { StoreData } from "@/data/type/origin";
/* eslint-disable no-unused-vars */
echarts.use([
    GridComponent,
    LineChart,
    SVGRenderer,
    TooltipComponent,
    DataZoomComponent,
    TitleComponent,
    SunburstChart
]);

// Define the component in class-style
@Options({
    props: {
        name: String,
        id: String,
        visable: Boolean,
        roomData: Object
    },
    computed: {
        runRenderWhenVisable() {
            if (this.visable || this.hasMounted) this.runRender();
            return this.visable && this.hasMounted;
        }
    }
})
export default class SunBrustResourceChart extends Vue {
    id!: string;
    visable!: boolean;
    hasMounted = false;
    name!: string;
    roomData!: { storage: StoreData; terminal: StoreData; factory: StoreData };
    time = Date.now().toString();
    random = Math.random().toFixed(10);
    mounted(): void {
        this.hasMounted = true;
    }
    getStorageTerminalRes(room: { storage: StoreData; terminal: StoreData; factory: StoreData }) {
        let store: Record<string, number> = {};
        if (room.storage) this.addStore(store, room.storage.store, room.storage.storeCapacity);
        if (room.terminal) this.addStore(store, room.terminal.store, room.terminal.storeCapacity);
        if (room.factory) this.addStore(store, room.factory.store, room.factory.storeCapacity);

        return store;
    }
    addStore(store: Record<string, number>, b: Record<string, number>, capacity: number) {
        let sum = 0;
        for (let v in b) {
            if (b[v] > 0) {
                store[v] = (store[v] || 0) + b[v];
                sum += b[v];
            }
        }
        store["empty"] = (store["empty"] || 0) + capacity - sum;
        return store;
    }
    RES_TREE = {
        POWER资源: { POWER资源: ["power", "ops"] },
        基础资源: {
            能量: ["energy", "battery"],
            原矿: ["U", "L", "K", "Z", "X", "O", "H", "G"],
            压缩: [
                "utrium_bar",
                "lemergium_bar",
                "keanium_bar",
                "zynthium_bar",
                "purifier",
                "oxidant",
                "reductant",
                "ghodium_melt"
            ]
        },
        商品资源: {
            蓝色: ["silicon", "wire", "switch", "transistor", "microchip", "circuit", "device"],
            黄色: ["metal", "alloy", "tube", "fixtures", "frame", "hydraulics", "machine"],
            紫色: ["mist", "condensate", "concentrate", "extract", "spirit", "emanation", "essence"],
            绿色: ["biomass", "cell", "phlegm", "tissue", "muscle", "organoid", "organism"]
        },
        LAB资源: {
            蓝色: ["UH", "UH2O", "XUH2O", "UO", "UHO2", "XUHO2"],
            黄色: ["ZH", "ZH2O", "XZH2O", "ZO", "ZHO2", "XZHO2"],
            紫色: ["KH", "KH2O", "XKH2O", "KO", "KHO2", "XKHO2"],
            绿色: ["LH", "LH2O", "XLH2O", "LO", "LHO2", "XLHO2"],
            白色: ["GH", "GH2O", "XGH2O", "GO", "GHO2", "XGHO2"]
        },
        empty: { empty: ["empty"] }
    };
    RES_COLOR_MAP: { [name: string]: string } = {
        empty: "rgb(247,247,247)",
        energy: "rgb(255,242,0)",
        battery: "rgb(255,242,0)",
        Z: "rgb(247, 212, 146)",
        L: "rgb(108, 240, 169)",
        U: "rgb(76, 167, 229)",
        K: "rgb(218, 107, 245)",
        X: "rgb(255, 192, 203)",
        G: "rgb(255,255,255)",
        zynthium_bar: "rgb(247, 212, 146)",
        lemergium_bar: "rgb(108, 240, 169)",
        utrium_bar: "rgb(76, 167, 229)",
        keanium_bar: "rgb(218, 107, 245)",
        purifier: "rgb(255, 192, 203)",
        ghodium_melt: "rgb(255,255,255)",
        power: "rgb(224,90,90)",
        ops: "rgb(224,90,90)",
        composite: "#ccc",
        crystal: "#ccc",
        liquid: "#ccc",
        device: "rgb(76, 167,229)",
        circuit: "rgb(76, 167,229)",
        microchip: "rgb(76, 167,229)",
        transistor: "rgb(76, 167,229)",
        switch: "rgb(76, 167,229)",
        wire: "rgb(76, 167,229)",
        silicon: "rgb(76, 167,229)",
        machine: "rgb(247,212,146)",
        hydraulics: "rgb(247,212,146)",
        frame: "rgb(247,212,146)",
        fixtures: "rgb(247,212,146)",
        tube: "rgb(247,212,146)",
        alloy: "rgb(247,212,146)",
        metal: "rgb(247,212,146)",
        essence: "rgb(218,107,245)",
        emanation: "rgb(218,107,245)",
        spirit: "rgb(218,107,245)",
        extract: "rgb(218,107,245)",
        concentrate: "rgb(218,107,245)",
        condensate: "rgb(218,107,245)",
        mist: "rgb(218,107,245)",
        organism: "rgb(108,240,169)",
        organoid: "rgb(108,240,169)",
        muscle: "rgb(108,240,169)",
        tissue: "rgb(108,240,169)",
        phlegm: "rgb(108,240,169)",
        cell: "rgb(108,240,169)",
        biomass: "rgb(108,240,169)",
        OH: "#ccc",
        ZK: "#ccc",
        UL: "#ccc",
        UH: "rgb(76, 167,229)",
        UH2O: "rgb(76, 167,229)",
        XUH2O: "rgb(76, 167,229)",
        UO: "rgb(76, 167,229)",
        UHO2: "rgb(76, 167,229)",
        XUHO2: "rgb(76, 167,229)",
        ZH: "rgb(247,212,146)",
        ZH2O: "rgb(247,212,146)",
        XZH2O: "rgb(247,212,146)",
        ZO: "rgb(247,212,146)",
        ZHO2: "rgb(247,212,146)",
        XZHO2: "rgb(247,212,146)",
        KH: "rgb(218,107,245)",
        KH2O: "rgb(218,107,245)",
        XKH2O: "rgb(218,107,245)",
        KO: "rgb(218,107,245)",
        KHO2: "rgb(218,107,245)",
        XKHO2: "rgb(218,107,245)",
        LH: "rgb(108,240,169)",
        LH2O: "rgb(108,240,169)",
        XLH2O: "rgb(108,240,169)",
        LO: "rgb(108,240,169)",
        LHO2: "rgb(108,240,169)",
        XLHO2: "rgb(108,240,169)",
        GH: "rgb(255,255,255)",
        GH2O: "rgb(255,255,255)",
        XGH2O: "rgb(255,255,255)",
        GO: "rgb(255,255,255)",
        GHO2: "rgb(255,255,255)",
        XGHO2: "rgb(255,255,255)",
        H: "#ccc",
        O: "#ccc",
        oxidant: "#ccc",
        reductant: "#ccc"
    };

    buildTree(node: Record<string, number[] | Record<string, number[]>> | number[]) {
        let arr = [];
        const ori = this.getStorageTerminalRes(this.roomData);
        if ((node as number[])[0]) {
            for (let resType of node as number[]) {
                arr.push({
                    name: resType,
                    value: ori[resType],
                    itemStyle: {
                        color: this.RES_COLOR_MAP[resType]
                    }
                });
            }
        } else {
            for (let resType in node) {
                let children: any = this.buildTree((node as Record<string, number[]>)[resType]);
                if (children.length)
                    arr.push({
                        name: resType,
                        itemStyle: {
                            color: this.RES_COLOR_MAP[resType]
                                ? this.RES_COLOR_MAP[resType]
                                : children[0].itemStyle.color
                        },
                        children: children
                    });
            }
        }
        return arr;
    }
    runRender(): void {
        if (!this.roomData) return;
        console.log(`${this.id} runRender`);
        let chartDom = document.getElementById(this.id + this.time + this.random);
        const neededData: { [name: string]: unknown } = {
            chartDom
        };
        for (const key in neededData) {
            if (!neededData[key]) {
                console.log(`${this.id} ${key} notExist.`);
                return;
            }
        }
        if (!chartDom) return;
        console.log(`${this.id} start render line chart`);
        let myChart = echarts.init(chartDom);
        let data = this.buildTree(this.RES_TREE as any);
        console.log(JSON.stringify(data));
        let option = {
            title: {
                text: this.name,
                top: "top",
                left: "center"
            },
            tooltip: {},
            series: {
                itemStyle: {
                    borderColor: "#1b1b1b",
                    borderWidth: 1
                },
                type: "sunburst",
                data: data,
                radius: [0, "95%"],
                sort: null,
                emphasis: {
                    focus: "ancestor"
                }
            }
        };
        myChart.setOption(option);
    }
}
</script>
<style></style>
