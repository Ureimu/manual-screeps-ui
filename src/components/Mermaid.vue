<template>
    <span>
        <div :id="`${id}GraphDiv`" class="mermaid">{{ mermaidCode }}</div>
        <div :id="`${id}Res`"></div>
    </span>
</template>

<script lang="ts">
// import mermaid from "mermaid";
//上面的报错不影响编译和运行
//<span class="percentage-value">{{ percentage }}%</span>
import mermaid from "mermaid";
import { Vue, Options } from "vue-class-component";

@Options({
    computed: {
        // 计算属性的 getter
        codeCache: function() {
            // `this` 指向 vm 实例
            if (this.mermaidCode?.length > 0 && this.mermaidCode !== "undefined") {
                console.log("set codeCache");
                let insertSvg = (svgCode: string) => {
                    console.log("finishRender:\n" + svgCode);
                    this.svgCode = svgCode;
                };

                const svgCode = mermaid.render(this.id + `GraphDiv`, this.mermaidCode, insertSvg);
                console.log("finishRender:\n" + svgCode);
                this.svgCode = svgCode;
            }
            return this.mermaidCode;
        },
        hasRendered: function() {
            // `this` 指向 vm 实例
            console.log("set codeCache");
            if (this.mermaidCode?.length > 0 && this.mermaidCode !== "undefined" && this.visable) {
                console.log("set codeCache");
                let insertSvg = (svgCode: string) => {
                    console.log("finishRender:\n" + svgCode);
                    this.svgCode = svgCode;
                };

                mermaid.render(this.id + `GraphDiv`, this.mermaidCode, insertSvg);
            }
            return this.visable;
        }
    },
    props: {
        mermaidCode: String,
        id: String,
        visable: Boolean
    }
})
export default class Mermaid extends Vue {
    mermaidCode!: string;
    id!: string;
    visable!: boolean;
    svgCode = "";
}
</script>

<style scoped>
.mermaid2 {
    display: none;
}
.mermaid svg {
    font-size: 18px !important;
}
</style>
