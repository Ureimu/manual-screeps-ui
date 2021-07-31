import { createApp } from "vue";
import MainApp from "./App.vue";
import installElementPlus from "./plugins/element";
import { ScreepsData } from "./renderData/type";
import { Base64 } from "js-base64";
import { runRender } from "./renderData";
import { testData } from "./data";

const app = createApp(MainApp);
installElementPlus(app);

if (process.env.NODE_ENV !== "production") {
    const fullData: ScreepsData = testData;
    runRender(fullData, app);
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
            alert("代码错误，如果可以的话，请联系 Ureium" + "\n");
            console.error(e);
            console.error(data);
        }
    });
    // 监听游戏传入进来的数据并进行渲染
    if (window.opener) window.opener.postMessage("ready", "*");
}
