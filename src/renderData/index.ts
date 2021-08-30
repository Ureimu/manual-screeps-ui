import { OriginScreepsData } from "@/data/type/origin";
import _ from "lodash";
import mermaid from "mermaid";
import { App } from "vue";
import { ScreepsData } from "../data/type/converted";
import { generateExternalData } from "./generateExternalData";
export function runRender(fullData: OriginScreepsData, app: App): void {
    console.log("start render");
    const mergedData = _.merge(fullData, generateExternalData(fullData));
    const appInstance = app.mount("#app");
    const data = appInstance.$data as { screepsData: ScreepsData };
    if (data.screepsData === null) {
        data.screepsData = mergedData;
        console.log("log1" + JSON.stringify(fullData));
    }

    mermaid.initialize({
        startOnLoad: true
    });
}
