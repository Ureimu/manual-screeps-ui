export interface ExternalScreepsData {
    external: {
        limitedData: {
            gameTime: { data: number[] };
            timeStamp: { data: number[] };
        };
        averageEnergyData: {
            [roomName: string]: {
                [outwardsSourceName: string]: {
                    data: number[];
                };
            };
        };
    };
}
