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
}

export interface LevelData {
    level: number;
    progress: number;
    progressTotal: number;
}

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
        outwardsSource: { [roomName: string]: string };
    };
    name: string;
}
