<template>
  <div class="app-container" style="padding: 5px !important">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="告警类型" prop="equipmentName">
        <el-input
          v-model="queryParams.equipmentName"
          placeholder="请输入事件名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="告警状态" prop="workStatus">
        <el-select v-model="queryParams.workStatus">
          <el-option
            v-for="item in  dict.type.work_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="warnTime">
        <el-date-picker clearable
          v-model="queryParams.warnTime1"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="warnList">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="pk" align="center" prop="pkWarn" v-if="true"/> -->
      <el-table-column label="事件名称" align="center" prop="equipmentName" />
      <el-table-column label="告警类型" align="center" prop="warnType" />
      <el-table-column label="所属园区" align="center" prop="pkPark"/>
      <!-- <el-table-column label="设备pk" align="center" prop="pkEquipment" /> -->
      <el-table-column label="关联设备" align="center" prop="warnEquipment" />
      <el-table-column label="告警时间" align="center" prop="warnTime" width="180">
      </el-table-column> 
      <el-table-column label="告警位置" align="center" prop="warnPlace" />
      <el-table-column label="告警状态" align="center" prop="workStatus" />
      <el-table-column label="告警照片" align="center" prop="" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />
  </div>
</template>
<script>
export default {
  name: "report1",
  dicts: ['work_status','warn_type'],
  data() {
    return {
      warnList: [],
      loading: false,
      // 总条数
      total: 0,
      showSearch: true,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        equipmentName: undefined,
        warnType: undefined,
        pkPark: undefined,
        pkEquipment: undefined,
        warnEquipment: undefined,
        warnPlace: undefined,
        warnTime: undefined,
        ts: undefined,
        dr: undefined
      },
    };
  },
  created(){
    this.handleQuery()
  },
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      // this.getList();
      this.warnList = [
        {
          "pkWarn": 1,
          "equipmentName": "异物占道",
          "warnType": "消防占道",
          "pkPark": "松江园区",
          "pkEquipment": 1,
          "warnEquipment": "SJ-SXQJ-001",
          "warnPlace": "11栋西北门岗",
          "warnTime": "2022-05-18 15:44:41",
          "workStatus": "已派单",
          "ts": "2022-05-18 15:44:55",
          "dr": "0"
        },
        {
          "pkWarn": 1,
          "equipmentName": "异物占道",
          "warnType": "消防占道",
          "pkPark": "松江园区",
          "pkEquipment": 1,
          "warnEquipment": "SJ-SXQJ-002",
          "warnPlace": "11栋西北门岗",
          "warnTime": "2022-05-18 16:44:41",
          "workStatus": "已处理",
          "ts": "2022-05-18 15:44:55",
          "dr": "0"
        },
        {
          "pkWarn": 1,
          "equipmentName": "私家车占道",
          "warnType": "消防占道",
          "pkPark": "松江园区",
          "pkEquipment": 1,
          "warnEquipment": "SJ-SXQJ-003",
          "warnPlace": "11栋西北门岗",
          "warnTime": "2022-05-18 17:44:41",
          "workStatus": "已处理",
          "ts": "2022-05-18 15:44:55",
          "dr": "0"
        }    
      ];
      this.total = 3;
      this.loading = false;
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>

