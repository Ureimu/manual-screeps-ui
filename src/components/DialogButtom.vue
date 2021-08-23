<template>
    <el-button type="primary" align="left" @click="dialogTableVisible = true">{{ msg }}</el-button>

    <el-dialog title="svg" :fullscreen="true" v-model="dialogTableVisible" @opened="renderMermaid()">
        <el-container>
            <el-main>
                <Mermaid :id="id" :mermaidCode="mermaidCode" :visable="dialogTableVisible" />
            </el-main>
        </el-container>
    </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        mermaidCode: String,
        id: String,
        msg: String
    },
    data() {
        return {
            formLabelWidth: "120px"
        };
    }
})
export default class DialogButtom extends Vue {
    mermaidCode!: string;
    id!: string;
    msg!: string;
    dialogTableVisible = false;
}
</script>

<style></style>
