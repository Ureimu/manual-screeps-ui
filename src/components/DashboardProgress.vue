<template>
    <el-container>
        <el-header height="60px" style="font-size: 28px">
            <p>{{ msg }}</p>
        </el-header>
        <el-main>
            <el-progress
                type="circle"
                size="medium"
                :color="isFull ? `#F56C6C` : `#409EFF`"
                :stroke-width="Number(13)"
                :width="Number(128)"
                :title="msg"
                :percentage="levelData ? (levelData.progress / levelData.progressTotal) * 100 : 0"
            >
                <template #default="{}">
                    <span class="percentage-label">{{ levelData?.level }}</span>
                </template>
            </el-progress></el-main
        >
    </el-container>
</template>

<script lang="ts">
import { LevelData } from "@/data/type/origin";
import { Options, Vue } from "vue-class-component";
//<span class="percentage-value">{{ percentage }}%</span>
@Options({
    props: {
        msg: String,
        levelData: Object,
        isFull: Boolean
    }
})
export default class DashboardProgressBar extends Vue {
    msg!: string;
    levelData!: LevelData;
    isFull!: boolean;
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
    font-size: 40px;
}
</style>
