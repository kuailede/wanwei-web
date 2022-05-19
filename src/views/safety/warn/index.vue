<template>
  <div class="app-container">
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

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['safety:warn:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['safety:warn:edit']"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['safety:warn:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['safety:warn:export']"
        >导出</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="warnList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="pk" align="center" prop="pkWarn" v-if="true"/> -->
      <el-table-column label="事件名称" align="center" prop="equipmentName" />
      <el-table-column label="告警类型" align="center" prop="warnType" />
      <el-table-column label="所属园区" align="center" prop="pkPark" :formatter="parkFormat"/>
      <!-- <el-table-column label="设备pk" align="center" prop="pkEquipment" /> -->
      <el-table-column label="关联设备" align="center" prop="warnEquipment" />
      <el-table-column label="告警时间" align="center" prop="warnTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.warnTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="告警位置" align="center" prop="warnPlace" />
      <el-table-column label="工单状态" align="center" prop="warnPlace" />
      <el-table-column label="告警照片" align="center" prop="warnPlace" />
      <!-- <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="时间戳" align="center" prop="ts" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ts, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否删除,0正常,1删除" align="center" prop="dr" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['safety:warn:edit']"
          >详情</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['safety:warn:remove']"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改告警中心对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="事件名称" prop="equipmentName">
          <el-input v-model="form.equipmentName" placeholder="请输入事件名称" />
        </el-form-item>
        <el-form-item label="所属园区" prop="pkPark">
          <el-select v-model="form.pkPark">
            <el-option
              v-for="item in parkOptions"
              :key="item.pkPark"
              :label="item.parkName"
              :value="item.pkPark"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="设备pk" prop="pkEquipment">
          <el-input v-model="form.pkEquipment" placeholder="请输入设备pk" />
        </el-form-item> -->
        <el-form-item label="关联设备" prop="warnEquipment">
          <el-input v-model="form.warnEquipment" placeholder="请输入关联设备" />
        </el-form-item>
        <el-form-item label="告警位置" prop="warnPlace">
          <el-input v-model="form.warnPlace" placeholder="请输入告警位置" />
        </el-form-item>
        <el-form-item label="告警时间" prop="warnTime">
          <el-date-picker clearable
            v-model="form.warnTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择告警时间">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="时间戳" prop="ts">
          <el-date-picker clearable
            v-model="form.ts"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择时间戳">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否删除,0正常,1删除" prop="dr">
          <el-input v-model="form.dr" placeholder="请输入是否删除,0正常,1删除" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button> -->
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWarn, getWarn, delWarn, addWarn, updateWarn } from "@/api/safety/warn";
import { listParkAll} from "@/api/system/park";
export default {
  name: "Warn",
  dicts: ['work_status','warn_type'],
  data() {
    return {
      parkOptions: [],
      // 按钮loading
      buttonLoading: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 告警中心表格数据
      warnList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pkWarn: [
          { required: true, message: "pk不能为空", trigger: "blur" }
        ],
        equipmentName: [
          { required: true, message: "事件名称不能为空", trigger: "blur" }
        ],
        warnType: [
          { required: true, message: "告警类型不能为空", trigger: "change" }
        ],
        pkPark: [
          { required: true, message: "所属园区不能为空", trigger: "blur" }
        ],
        pkEquipment: [
          { required: true, message: "设备pk不能为空", trigger: "blur" }
        ],
        warnEquipment: [
          { required: true, message: "关联设备不能为空", trigger: "blur" }
        ],
        warnPlace: [
          { required: true, message: "告警位置不能为空", trigger: "blur" }
        ],
        warnTime: [
          { required: true, message: "告警时间不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        ts: [
          { required: true, message: "时间戳不能为空", trigger: "blur" }
        ],
        dr: [
          { required: true, message: "是否删除,0正常,1删除不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    listParkAll().then(response => {
      this.parkOptions = response.data;
    });
    this.getList();
  },
  methods: {
     parkFormat(row,column){
       let labelData = this.parkOptions.find(item => row.pkPark === item.pkPark);
       return labelData !== undefined ? labelData.parkName : '';
    },
    /** 查询告警中心列表 */
    getList() {
      this.loading = true;
      listWarn(this.queryParams).then(response => {
        this.warnList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        pkWarn: undefined,
        equipmentName: undefined,
        warnType: undefined,
        pkPark: undefined,
        pkEquipment: undefined,
        warnEquipment: undefined,
        warnPlace: undefined,
        warnTime: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        ts: undefined,
        dr: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.pkWarn)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加告警中心";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const pkWarn = row.pkWarn || this.ids
      getWarn(pkWarn).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "告警中心详情";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.pkWarn != null) {
            updateWarn(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addWarn(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const pkWarns = row.pkWarn || this.ids;
      this.$modal.confirm('是否确认删除告警中心编号为"' + pkWarns + '"的数据项？').then(() => {
        this.loading = true;
        return delWarn(pkWarns);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).finally(() => {
        this.loading = false;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('safety/warn/export', {
        ...this.queryParams
      }, `warn_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
