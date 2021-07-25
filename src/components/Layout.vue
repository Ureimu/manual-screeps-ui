<template>
    <el-row :gutter="20">
        <el-col :span="4"
            ><div class="grid-content bg-white">
                <DashboardProgressBar
                    :msg="`gcl`"
                    :levelData="screepsData?.userData.gcl ? screepsData.userData.gcl : null"
                />
            </div>
        </el-col>
        <el-col :span="4"
            ><div class="grid-content bg-white">
                <DashboardProgressBar
                    :msg="`gpl`"
                    :levelData="screepsData?.userData.gpl ? screepsData.userData.gpl : null"
                /></div
        ></el-col>
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</template>

<script lang="ts">
import { ScreepsData } from "@/renderData/type";
import { Options, Vue } from "vue-class-component";
import DashboardProgressBar from "./DashboardProgress.vue";

@Options({
    components: {
        DashboardProgressBar
    },
    props: {
        screepsData: Object
    }
})
export default class Layout extends Vue {
    screepsData!: ScreepsData;
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
    background: #f9fafc;
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
