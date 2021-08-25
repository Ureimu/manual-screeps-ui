<template>
    <el-button type="primary" align="left" @click="dialogTableVisible = true">{{ title }}</el-button>

    <el-dialog title="creep spawn pool data" :fullscreen="true" v-model="dialogTableVisible">
        <el-table
            :data="rowData"
            style="width: 100%"
            :default-sort="{ prop: 'priority', order: 'descending' }"
            ref="filterTable"
            height="750"
        >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="creepName" label="creep名" width="160" sortable>
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.creepName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="creepBody"
                label="身体部件"
                width="100"
                :filters="getFliter(`creepBody`)"
                :filter-method="filterHandler"
            >
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top">
                        <template #default>
                            <p>姓名: {{ scope.row.creepName }}</p>
                            <p>body: {{ scope.row.creepBody }}</p>
                        </template>
                        <template #reference>
                            <div class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.creepBody }}</el-tag>
                            </div>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="priority"
                label="优先度"
                width="100"
                sortable
                :filters="getFliter(`priority`)"
                :filter-method="filterHandler"
            >
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.priority }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="readyCondition"
                label="准备条件"
                width="120"
                :filters="getFliter(`readyCondition`)"
                :filter-method="filterHandler"
            >
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.readyCondition }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="state"
                label="当前状态"
                width="120"
                :filters="getFliter(`state`)"
                :filter-method="filterHandler"
            >
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.state }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="creepGroupName"
                label="从属creep组"
                width="120"
                column-key="creepGroupName"
                :filters="getFliter(`creepGroupName`)"
                :filter-method="filterHandler"
            >
                <template #default="scope">
                    <span style="margin-left: 5px">{{
                        scope.row.creepGroupName ? scope.row.creepGroupName : `无`
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="routeName"
                label="从属路径"
                width="270"
                :filters="getFliter(`routeName`)"
                :filter-method="filterHandler"
            >
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.routeName ? scope.row.routeName : `无` }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色"
                width="180"
                :filters="getFliter(`roleName`)"
                :filter-method="filterHandler"
            >
                <template #default="scope">
                    <span style="margin-left: 5px">{{ scope.row.roleName ? scope.row.roleName : `无` }}</span>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #header>
                    <el-button @click="clearFilter" type="primary">清除所有过滤器</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script lang="ts">
import { creepBodyConfigDetail, CreepGroupMemory, CreepGroupMode, SpawnPoolData } from "@/data/type";
import { Options, Vue } from "vue-class-component";
// Define the component in class-style
type CreepData = {
    routeName?: string;
    roleName?: string;
    creepGroupName?: string;
};
@Options({
    props: {
        spawnPoolData: Object,
        msg: String,
        title: String,
        creepBodyConfig: Object,
        creepGroups: Object
    }
})
export default class ListOfCreepDialog extends Vue {
    declare $refs: {
        input: HTMLInputElement;
        filterTable: { clearFilter: Function };
    };
    msg!: string;
    title!: string;
    dialogTableVisible = false;
    spawnPoolData!: {
        [creepName: string]: SpawnPoolData;
    };
    creepBodyConfig!: {
        [name: string]: creepBodyConfigDetail;
    };
    creepGroups!: {
        [creepGroupName: string]: CreepGroupMemory<CreepGroupMode>;
    };
    clearFilter() {
        this.$refs.filterTable.clearFilter();
    }
    get rowData() {
        const list = [];
        if (this.creepGroups) {
            for (const creepName in this.spawnPoolData) {
                let creepData: CreepData = {};
                for (const creepGroupName in this.creepGroups) {
                    const creepGroupData = this.creepGroups[creepGroupName];
                    if (creepGroupData.creepNameList.includes(creepName)) {
                        if (creepGroupData.mode === "route") {
                            creepData.routeName = creepGroupData.routeName;
                        } else if (creepGroupData.mode === "role") {
                            creepData.roleName = creepGroupData.roleName;
                        }
                        creepData.creepGroupName = creepGroupName;
                    }
                }
                const data: {
                    [name: string]: number | string | undefined;
                } & SpawnPoolData &
                    CreepData = { ...this.spawnPoolData[creepName], ...creepData };
                list.push(data);
            }
        }
        return list;
    }
    getFliter(rowKey: string) {
        const textSet = new Set<string>();
        if (this.rowData) {
            for (const row of this.rowData) {
                if (row[rowKey]) textSet.add(row[rowKey] as string);
            }
        }
        return Array.from(textSet.keys()).map(value => ({ value, text: value }));
    }
    filterHandler(value: string, row: any, column: any) {
        const property = column["property"];
        console.log(JSON.stringify(column));
        console.log(property, row[property], value);
        console.log(JSON.stringify(row));
        return row[property] === value;
    }
    // Class properties will be component data
}
</script>

<style scoped>
p {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
}
.el-header {
    background-color: #d1d3d6;
    color: #666;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
