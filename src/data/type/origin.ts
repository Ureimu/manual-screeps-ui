export interface OriginScreepsData {
    timeSeriesData: FrameStats<number[]> & { timeStamp: SingleData<number[]>; gameTime: SingleData<number[]> };
    timeData: {
        tick: number;
        time: number;
    };
    userData: {
        gcl: LevelData;
        gpl: LevelData;
        name: string;
        error: ErrorSegmentMemory;
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
export interface ErrorSegmentMemory {
    cache: ErrorCache;
    isFull: boolean;
    uncaughtErrorNum: number;
}
export interface ErrorCache {
    [time: number]: SingleErrorCache;
}
export interface SingleErrorCache {
    messageList: { short: string; full: string[] }[];
    tick: number;
}

export interface SpawnPoolData {
    creepName: string;
    creepBody: string;
    priority: number;
    spawnCondition: string;
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
    store: {
        storage?: StoreData;
        terminal?: StoreData;
        factory?: StoreData;
    };
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

export type SingleTypedTreeDataNode<T> = T | SingleTypedTreeDataRecord<T>;

// 下面定义了一个树类型，需要借用接口的特性，参见https://stackoverflow.com/questions/46216048
// 除非你有更好的方案，否则不要去掉下面的eslint-disable-next-line
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SingleTypedTreeDataRecord<T> extends Record<string, SingleTypedTreeDataNode<T>> {}
export type SingleTypedTreeData<T> = Record<string, SingleTypedTreeDataNode<T>> & { timeStamp?: T; gameTime?: T };
export interface SingleData<T extends number[] | string | number> {
    data: T;
    type: string;
    depth: number;
}

export interface FrameStats<T extends string | number | number[]> {
    userData: {
        credits: SingleData<T>;
        pixels: SingleData<T>;
        gclProgress: SingleData<T>;
        gplProgress: SingleData<T>;
    };
    roomData: {
        [name: string]: {
            controllerProgress: SingleData<T>;
            storageData: {
                energy: SingleData<T>;
            };
            outwardsSourceEnergy: {
                [sourceName: string]: SingleData<T>;
            };
        };
    };
}

export interface StoreData {
    store: Record<string, number>;
    storeCapacity: number;
}
