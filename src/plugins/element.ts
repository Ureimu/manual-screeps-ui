import {
    ElAside,
    ElBacktop,
    ElButton,
    ElCard,
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
    ElPopover,
    ElProgress,
    ElRow,
    ElScrollbar,
    ElSelect,
    ElSpace,
    ElSubmenu,
    ElTable,
    ElTableColumn,
    ElTabPane,
    ElTabs,
    ElTag,
    ElDivider,
    ElSwitch
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
        ElImage,
        ElTable,
        ElTableColumn,
        ElPopover,
        ElTag,
        ElSpace,
        ElCard,
        ElDivider,
        ElSwitch
    ];
    elementList.forEach(ele => app.use(ele));
};
