<template>
    <span v-if="screepsData?.roomData">
        <span v-for="room in screepsData?.roomData" :key="room">
            <el-container>
                <el-header height="20px" style="text-align: left; font-size: 16px">
                    <p>{{ room.name }}</p>
                </el-header>
                <el-main>
                    <el-row :gutter="20">
                        <el-col :span="3"
                            ><div class="grid-content bg-white">
                                <DashboardProgressBar
                                    :msg="`rcl`"
                                    :levelData="room.controller ? room.controller : null"
                                />
                            </div>
                        </el-col>
                        <el-col :span="6"
                            ><div class="grid-content bg-white">
                                <TextContainer
                                    :msg="[
                                        `爬虫数量:  ${room.creep.num}`,
                                        `升级速度: ${room.controller.progressSpeed}`,
                                        `还有 ${room.controller.ticksToUpgrade} ticks升至下一级`
                                    ]"
                                    :title="`数据`"
                                /></div
                        ></el-col>
                        <el-col :span="15"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>

                    <el-tabs align="left" style="height: 80px;">
                        <el-tab-pane label="房间信息"
                            ><MermaidDialog
                                :mermaidCode="decode(room.projectDiagram.maintenance)"
                                :id="room.name + `maintenance`"
                                :msg="`房间运维`"
                        /></el-tab-pane>
                        <el-tab-pane label="外矿信息">暂无</el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
        </span>
    </span>
</template>

<script lang="ts">
import { ScreepsData } from "@/renderData/type";
import { Base64 } from "js-base64";
import { Options, Vue } from "vue-class-component";
import DashboardProgressBar from "./DashboardProgress.vue";
import MermaidDialog from "./MermaidDialog.vue";
import TextContainer from "./TextContainer.vue";

@Options({
    components: {
        DashboardProgressBar,
        TextContainer,
        MermaidDialog
    },
    props: {
        screepsData: Object
    }
})
export default class RoomDataContainer extends Vue {
    screepsData!: ScreepsData;
    public decode(msg: string): string {
        return Base64.decode(msg);
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
