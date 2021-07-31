<template>
    <el-container style="width:100%; height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template #title><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template #title>选项4</template>
                        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
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
// Define the component in class-style
@Options({
    props: {
        screepsData: Object
    },
    components: {
        Layout
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
