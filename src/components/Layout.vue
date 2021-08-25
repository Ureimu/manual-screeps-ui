<template>
    <UserDataContainer :screepsData="screepsData" />
    <RoomDataContainer :screepsData="screepsData" />
    <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
</template>

<script lang="ts">
import { ScreepsData } from "@/data/type";
import { Options, Vue } from "vue-class-component";
import DashboardProgressBar from "./DashboardProgress.vue";
import RoomDataContainer from "./RoomDataContainer.vue";
import UserDataContainer from "./UserDataContainer.vue";

@Options({
    components: {
        DashboardProgressBar,
        UserDataContainer,
        RoomDataContainer
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
