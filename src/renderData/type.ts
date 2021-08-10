export interface ScreepsData {
    timeData: {
        tick: number;
        time: number;
    };
    userData: {
        gcl: LevelData;
        gpl: LevelData;
        name: string;
    };
    shardData: {
        shardName: string;
    };
    roomData: {
        [roomName: string]: RoomData;
    };
    globalData: {
        creepGroups: {
            [creepGroupName: string]: CreepGroupMemory<CreepGroupMode>;
        };
        creepBodyConfig: {
            [name: string]: creepBodyConfigDetail;
        };
    };
}

export type CreepGroupMemory<T extends CreepGroupMode> = T extends "route"
    ? {
          mode: "route";
          creepNameList: string[];
          routeName?: string;
          ifShow: boolean;
      }
    : T extends "role"
    ? {
          mode: "role";
          creepNameList: string[];
          roleName?: string;
          ifShow: boolean;
      }
    : never;

export type CreepGroupMode = "route" | "role";

export interface LevelData {
    level: number;
    progress: number;
    progressTotal: number;
}

export interface SpawnPoolData {
    creepName: string;
    creepBody: string;
    priority: number;
    readyCondition: string;
    state: string;
    roomName: string;
}
export type ControllerLevels = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type creepBodyConfigDetail = Partial<
    {
        [p in ControllerLevels]: {
            body: string;
        };
    }
>;

export interface RoomData {
    controller: {
        progressSpeed: string;
        ticksToUpgrade: string;
    } & LevelData;
    creep: {
        num: number;
    };
    projectDiagram: {
        maintenance: string;
        outwardsSource: {
            [sourceName: string]: {
                name: string;
                diagram: string;
            };
        };
    };
    name: string;
    spawnPool: {
        [creepName: string]: SpawnPoolData;
    };
}
