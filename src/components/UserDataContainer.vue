<template>
    <el-container>
        <el-header height="20px" style="text-align: left; font-size: 16px">
            <p>user data</p>
        </el-header>
        <el-main>
            <el-row :gutter="30">
                <el-col :span="3"
                    ><div class="grid-content bg-white">
                        <DashboardProgressBar
                            :msg="`gcl`"
                            :levelData="screepsData?.userData.gcl ? screepsData.userData.gcl : null"
                        />
                    </div>
                </el-col>
                <el-col :span="3"
                    ><div class="grid-content bg-white">
                        <DashboardProgressBar
                            :msg="`gpl`"
                            :levelData="screepsData?.userData.gpl ? screepsData.userData.gpl : null"
                        /></div
                ></el-col>
                <el-col :span="6">
                    <div class="grid-content bg-white">
                        <TextContainer
                            :msg="[
                                `用户名称:  ${screepsData?.userData.name}`,
                                `shard名称: ${screepsData?.shardData.shardName}`,
                                `数据生成时间: ${screepsData?.timeData.tick}`
                            ]"
                            :title="`数据`"
                        />
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple"></div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { ScreepsData } from "@/renderData/type";
import { Options, Vue } from "vue-class-component";
import DashboardProgressBar from "./DashboardProgress.vue";
import TextContainer from "./TextContainer.vue";

@Options({
    props: {
        screepsData: Object
    },
    components: {
        DashboardProgressBar,
        TextContainer
    }
})
export default class UserDataContainer extends Vue {
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
