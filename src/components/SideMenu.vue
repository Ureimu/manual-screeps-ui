<template>
    <el-menu
        :uniqueOpened="true"
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <template #title>
                <a :href="`#userData`">User Data</a>
            </template>
        </el-menu-item>
        <el-submenu index="2">
            <template #title>
                <i class="el-icon-location"></i>
                <span>Room Data</span>
            </template>
            <span v-if="screepsData?.roomData">
                <span v-for="room in screepsData?.roomData" :key="room">
                    <el-menu-item :index="room.name"
                        ><a :href="`#${room.name}`">{{ room.name }}</a></el-menu-item
                    >
                </span>
            </span>
        </el-submenu>
    </el-menu>
</template>

<script lang="ts">
import { ScreepsData } from "@/data/type";
import { Options, Vue } from "vue-class-component";
// Define the component in class-style
@Options({
    props: {
        screepsData: Object
    }
})
export default class SideMenu extends Vue {
    screepsData!: ScreepsData;
    // Class properties will be component data
}
</script>

<style>
.el-menu-item a {
    color: #ffff80;
}
</style>
