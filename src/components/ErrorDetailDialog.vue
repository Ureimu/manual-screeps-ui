<template>
    <el-button type="primary" align="left" @click="dialogTableVisible = true">{{ title }}</el-button>

    <el-dialog title="Error Memory Dialog" :fullscreen="true" v-model="dialogTableVisible">
        <el-row v-for="rowIndex in Math.ceil(singleErrorCache.messageList.length / space)" :key="rowIndex" :gutter="20">
            <el-col
                :span="24 / space"
                v-for="colIndex in (rowIndex - 1) * space + space > singleErrorCache.messageList.length
                    ? singleErrorCache.messageList.length - (rowIndex - 1) * space
                    : space"
                :key="colIndex"
            >
                <span
                    v-for="singleMessage in singleErrorCache.messageList[(rowIndex - 1) * space + colIndex - 1].full"
                    :key="singleMessage"
                    class="error"
                >
                    {{ singleMessage }}<br />
                </span>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script lang="ts">
import { SingleErrorCache } from "@/renderData/type";
import { Options, Vue } from "vue-class-component";
// Define the component in class-style

@Options({
    props: {
        singleErrorCache: Object,
        title: Number
    }
})
export default class ErrorDetailDialog extends Vue {
    title!: string;
    singleErrorCache!: SingleErrorCache;
    dialogTableVisible = false;
    space = 3;
}
</script>

<style scoped>
p {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 21px;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}

.error {
    font-size: 17px;
    text-align: left;
    color: black;
    margin-top: 20px;
    margin-left: 13px;
    margin-right: 13px;
    margin-bottom: 20px;
}
</style>
