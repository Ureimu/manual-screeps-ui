import {
    ElAside,
    ElButton,
    ElCol,
    ElContainer,
    ElHeader,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElProgress,
    ElRow,
    ElSelect,
    ElSubmenu
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
        ElSubmenu
    ];
    elementList.forEach(ele => app.use(ele));
};
