import { ScreepsData } from "@/renderData/type";

export const testData: ScreepsData = {
    shardData: { shardName: "testShard" },
    userData: {
        gcl: {
            level: 1,
            progress: 25,
            progressTotal: 100
        },
        gpl: {
            level: 1,
            progress: 10,
            progressTotal: 100
        }
    },
    roomData: {
        E34S21: {
            controller: {
                level: 1,
                progress: 10,
                progressTotal: 100,
                progressSpeed: 12.42,
                ticksToUpgrade: 8
            },
            creep: { num: 7 }
        }
    }
};
