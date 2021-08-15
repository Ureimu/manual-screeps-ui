<template>
    <el-button type="primary" align="left" @click="dialogTableVisible = true">{{ title }}</el-button>

    <el-dialog title="Error Memory Dialog" :fullscreen="true" v-model="dialogTableVisible">
        <el-table :data="rowData" style="width: 100%" height="750">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="tick" label="时间" width="160">
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.tick }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="errorShortMessage" label="错误信息" width="330">
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.messageList[0].short }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="errorNum" label="错误数量" width="100">
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.messageList.length }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="detailDialog" label="错误详细信息" width="140">
                <template #default="scope">
                    <ErrorDetailDialog :title="scope.row.tick" :singleErrorCache="scope.row" />
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script lang="ts">
import { ErrorSegmentMemory } from "@/renderData/type";
import { Options, Vue } from "vue-class-component";
import ErrorDetailDialog from "./ErrorDetailDialog.vue";
// Define the component in class-style

@Options({
    props: {
        errorMemory: Object,
        title: String
    },
    components: {
        ErrorDetailDialog
    }
})
export default class ErrorMemoryDialog extends Vue {
    title!: string;
    errorMemory!: ErrorSegmentMemory;
    dialogTableVisible = false;

    get rowData() {
        return Object.values(this.errorMemory.cache);
    }
}
</script>

<style scoped>
p {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
}
.el-header {
    background-color: #d1d3d6;
    color: #666;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
