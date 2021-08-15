import { ScreepsData } from "@/renderData/type";

export const testData: ScreepsData = {
    timeData: {
        tick: 12042145,
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
        }
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
                outwardsSource: {}
            },
            spawnPool: {
                W34N21h0: {
                    creepName: "W34N21h0",
                    creepBody: "harvester",
                    priority: 10,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21h1: {
                    creepName: "W34N21h1",
                    creepBody: "harvester",
                    priority: 10,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21c0: {
                    creepName: "W34N21c0",
                    creepBody: "carrier",
                    priority: 9,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21c1: {
                    creepName: "W34N21c1",
                    creepBody: "carrier",
                    priority: 9,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21up0: {
                    creepName: "W34N21up0",
                    creepBody: "worker",
                    priority: 8,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21up1: {
                    creepName: "W34N21up1",
                    creepBody: "worker",
                    priority: 8,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21build0: {
                    creepName: "W34N21build0",
                    creepBody: "worker",
                    priority: 7,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21build1: {
                    creepName: "W34N21build1",
                    creepBody: "worker",
                    priority: 7,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21up2: {
                    creepName: "W34N21up2",
                    creepBody: "worker",
                    priority: 5,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21h0t: {
                    creepName: "W34N21h0t",
                    creepBody: "harvester",
                    priority: 10,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21h1t: {
                    creepName: "W34N21h1t",
                    creepBody: "harvester",
                    priority: 10,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21c0t: {
                    creepName: "W34N21c0t",
                    creepBody: "carrier",
                    priority: 9,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21c1t: {
                    creepName: "W34N21c1t",
                    creepBody: "carrier",
                    priority: 9,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21up0t: {
                    creepName: "W34N21up0t",
                    creepBody: "worker",
                    priority: 8,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21up1t: {
                    creepName: "W34N21up1t",
                    creepBody: "worker",
                    priority: 8,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21build0t: {
                    creepName: "W34N21build0t",
                    creepBody: "worker",
                    priority: 7,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21build1t: {
                    creepName: "W34N21build1t",
                    creepBody: "worker",
                    priority: 7,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                },
                W34N21up2t: {
                    creepName: "W34N21up2t",
                    creepBody: "worker",
                    priority: 5,
                    readyCondition: "loop",
                    state: "notReady",
                    roomName: "W34N21"
                }
            }
        },
        E35S21: {
            controller: {
                level: 7,
                progress: 10,
                progressTotal: 100,
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
                }
            },
            spawnPool: {}
        }
    }
};
