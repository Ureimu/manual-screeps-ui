export interface ScreepsData {
    userData: {
        gcl: LevelData;
        gpl: LevelData;
    };
    shardData: {
        shardName: string;
    };
    roomData: {
        [roomName: string]: RoomData;
    };
}

export interface LevelData {
    level: number;
    progress: number;
    progressTotal: number;
}

export interface RoomData {
    controller: {
        progressSpeed: number;
        ticksToUpgrade: number;
    } & LevelData;
    creep: {
        num: number;
    };
}
