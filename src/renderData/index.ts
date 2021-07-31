import mermaid from "mermaid";
import { App } from "vue";
import { ScreepsData } from "./type";
export function runRender(fullData: ScreepsData, app: App): void {
    console.log("start render");

    const appInstance = app.mount("#app");
    const data = appInstance.$data as { screepsData: ScreepsData };
    if (data.screepsData === null) {
        data.screepsData = fullData;
        console.log("log1" + JSON.stringify(fullData));
    }

    mermaid.initialize({
        startOnLoad: true
    });
    console.log("render mermaid");

    console.log("finish render");
}
