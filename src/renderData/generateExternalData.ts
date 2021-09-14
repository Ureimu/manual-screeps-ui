import { ExternalScreepsData } from "@/data/type/external";
import { OriginScreepsData } from "@/data/type/origin";
import _ from "lodash";

export function generateExternalData(originData: OriginScreepsData): ExternalScreepsData {
    const externalScreepsData: ExternalScreepsData = { external: { averageEnergyData: { }, limitedData: { gameTime: { data: [] }, timeStamp: { data: [] } } } };
    const gameTimeData = originData.timeSeriesData.gameTime.data;
    const tickLimit = 15000;
    console.log(gameTimeData)
    const availableData = gameTimeData.map((tick, index, tickData): [indexStart: number, indexEnd: number, duration: number] => {
        const returnData: [indexStart: number, indexEnd: number, duration: number] = [-1, -1, 0]
        tickData.slice(0, index).reduceRight((startTick, nowTick, startIndex) => {
            if ( startTick - nowTick> tickLimit && returnData[0] === -1) {
                returnData[0] = startIndex
                returnData[1] = index;
                returnData[2] = startTick-nowTick
            }
            return startTick
        }, tick);
        return returnData
    });
    console.log(availableData)
    const limitedTimeData = _.pull(availableData.map(([index]) => index === -1 ? -1 : originData.timeSeriesData.timeStamp.data[index]), -1);
    const limitedTickData = _.pull(availableData.map(([index]) => index === -1 ? -1 : originData.timeSeriesData.gameTime.data[index]), -1);
    externalScreepsData.external.limitedData.gameTime.data = limitedTickData
    externalScreepsData.external.limitedData.timeStamp.data = limitedTimeData
    Object.entries(originData.timeSeriesData.roomData).forEach(([roomName, roomData]) => {
        externalScreepsData.external.averageEnergyData[roomName] = { };
        if(roomData.outwardsSourceEnergy){
            Object.entries(roomData.outwardsSourceEnergy).forEach(([sourceName, sourceData]) => {
                const averageEnergyList: number[] = []
                availableData.forEach(([indexStart, indexEnd, duration]) => {
                    if (indexStart !== -1) {
                        averageEnergyList.push(Math.round(sourceData.data.slice(indexStart + 1, indexEnd + 1).reduce((sum, num) => sum + num, 0) / duration * 1500))
                    }
                })
                externalScreepsData.external.averageEnergyData[roomName][sourceName] = {
                    data: averageEnergyList
                };
            });
        }
    });
    console.log(JSON.stringify(externalScreepsData))
    return externalScreepsData;
}
