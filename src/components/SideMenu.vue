<template>
    <el-menu
        :uniqueOpened="true"
        default-active="1"
        class="el-menu-vertical-demo"
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
    <span>
        <p>
            <el-switch
                style="display: block"
                v-model="isUsingTimeAxis"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="时间轴"
                inactive-text="tick轴"
            >
            </el-switch>
        </p>
        <p>
            {{ switchState ? "time" : "tick" }}
        </p>
    </span>
</template>

<script lang="ts">
import { ScreepsData } from "@/data/type/converted";

import { AXIS_TYPE } from "@/store/mutations";
import { Options, Vue } from "vue-class-component";
// Define the component in class-style
@Options({
    props: {
        screepsData: Object
    },
    computed: {
        switchState(): boolean {
            if (this.isUsingTimeAxis) {
                if (this.$store.state.options[AXIS_TYPE] !== "time") {
                    this.$store.commit(AXIS_TYPE, "time");
                }

                // console.log("time");
                console.log("store: " + this.$store.state.options[AXIS_TYPE]);
            } else {
                if (this.$store.state.options[AXIS_TYPE] !== "tick") {
                    this.$store.commit(AXIS_TYPE, "tick");
                }
                // console.log("tick");
                console.log("store: " + this.$store.state.options[AXIS_TYPE]);
            }
            return this.isUsingTimeAxis;
        }
    }
})
export default class SideMenu extends Vue {
    screepsData!: ScreepsData;
    isUsingTimeAxis = true;
    // Class properties will be component data
}
</script>

<style>
.el-menu-item a {
    color: #ffff80;
}
</style>
