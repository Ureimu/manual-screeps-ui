import {
    ElAside,
    ElBacktop,
    ElButton,
    ElCol,
    ElCollapse,
    ElCollapseItem,
    ElContainer,
    ElDialog,
    ElHeader,
    ElImage,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElProgress,
    ElRow,
    ElScrollbar,
    ElSelect,
    ElSubmenu,
    ElTabPane,
    ElTabs
} from "element-plus";
import lang from "element-plus/lib/locale/lang/zh-cn";
import locale from "element-plus/lib/locale";

export default (app: any) => {
    locale.use(lang);
    const elementList = [
        ElButton,
        ElSelect,
        ElProgress,
        ElRow,
        ElCol,
        ElContainer,
        ElHeader,
        ElMain,
        ElAside,
        ElMenu,
        ElMenuItem,
        ElMenuItemGroup,
        ElSubmenu,
        ElBacktop,
        ElScrollbar,
        ElCollapse,
        ElCollapseItem,
        ElTabs,
        ElTabPane,
        ElDialog,
        ElImage
    ];
    elementList.forEach(ele => app.use(ele));
};
