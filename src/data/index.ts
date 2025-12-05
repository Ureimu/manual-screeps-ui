import { ScreepsData } from "@/data/type/converted";
import _ from "lodash";
import { OriginScreepsData } from "./type/origin";
const runEpoch = (num: number, f: () => unknown) => {
    for (let i = 0; i < num; i++) {
        f();
    }
};
const getRandomList = (min: number, max: number, num: number) => {
    const numList: number[] = [];
    const interval = max - min;
    if (interval !== 0) {
        runEpoch(num, () => {
            numList.push(Math.round(Math.random() * interval + min));
        });
    } else {
        runEpoch(num, () => {
            numList.push(min);
        });
    }

    return numList;
};
const getRandomSumList = (min: number, max: number, num: number, base: number = 0) => {
    return getRandomList(min, max, num).map((a, index, array) => array.slice(0, index + 1).reduce(_.add, base));
};
const GameTime = 12042145;
const length = 1000;
const controllerProgressData1 = getRandomSumList(0, 2000, length / 2, 5.9e6);
const controllerProgressData2 = getRandomSumList(
    0,
    7000,
    length / 2,
    controllerProgressData1[controllerProgressData1.length - 1]
).concat(getRandomSumList(0, 4000, length / 2, 5.9e6));
const controllerProgressData = controllerProgressData1.concat(controllerProgressData2);
export const testData: OriginScreepsData = {
    timeSeriesData: {
        userData: {
            credits: {
                data: getRandomSumList(-11000, 10000, length, 1e6).map(a => 1e3 * a),
                depth: 21,
                type: "any"
            },
            pixels: {
                data: getRandomSumList(0, 100, length),
                depth: 21,
                type: "any"
            },
            gclProgress: {
                data: getRandomSumList(60, 70, length, 1e4),
                depth: 41,
                type: "any"
            },
            gplProgress: {
                data: getRandomSumList(60, 70, length, 1e4),
                depth: 41,
                type: "any"
            }
        },
        roomData: {
            E34S21: {
                controllerProgress: {
                    data: getRandomSumList(0, 0, length, 10.9e6),
                    depth: 21,
                    type: "any"
                },
                storageData: {
                    energy: {
                        data: getRandomSumList(-1000, 1000, length, 6e5),
                        depth: 21,
                        type: "any"
                    }
                },
                outwardsSourceEnergy: {
                    E32S21: {
                        data: getRandomSumList(-40, 40, length, 5e3),
                        depth: 21,
                        type: "any"
                    },
                    E31S21: {
                        data: getRandomSumList(-40, 40, length, 6e3),
                        depth: 21,
                        type: "any"
                    },
                    E35S21: {
                        data: getRandomSumList(-40, 40, length, 4e3),
                        depth: 21,
                        type: "any"
                    },
                    E35S22: {
                        data: getRandomSumList(-40, 40, length, 5e3),
                        depth: 21,
                        type: "any"
                    }
                }
            },
            E35S21: {
                controllerProgress: {
                    data: controllerProgressData,
                    depth: 21,
                    type: "any"
                },
                storageData: {
                    energy: {
                        data: getRandomSumList(-4500, 4000, length, 6e5),
                        depth: 21,
                        type: "any"
                    }
                },
                outwardsSourceEnergy: {
                    E32S21: {
                        data: getRandomSumList(-40, 40, length, 5e3),
                        depth: 21,
                        type: "any"
                    },
                    E31S21: {
                        data: getRandomSumList(-40, 40, length, 5e3),
                        depth: 21,
                        type: "any"
                    }
                }
            }
        },
        timeStamp: {
            data: getRandomSumList(1000 * 60 * 15, 1000 * 60 * 15, length, Date.now() - 1000 * 60 * 15 * length),
            type: "time",
            depth: 41
        },
        gameTime: {
            data: getRandomSumList(300, 300, length, GameTime - 300 * length),
            type: "time",
            depth: 41
        }
    },
    timeData: {
        tick: GameTime,
        time: Date.now()
    },
    shardData: { shardName: "testShard" },
    userData: {
        gcl: {
            level: 21,
            progress: 25,
            progressTotal: 100
        },
        gpl: {
            level: 67,
            progress: 68,
            progressTotal: 100
        },
        name: "Ureium",
        error: {
            cache: {
                "228000": {
                    messageList: [
                        {
                            short: "Error: test Error 1",
                            full: [
                                "Error: test Error",
                                "    at src/main.ts:11:40",
                                "    at wrap  (src/utils/profiler/wrap/loop.ts:115:11)",
                                "    at ErrorMapper.wrapLoop  (src/main.ts:10:4)",
                                "    at Object.loop  (src/utils/ErrorMapper.ts:118:16)"
                            ]
                        },
                        {
                            short: "Error: test Error 2",
                            full: [
                                "Error: test Error",
                                "    at src/main.ts:11:40",
                                "    at wrap  (src/utils/profiler/wrap/loop.ts:115:11)",
                                "    at ErrorMapper.wrapLoop  (src/main.ts:10:4)",
                                "    at Object.loop  (src/utils/ErrorMapper.ts:118:16)"
                            ]
                        },
                        {
                            short: "Error: test Error 3",
                            full: [
                                "Error: test Error",
                                "    at src/main.ts:11:40",
                                "    at wrap  (src/utils/profiler/wrap/loop.ts:115:11)",
                                "    at ErrorMapper.wrapLoop  (src/main.ts:10:4)",
                                "    at Object.loop  (src/utils/ErrorMapper.ts:118:16) Object.loop  (src/utils/ErrorMapper.ts:118:16)"
                            ]
                        },
                        {
                            short: "Error: test Error 4",
                            full: [
                                "Error: test Error",
                                "    at src/main.ts:11:40",
                                "    at wrap  (src/utils/profiler/wrap/loop.ts:115:11)",
                                "    at ErrorMapper.wrapLoop  (src/main.ts:10:4)",
                                "    at Object.loop  (src/utils/ErrorMapper.ts:118:16)"
                            ]
                        }
                    ],
                    tick: 228000
                },
                "228010": {
                    messageList: [
                        {
                            short: "Error: test Error",
                            full: [
                                "Error: test Error",
                                "    at src/main.ts:11:40",
                                "    at wrap  (src/utils/profiler/wrap/loop.ts:115:11)",
                                "    at ErrorMapper.wrapLoop  (src/main.ts:10:4)",
                                "    at Object.loop  (src/utils/ErrorMapper.ts:118:16)"
                            ]
                        }
                    ],
                    tick: 228010
                },
                "228030": {
                    messageList: [
                        {
                            short: "Error: test Error",
                            full: [
                                "Error: test Error",
                                "    at src/main.ts:11:40",
                                "    at wrap  (src/utils/profiler/wrap/loop.ts:115:11)",
                                "    at ErrorMapper.wrapLoop  (src/main.ts:10:4)",
                                "    at Object.loop  (src/utils/ErrorMapper.ts:118:16)"
                            ]
                        }
                    ],
                    tick: 228030
                }
            },
            isFull: false,
            uncaughtErrorNum: 0
        },
        memoryString: "{}"
    },
    globalData: {
        creepGroups: {
            W34N21h0: {
                mode: "route",
                creepNameList: ["W34N21h0"],
                ifShow: false,
                routeName: "W34N21keepHarvesting0"
            },
            W34N21h1: {
                mode: "route",
                creepNameList: ["W34N21h1"],
                ifShow: false,
                routeName: "W34N21keepHarvesting1"
            },
            W34N21c: {
                mode: "route",
                creepNameList: ["W34N21c0", "W34N21c1"],
                ifShow: false,
                routeName: "W34N21carrySourceAndFill"
            },
            W34N21up: {
                mode: "route",
                creepNameList: [
                    "W34N21up0",
                    "W34N21up1",
                    "W34N21up2",
                    "W34N21up3",
                    "W34N21up4",
                    "W34N21up5",
                    "W34N21up6",
                    "W34N21up7"
                ],
                ifShow: false,
                routeName: "W34N21upgradeBySource"
            },
            W34N21build: {
                mode: "route",
                creepNameList: ["W34N21build0", "W34N21build1"],
                ifShow: false,
                routeName: "W34N21buildStructureBySource"
            }
        },
        creepBodyConfig: {
            all: {
                "1": {
                    body: "m2w1c1"
                }
            },
            worker: {
                "1": {
                    body: "m2w1c1"
                },
                "2": {
                    body: "m1w1c1*2"
                },
                "3": {
                    body: "m1w1c1*4"
                },
                "4": {
                    body: "m1w1c1*6"
                },
                "5": {
                    body: "m1w1c1*7"
                }
            },
            harvester: {
                "1": {
                    body: "w2c1m1"
                },
                "2": {
                    body: "w4c1m1"
                },
                "3": {
                    body: "w6c1m1"
                },
                "5": {
                    body: "w8c4m2"
                }
            },
            carrier: {
                "1": {
                    body: "m3c3"
                },
                "2": {
                    body: "m3c6"
                },
                "3": {
                    body: "m5c10"
                },
                "4": {
                    body: "m8c16"
                },
                "5": {
                    body: "m10c20"
                }
            },
            scouter: {
                "1": {
                    body: "m1"
                }
            },
            centerCarrier: {
                "4": {
                    body: "m2c16"
                }
            },
            sourceKeeper: {
                "1": {
                    body: "m1a1"
                },
                "2": {
                    body: "a2m2"
                }
            }
        }
    },
    roomData: {
        E34S21: {
            store: {
                storage: {
                    store: { energy: 10000, K: 1000, O: 2000, X: 1000, LH2O: 1000 },
                    storeCapacity: 20000
                },
                terminal: {
                    store: { energy: 10000, K: 1000, O: 2000, X: 1000, LH2O: 1000 },
                    storeCapacity: 20000
                }
            },
            controller: {
                level: 8,
                progress: 1,
                progressTotal: 1,
                progressSpeed: "12.42",
                ticksToUpgrade: "485"
            },
            creep: { num: 7 },
            name: "E34S21",
            projectDiagram: {
                maintenance:
                    "Z3JhcGggVEIKc3RhcnROb2RlKCJzdGFydE5vZGU8YnIvPnN0YXRlOmVuZDxici8-c3RhcnQ6MTIzNDU8YnIvPmVuZDoxMjM0NTxici8-dGltZSBvZiBkdXJhdGlvbjowIikKc3R5bGUgc3RhcnROb2RlIGZpbGw6I2ZmOWE5YSxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZpcnN0KCJmaXJzdDxici8-c3RhdGU6c3RhcnQ8YnIvPnN0YXJ0OjEyMzQ1IikKc3R5bGUgZmlyc3QgZmlsbDojZGNkYzFjLHN0cm9rZTojMzMzLHN0cm9rZS13aWR0aDoycHgKc2Vjb25kKCJzZWNvbmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHNlY29uZCBmaWxsOiNkY2RjMWMsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweAp0aGlyZCgidGhpcmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHRoaXJkIGZpbGw6I2RjZGMxYyxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZvdXJ0aCgiZm91cnRoPGJyLz5zdGF0ZTp1bnBsYXllZCIpCnN0eWxlIGZvdXJ0aCBmaWxsOiNhYmM5MTUsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweApzdGFydE5vZGUgLS0-IGZpcnN0CnN0YXJ0Tm9kZSAtLT4gc2Vjb25kCnN0YXJ0Tm9kZSAtLT4gdGhpcmQKc2Vjb25kIC0tPiBmb3VydGgKdGhpcmQgLS0-IGZvdXJ0aA",
                outwardsSource: {},
                newRoom:
                    "Z3JhcGggVEIKc3RhcnROb2RlKCJzdGFydE5vZGU8YnIvPnN0YXRlOmVuZDxici8-c3RhcnQ6MTIzNDU8YnIvPmVuZDoxMjM0NTxici8-dGltZSBvZiBkdXJhdGlvbjowIikKc3R5bGUgc3RhcnROb2RlIGZpbGw6I2ZmOWE5YSxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZpcnN0KCJmaXJzdDxici8-c3RhdGU6c3RhcnQ8YnIvPnN0YXJ0OjEyMzQ1IikKc3R5bGUgZmlyc3QgZmlsbDojZGNkYzFjLHN0cm9rZTojMzMzLHN0cm9rZS13aWR0aDoycHgKc2Vjb25kKCJzZWNvbmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHNlY29uZCBmaWxsOiNkY2RjMWMsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweAp0aGlyZCgidGhpcmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHRoaXJkIGZpbGw6I2RjZGMxYyxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZvdXJ0aCgiZm91cnRoPGJyLz5zdGF0ZTp1bnBsYXllZCIpCnN0eWxlIGZvdXJ0aCBmaWxsOiNhYmM5MTUsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweApzdGFydE5vZGUgLS0-IGZpcnN0CnN0YXJ0Tm9kZSAtLT4gc2Vjb25kCnN0YXJ0Tm9kZSAtLT4gdGhpcmQKc2Vjb25kIC0tPiBmb3VydGgKdGhpcmQgLS0-IGZvdXJ0aA",
                getPower:
                    "Z3JhcGggVEIKc3RhcnROb2RlKCJzdGFydE5vZGU8YnIvPnN0YXRlOmVuZDxici8-c3RhcnQ6MTIzNDU8YnIvPmVuZDoxMjM0NTxici8-dGltZSBvZiBkdXJhdGlvbjowIikKc3R5bGUgc3RhcnROb2RlIGZpbGw6I2ZmOWE5YSxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZpcnN0KCJmaXJzdDxici8-c3RhdGU6c3RhcnQ8YnIvPnN0YXJ0OjEyMzQ1IikKc3R5bGUgZmlyc3QgZmlsbDojZGNkYzFjLHN0cm9rZTojMzMzLHN0cm9rZS13aWR0aDoycHgKc2Vjb25kKCJzZWNvbmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHNlY29uZCBmaWxsOiNkY2RjMWMsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweAp0aGlyZCgidGhpcmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHRoaXJkIGZpbGw6I2RjZGMxYyxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZvdXJ0aCgiZm91cnRoPGJyLz5zdGF0ZTp1bnBsYXllZCIpCnN0eWxlIGZvdXJ0aCBmaWxsOiNhYmM5MTUsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweApzdGFydE5vZGUgLS0-IGZpcnN0CnN0YXJ0Tm9kZSAtLT4gc2Vjb25kCnN0YXJ0Tm9kZSAtLT4gdGhpcmQKc2Vjb25kIC0tPiBmb3VydGgKdGhpcmQgLS0-IGZvdXJ0aA"
            },
            spawnPool: {
                W34N21h0: {
                    creepName: "W34N21h0",
                    creepBody: "harvester",
                    priority: 10,
                    spawnCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21h1: {
                    creepName: "W34N21h1",
                    creepBody: "harvester",
                    priority: 10,
                    spawnCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21up1t: {
                    creepName: "W34N21up1t",
                    creepBody: "worker",
                    priority: 8,
                    spawnCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21build0t: {
                    creepName: "W34N21build0t",
                    creepBody: "worker",
                    priority: 7,
                    spawnCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21build1t: {
                    creepName: "W34N21build1t",
                    creepBody: "worker",
                    priority: 7,
                    spawnCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21up2t: {
                    creepName: "W34N21up2t",
                    creepBody: "worker",
                    priority: 5,
                    spawnCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                }
            }
        },
        E35S21: {
            store: {
                storage: {
                    store: { energy: 10000, K: 1000, O: 2000, X: 1000, LH2O: 1000, U: 3e4, power: 5000 },
                    storeCapacity: 200000
                },
                terminal: {
                    store: { energy: 10000, K: 1000, O: 2000, X: 1000, LH2O: 1000, power: 5000 },
                    storeCapacity: 200000
                }
            },
            controller: {
                level: 7,
                progress: controllerProgressData[controllerProgressData.length - 1],
                progressTotal: 10.9e6,
                progressSpeed: "26.02",
                ticksToUpgrade: "88412"
            },
            creep: { num: 4 },
            name: "E35S21",
            projectDiagram: {
                maintenance:
                    "Z3JhcGggVEIKc3RhcnROb2RlKCJzdGFydE5vZGU8YnIvPnN0YXRlOmVuZDxici8-c3RhcnQ6MTIzNDU8YnIvPmVuZDoxMjM0NTxici8-dGltZSBvZiBkdXJhdGlvbjowIikKc3R5bGUgc3RhcnROb2RlIGZpbGw6I2ZmOWE5YSxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZpcnN0KCJmaXJzdDxici8-c3RhdGU6c3RhcnQ8YnIvPnN0YXJ0OjEyMzQ1IikKc3R5bGUgZmlyc3QgZmlsbDojZGNkYzFjLHN0cm9rZTojMzMzLHN0cm9rZS13aWR0aDoycHgKc2Vjb25kKCJzZWNvbmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHNlY29uZCBmaWxsOiNkY2RjMWMsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweAp0aGlyZCgidGhpcmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHRoaXJkIGZpbGw6I2RjZGMxYyxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZvdXJ0aCgiZm91cnRoPGJyLz5zdGF0ZTp1bnBsYXllZCIpCnN0eWxlIGZvdXJ0aCBmaWxsOiNhYmM5MTUsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweApzdGFydE5vZGUgLS0-IGZpcnN0CnN0YXJ0Tm9kZSAtLT4gc2Vjb25kCnN0YXJ0Tm9kZSAtLT4gdGhpcmQKc2Vjb25kIC0tPiBmb3VydGgKdGhpcmQgLS0-IGZvdXJ0aA",
                outwardsSource: {
                    E33S21Source0: {
                        name: "E33S21Source0",
                        diagram:
                            "Z3JhcGggVEIKc3RhcnROb2RlKCJzdGFydE5vZGU8YnIvPnN0YXRlOmVuZDxici8-c3RhcnQ6MTIzNDU8YnIvPmVuZDoxMjM0NTxici8-dGltZSBvZiBkdXJhdGlvbjowIikKc3R5bGUgc3RhcnROb2RlIGZpbGw6I2ZmOWE5YSxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZpcnN0KCJmaXJzdDxici8-c3RhdGU6c3RhcnQ8YnIvPnN0YXJ0OjEyMzQ1IikKc3R5bGUgZmlyc3QgZmlsbDojZGNkYzFjLHN0cm9rZTojMzMzLHN0cm9rZS13aWR0aDoycHgKc2Vjb25kKCJzZWNvbmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHNlY29uZCBmaWxsOiNkY2RjMWMsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweAp0aGlyZCgidGhpcmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHRoaXJkIGZpbGw6I2RjZGMxYyxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZvdXJ0aCgiZm91cnRoPGJyLz5zdGF0ZTp1bnBsYXllZCIpCnN0eWxlIGZvdXJ0aCBmaWxsOiNhYmM5MTUsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweApzdGFydE5vZGUgLS0-IGZpcnN0CnN0YXJ0Tm9kZSAtLT4gc2Vjb25kCnN0YXJ0Tm9kZSAtLT4gdGhpcmQKc2Vjb25kIC0tPiBmb3VydGgKdGhpcmQgLS0-IGZvdXJ0aA"
                    },
                    E33S21Source1: {
                        name: "E33S21Source1",
                        diagram:
                            "Z3JhcGggVEIKc3RhcnROb2RlKCJzdGFydE5vZGU8YnIvPnN0YXRlOmVuZDxici8-c3RhcnQ6MTIzNDU8YnIvPmVuZDoxMjM0NTxici8-dGltZSBvZiBkdXJhdGlvbjowIikKc3R5bGUgc3RhcnROb2RlIGZpbGw6I2ZmOWE5YSxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZpcnN0KCJmaXJzdDxici8-c3RhdGU6c3RhcnQ8YnIvPnN0YXJ0OjEyMzQ1IikKc3R5bGUgZmlyc3QgZmlsbDojZGNkYzFjLHN0cm9rZTojMzMzLHN0cm9rZS13aWR0aDoycHgKc2Vjb25kKCJzZWNvbmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHNlY29uZCBmaWxsOiNkY2RjMWMsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweAp0aGlyZCgidGhpcmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHRoaXJkIGZpbGw6I2RjZGMxYyxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZvdXJ0aCgiZm91cnRoPGJyLz5zdGF0ZTp1bnBsYXllZCIpCnN0eWxlIGZvdXJ0aCBmaWxsOiNhYmM5MTUsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweApzdGFydE5vZGUgLS0-IGZpcnN0CnN0YXJ0Tm9kZSAtLT4gc2Vjb25kCnN0YXJ0Tm9kZSAtLT4gdGhpcmQKc2Vjb25kIC0tPiBmb3VydGgKdGhpcmQgLS0-IGZvdXJ0aA"
                    }
                },
                newRoom:
                    "Z3JhcGggVEIKc3RhcnROb2RlKCJzdGFydE5vZGU8YnIvPnN0YXRlOmVuZDxici8-c3RhcnQ6MTIzNDU8YnIvPmVuZDoxMjM0NTxici8-dGltZSBvZiBkdXJhdGlvbjowIikKc3R5bGUgc3RhcnROb2RlIGZpbGw6I2ZmOWE5YSxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZpcnN0KCJmaXJzdDxici8-c3RhdGU6c3RhcnQ8YnIvPnN0YXJ0OjEyMzQ1IikKc3R5bGUgZmlyc3QgZmlsbDojZGNkYzFjLHN0cm9rZTojMzMzLHN0cm9rZS13aWR0aDoycHgKc2Vjb25kKCJzZWNvbmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHNlY29uZCBmaWxsOiNkY2RjMWMsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweAp0aGlyZCgidGhpcmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHRoaXJkIGZpbGw6I2RjZGMxYyxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZvdXJ0aCgiZm91cnRoPGJyLz5zdGF0ZTp1bnBsYXllZCIpCnN0eWxlIGZvdXJ0aCBmaWxsOiNhYmM5MTUsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweApzdGFydE5vZGUgLS0-IGZpcnN0CnN0YXJ0Tm9kZSAtLT4gc2Vjb25kCnN0YXJ0Tm9kZSAtLT4gdGhpcmQKc2Vjb25kIC0tPiBmb3VydGgKdGhpcmQgLS0-IGZvdXJ0aA",
                getPower:
                    "Z3JhcGggVEIKc3RhcnROb2RlKCJzdGFydE5vZGU8YnIvPnN0YXRlOmVuZDxici8-c3RhcnQ6MTIzNDU8YnIvPmVuZDoxMjM0NTxici8-dGltZSBvZiBkdXJhdGlvbjowIikKc3R5bGUgc3RhcnROb2RlIGZpbGw6I2ZmOWE5YSxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZpcnN0KCJmaXJzdDxici8-c3RhdGU6c3RhcnQ8YnIvPnN0YXJ0OjEyMzQ1IikKc3R5bGUgZmlyc3QgZmlsbDojZGNkYzFjLHN0cm9rZTojMzMzLHN0cm9rZS13aWR0aDoycHgKc2Vjb25kKCJzZWNvbmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHNlY29uZCBmaWxsOiNkY2RjMWMsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweAp0aGlyZCgidGhpcmQ8YnIvPnN0YXRlOnN0YXJ0PGJyLz5zdGFydDoxMjM0NSIpCnN0eWxlIHRoaXJkIGZpbGw6I2RjZGMxYyxzdHJva2U6IzMzMyxzdHJva2Utd2lkdGg6MnB4CmZvdXJ0aCgiZm91cnRoPGJyLz5zdGF0ZTp1bnBsYXllZCIpCnN0eWxlIGZvdXJ0aCBmaWxsOiNhYmM5MTUsc3Ryb2tlOiMzMzMsc3Ryb2tlLXdpZHRoOjJweApzdGFydE5vZGUgLS0-IGZpcnN0CnN0YXJ0Tm9kZSAtLT4gc2Vjb25kCnN0YXJ0Tm9kZSAtLT4gdGhpcmQKc2Vjb25kIC0tPiBmb3VydGgKdGhpcmQgLS0-IGZvdXJ0aA"
            },
            spawnPool: {}
        }
    }
};
