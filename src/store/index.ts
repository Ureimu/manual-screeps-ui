import { createStore } from "vuex";
import { AXIS_TYPE } from "./mutations";

export default createStore<StoreStructure>({
    state: {
        options: {
            [AXIS_TYPE]: "time"
        }
    },
    mutations: {
        [AXIS_TYPE](state, type: "time" | "tick") {
            state.options[AXIS_TYPE] = type;
        }
    },
    actions: {},
    modules: {}
});

export interface StoreStructure {
    options: {
        axisType: "time" | "tick";
    };
}
