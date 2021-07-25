<template>
    <div>
        <el-button type="primary" v-on:click="decrement">-</el-button>
        countNum: {{ count }}
        <el-button type="primary" v-on:click="increment">+</el-button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

// Define the component in class-style

export default class Counter extends Vue {
    // Class properties will be component data
    public count = 0;

    // Methods will be component methods
    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }

    mounted() {
        setInterval(() => {
            this.count++;
        }, 1000);
    }
}
</script>
