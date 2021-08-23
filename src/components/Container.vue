<template>
    <el-container style="width:100%; height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <SideMenu :screepsData="screepsData" />
        </el-aside>

        <el-container>
            <el-header height="80px" style="text-align: left; font-size: 16px">
                <p>stats</p>
            </el-header>
            <el-main><Layout :screepsData="screepsData"/></el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { ScreepsData } from "@/renderData/type";
import { Options, Vue } from "vue-class-component";
import Layout from "./Layout.vue";
import SideMenu from "./SideMenu.vue";
// Define the component in class-style
@Options({
    props: {
        screepsData: Object
    },
    components: {
        Layout,
        SideMenu
    }
})
export default class Container extends Vue {
    screepsData!: ScreepsData;
    // Class properties will be component data
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
