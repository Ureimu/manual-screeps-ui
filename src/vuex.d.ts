// vuex.d.ts
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
    interface State {
        options: {
            axisType: "time" | "tick";
        };
    }
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
