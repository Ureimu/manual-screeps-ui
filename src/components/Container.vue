<template>
    <el-container style="width: 100%; height: 100%; border: 1px solid #eee">
        <el-aside id="navBar" :class="{ isFixed: istabBar }" width="200px">
            <SideMenu :screepsData="screepsData" />
        </el-aside>

        <el-container id="mainPart">
            <el-header height="80px" style="text-align: left; font-size: 16px">
                <h1>stats</h1>
            </el-header>
            <el-main><Layout :screepsData="screepsData" /></el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { ScreepsData } from "@/data/type/converted";
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
    istabBar = false;
    // Class properties will be component data
    handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        // 固定导航栏
        let navBar = document.querySelector("#navBar") as Element & {
            offsetHeight: number;
            style: { paddingTop: string };
        };
        if (scrollTop > 0) {
            this.istabBar = true;
            navBar.style.paddingTop = scrollTop + "px";
        } else {
            this.istabBar = false;
            navBar.style.paddingTop = "0px";
        }
    }
    mounted() {
        window.addEventListener("scroll", this.handleScroll); // Dom树加载完毕
    }
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll); // 销毁页面时清除
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
#navBar {
    background-color: rgb(238, 241, 246);
    width: 100px;
}
#mainPart {
    width: 100%;
}
</style>
