<template>
    <el-container>
        <el-header height="50px" style="text-align: left; font-size: 16px">
            <h2>
                <a name="userData">User data</a>
            </h2>
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="3"
                    ><div class="grid-content bg-white">
                        <DashboardProgressBar
                            :msg="`gcl`"
                            :levelData="screepsData?.userData.gcl ? screepsData.userData.gcl : null"
                            :isFull="false"
                        />
                    </div>
                </el-col>
                <el-col :span="3"
                    ><div class="grid-content bg-white">
                        <DashboardProgressBar
                            :msg="`gpl`"
                            :levelData="screepsData?.userData.gpl ? screepsData.userData.gpl : null"
                            :isFull="false"
                        /></div
                ></el-col>
                <el-col :span="3"
                    ><div class="grid-content bg-white">
                        <DashboardProgressBar
                            :msg="`errMem`"
                            :levelData="{
                                level: screepsData?.userData.error.cache
                                    ? Object.keys(screepsData?.userData.error.cache).length
                                    : null,
                                progress: screepsData?.userData.error
                                    ? JSON.stringify(screepsData?.userData.error).length
                                    : null,
                                progressTotal: 1.024e5
                            }"
                            :isFull="screepsData?.userData.error.isFull"
                        /></div
                ></el-col>
                <el-col :span="6">
                    <div class="grid-content bg-white">
                        <TextContainer
                            :msg="[
                                `用户名称:  ${screepsData?.userData.name}`,
                                `shard名称: ${screepsData?.shardData.shardName}`,
                                `数据生成时间: ${screepsData?.timeData.tick}`,
                                `对应现实时间: ${getTime(screepsData?.timeData.time)}`
                            ]"
                            :title="`数据`"
                        />
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="grid-content bg-white"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-white">
                        <FlexibleLineChart
                            :id="`credits`"
                            :timeData="screepsData?.timeSeriesData.timeStamp.data"
                            :gameTimeData="screepsData?.timeSeriesData.gameTime.data"
                            :yData="screepsData?.timeSeriesData.userData.credits.data"
                            :visable="!!screepsData"
                            :name="`credits`"
                        /></div
                ></el-col>
                <el-col :span="8">
                    <div class="grid-content bg-white">
                        <FlexibleLineChart
                            :id="`pixels`"
                            :timeData="screepsData?.timeSeriesData.timeStamp.data"
                            :gameTimeData="screepsData?.timeSeriesData.gameTime.data"
                            :yData="screepsData?.timeSeriesData.userData.pixels.data"
                            :visable="!!screepsData"
                            :name="`pixels`"
                        /></div
                ></el-col>
                <el-col :span="8">
                    <div class="grid-content bg-white">
                        <FlexibleLineChart
                            :id="`gclProgress`"
                            :timeData="screepsData?.timeSeriesData.timeStamp.data"
                            :gameTimeData="screepsData?.timeSeriesData.gameTime.data"
                            :yData="screepsData?.timeSeriesData.userData.gclProgress.data"
                            :visable="!!screepsData"
                            :name="`gclProgress`"
                        /></div
                ></el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-white">
                        <FlexibleLineChart
                            :id="`gplProgress`"
                            :timeData="screepsData?.timeSeriesData.timeStamp.data"
                            :gameTimeData="screepsData?.timeSeriesData.gameTime.data"
                            :yData="screepsData?.timeSeriesData.userData.gplProgress.data"
                            :visable="!!screepsData"
                            :name="`gplProgress`"
                        />
                    </div>
                </el-col>
            </el-row>
            <ErrorMemoryDialog title="报错信息" :errorMemory="screepsData?.userData.error" />
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { ScreepsData } from "@/data/type";
import { Options, Vue } from "vue-class-component";
import DashboardProgressBar from "./DashboardProgress.vue";
import FlexibleLineChart from "./echarts/FlexibleLineChart.vue";
import ErrorMemoryDialog from "./ErrorMemoryDialog.vue";
import TextContainer from "./TextContainer.vue";

@Options({
    props: {
        screepsData: Object
    },
    components: {
        DashboardProgressBar,
        TextContainer,
        ErrorMemoryDialog,
        FlexibleLineChart
    }
})
export default class UserDataContainer extends Vue {
    screepsData!: ScreepsData;
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

<style>
.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.bg-white {
    background: #ffffff;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
