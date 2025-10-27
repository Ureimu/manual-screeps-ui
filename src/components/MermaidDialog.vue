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
import mermaid from "mermaid";
import { Options, Vue } from "vue-class-component";

import Mermaid from "./Mermaid.vue";

@Options({
    props: {
        mermaidCode: String,
        id: String,
        msg: String
    },
    components: {
        Mermaid
    },
    data() {
        return {
            formLabelWidth: "120px"
        };
    }
})
export default class MermaidDialog extends Vue {
    mermaidCode!: string;
    id!: string;
    msg!: string;
    dialogTableVisible = false;
    renderMermaid() {
        console.log("try set codeCache");
        if (this.mermaidCode?.length > 0 && this.mermaidCode !== "undefined") {
            console.log(this.mermaidCode);
            console.log("set codeCache");
            let insertSvg = (svgCode: string) => {
                console.log("finishRender:\n" + svgCode);
                let res = document.querySelector(`#${this.id}Res`);
                if (res) {
                    console.log("insert svg");
                    res.innerHTML = svgCode;
                }
            };

            console.log(mermaid.mermaidAPI.render(`${this.id}GraphDiv`, this.mermaidCode, insertSvg));
        }
    }
}
</script>

<style></style>
