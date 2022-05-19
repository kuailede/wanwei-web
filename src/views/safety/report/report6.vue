<template>
  <div class="app-container">
    执法记录在线敬请期待！
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
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
          v-model="queryParams.warnTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择告警时间">
        </el-date-picker>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>
<script>
export default {
  name: "report1",
  dicts: ['work_status','warn_type'],
  data() {
    return {
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
  methods: {
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      // this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>

