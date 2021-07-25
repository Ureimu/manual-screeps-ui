<template>
    <p>data: {{ JSON.stringify(screepsData) }}</p>
    <Container :screepsData="screepsData" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Container from "./components/Container.vue";

import { ScreepsData } from "./renderData/type";

@Options({
    components: {
        Container
    }
})
export default class MainApp extends Vue {
    data() {
        return {
            screepsData: null as ScreepsData | null
        };
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
