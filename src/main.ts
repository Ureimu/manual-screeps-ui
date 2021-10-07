import { createApp } from "vue";
import MainApp from "./App.vue";
import installElementPlus from "./plugins/element";
import { ScreepsData } from "./data/type/converted";
import { Base64 } from "js-base64";
import { runRender } from "./renderData";
import { testData } from "./data";
import store from "./store";
import { OriginScreepsData } from "./data/type/origin";
import { rawData } from "./data/rawData";

const app = createApp(MainApp).use(store);
installElementPlus(app);

if (process.env.NODE_ENV !== "production") {
    const fullData: OriginScreepsData = testData;
    //runRender(fullData, app);
    const data = JSON.parse(Base64.decode(rawData)) as ScreepsData;
    console.log(data);
    runRender(data, app);
} else {
    let fullData: ScreepsData;
    window.addEventListener("message", ({ data }) => {
        try {
            fullData = data;
            console.log(fullData);
            if (typeof fullData === "string") {
                // if (fullData.startsWith("{", 0)) return;
                runRender(JSON.parse(Base64.decode(fullData)) as ScreepsData, app);
            }
        } catch (e) {
            alert(`代码错误，如果可以的话，请联系 Ureium\n${(e as Error).stack}`);
            throw e;
        }
    });
    // 监听游戏传入进来的数据并进行渲染
    if (window.opener) window.opener.postMessage("ready", "*");
}
