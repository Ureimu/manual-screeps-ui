<template>
    <el-container>
        <el-header height="40px" style="font-size: 20px">
            <p>{{ msg }}</p>
        </el-header>
        <el-main>
            <el-progress
                type="circle"
                size="medium"
                stroke-width="10"
                :title="msg"
                :percentage="levelData ? (levelData.progress / levelData.progressTotal) * 100 : 0"
            >
                <template #default="{ percentage }">
                    <span class="percentage-label">{{ levelData.level }}:</span>
                    <span class="percentage-value">{{ percentage }}%</span>
                </template>
            </el-progress></el-main
        >
    </el-container>
</template>

<script lang="ts">
import { LevelData } from "@/renderData/type";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        msg: String,
        levelData: Object
    }
})
export default class DashboardProgressBar extends Vue {
    msg!: string;
    levelData!: LevelData;
}
</script>

<style>
.ele-size {
    size: 600px;
}
.percentage-value {
    font-size: 24px;
}
.percentage-label {
    font-size: 24px;
}
</style>
