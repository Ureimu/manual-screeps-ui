<template>
    <el-container class="ele-size">
        <el-header height="60px" style="font-size: 28px">
            <p>{{ title }}</p>
        </el-header>
        <el-main>
            <span v-for="singleMsg in msg" :key="singleMsg">
                <p style="font-size: 20px; line-height: 10px">{{ singleMsg }}</p>
            </span>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
//<span class="percentage-value">{{ percentage }}%</span>
@Options({
    props: {
        msg: Object,
        title: String
    }
})
export default class TextContainer extends Vue {
    msg!: string[];
    title!: string;
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
