<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="工单名称" prop="woName">
        <el-input
          v-model="queryParams.woName"
          placeholder="请输入工单名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备编码" prop="assetCode">
        <el-input
          v-model="queryParams.assetCode"
          placeholder="请输入设备编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="工单类型" prop="typeCode">
        <el-select v-model="queryParams.typeCode">
          <el-option
            v-for="item in  dict.type.work_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="告警事件" prop="warnType">
        <el-select v-model="queryParams.warnType">
          <el-option
            v-for="item in dict.type.warn_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="优先级编码" prop="priorityCode">
        <el-input
          v-model="queryParams.priorityCode"
          placeholder="请输入优先级编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="报修单号" prop="mrId">
        <el-input
          v-model="queryParams.mrId"
          placeholder="请输入报修单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="工单描述" prop="woDescription">
        <el-input
          v-model="queryParams.woDescription"
          placeholder="请输入工单描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="故障模式" prop="failureModeCode">
        <el-input
          v-model="queryParams.failureModeCode"
          placeholder="请输入故障模式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="影响" prop="woImpactFunction">
        <el-input
          v-model="queryParams.woImpactFunction"
          placeholder="请输入影响"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="父工单号" prop="woPreviousWoId">
        <el-input
          v-model="queryParams.woPreviousWoId"
          placeholder="请输入父工单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="时间" prop="woFailureTime1">
        <el-date-picker
          v-model="queryParams.woFailureTime1"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="负责人编码" prop="responsibleCode">
        <el-input
          v-model="queryParams.responsibleCode"
          placeholder="请输入负责人编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="受理时间" prop="responsibleDate">
        <el-date-picker clearable
          v-model="queryParams.responsibleDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择受理时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属园区" prop="pkPark">
        <el-input
          v-model="queryParams.pkPark"
          placeholder="请输入所属园区"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备位置" prop="machinePlace">
        <el-input
          v-model="queryParams.machinePlace"
          placeholder="请输入设备位置"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="问题描述" prop="dealRemakr">
        <el-input
          v-model="queryParams.dealRemakr"
          placeholder="请输入问题描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理结果" prop="result">
        <el-input
          v-model="queryParams.result"
          placeholder="请输入处理结果"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建日期" prop="createDate">
        <el-date-picker clearable
          v-model="queryParams.createDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择创建日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="修改日期" prop="updateDate">
        <el-date-picker clearable
          v-model="queryParams.updateDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择修改日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间戳" prop="ts">
        <el-date-picker clearable
          v-model="queryParams.ts"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择时间戳">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否删除,0正常,1删除" prop="dr">
        <el-input
          v-model="queryParams.dr"
          placeholder="请输入是否删除,0正常,1删除"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['safety:workOrder:add']"
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
          v-hasPermi="['safety:workOrder:edit']"
        >修改</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['safety:workOrder:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['safety:workOrder:export']"
        >导出</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="workOrderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="pk" align="center" prop="pkWorkOrder" v-if="true"/> -->
      <el-table-column label="工单编号" align="center" prop="mrId" />
      <el-table-column label="工单名称" align="center" prop="woName" />
      <!-- <el-table-column label="设备编码" align="center" prop="assetCode" /> -->
      <el-table-column label="工单类型" align="center" prop="typeCode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.work_type" :value="scope.row.typeCode"/>
        </template>
      </el-table-column>
      <el-table-column label="所属园区" align="center" prop="pkPark" :formatter="parkFormat">
      </el-table-column>
      <el-table-column label="告警事件" align="center" prop="warnType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.warn_type" :value="scope.row.warnType"/>
        </template>
      </el-table-column>
      <el-table-column label="提单人" align="center" prop="machinePlace" />
      <el-table-column label="提单时间" align="center" prop="result" />
      <el-table-column label="受理人" align="center" prop="machinePlace" />
      <el-table-column label="受理时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单状态" align="center" prop="woStatus" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-detail"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['safety:workOrder:edit']"
          >详情</el-button>
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

    <!-- 添加或修改工单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工单名称" prop="woName">
          <el-input v-model="form.woName" placeholder="请输入工单名称" />
        </el-form-item>
        <!-- <el-form-item label="设备编码" prop="assetCode">
          <el-input v-model="form.assetCode" placeholder="请输入设备编码" />
        </el-form-item> -->
        <el-form-item label="工单类型" prop="typeCode">
          <el-select v-model="form.typeCode">
            <el-option
              v-for="item in  dict.type.work_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="告警事件" prop="warnType">
          <el-select v-model="form.warnType">
            <el-option
              v-for="item in dict.type.warn_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="优先级编码" prop="priorityCode">
          <el-input v-model="form.priorityCode" placeholder="请输入优先级编码" />
        </el-form-item> -->
        <!-- <el-form-item label="报修单号" prop="mrId">
          <el-input v-model="form.mrId" placeholder="请输入报修单号" />
        </el-form-item> -->
        <el-form-item label="工单描述" prop="woDescription">
          <el-input v-model="form.woDescription" placeholder="请输入工单描述" />
        </el-form-item>
        <!-- <el-form-item label="故障模式" prop="failureModeCode">
          <el-input v-model="form.failureModeCode" placeholder="请输入故障模式" />
        </el-form-item> -->
        <!-- <el-form-item label="影响" prop="woImpactFunction">
          <el-input v-model="form.woImpactFunction" placeholder="请输入影响" />
        </el-form-item>
        <el-form-item label="父工单号" prop="woPreviousWoId">
          <el-input v-model="form.woPreviousWoId" placeholder="请输入父工单号" />
        </el-form-item>
        <el-form-item label="故障时间" prop="woFailureTime">
          <el-date-picker clearable
            v-model="form.woFailureTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择故障时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="负责人编码" prop="responsibleCode">
          <el-input v-model="form.responsibleCode" placeholder="请输入负责人编码" />
        </el-form-item>
        <el-form-item label="受理时间" prop="responsibleDate">
          <el-date-picker clearable
            v-model="form.responsibleDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择受理时间">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="所属园区" prop="pkPark">
          <el-select v-model="form.pkPark">
            <el-option
              v-for="item in parkOptions"
              :key="item.pkPark"
              :label="item.parkName"
              :value="item.pkPark"
            />
          </el-select>
          <!-- <el-input v-model="form.pkPark" placeholder="请输入所属园区" /> -->
        </el-form-item>
        <el-form-item label="设备位置" prop="machinePlace">
          <el-input v-model="form.machinePlace" placeholder="请输入设备位置" />
        </el-form-item>
        <!-- <el-form-item label="问题描述" prop="dealRemakr">
          <el-input v-model="form.dealRemakr" placeholder="请输入问题描述" />
        </el-form-item>
        <el-form-item label="处理结果" prop="result">
          <el-input v-model="form.result" placeholder="请输入处理结果" />
        </el-form-item>
        <el-form-item label="创建日期" prop="createDate">
          <el-date-picker clearable
            v-model="form.createDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择创建日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="修改日期" prop="updateDate">
          <el-date-picker clearable
            v-model="form.updateDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择修改日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
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
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWorkOrder, getWorkOrder, delWorkOrder, addWorkOrder, updateWorkOrder } from "@/api/safety/workOrder";
import { listParkAll} from "@/api/system/park";
export default {
  name: "workOrder",
  dicts: ['work_type','warn_type'],
  data() {
    return {
      parkOptions: [],
      worktypeOptions: [],
      warnTypeOptions: [],
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
      // 工单表格数据
      workOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        woName: null,
        assetCode: null,
        typeCode: null,
        priorityCode: null,
        mrId: null,
        woStatus: null,
        woDescription: null,
        failureModeCode: null,
        woImpactFunction: null,
        woPreviousWoId: null,
        woFailureTime: null,
        responsibleCode: null,
        responsibleDate: null,
        pkPark: null,
        warnType: null,
        machinePlace: null,
        dealRemakr: null,
        result: null,
        createTime: null,
        updateTime: null,
        ts: null,
        dr: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        woName: [
          { required: true, message: "工单名称不能为空", trigger: "blur" }
        ],
        typeCode: [
          { required: true, message: "工单类型不能为空", trigger: "blur" }
        ],
        woDescription: [
          { required: true, message: "工单描述不能为空", trigger: "blur" }
        ],
        pkPark: [
          { required: true, message: "所属园区不能为空", trigger: "blur" }
        ],
        warnType: [
          { required: true, message: "告警事件不能为空", trigger: "change" }
        ],
        machinePlace: [
          { required: true, message: "设备位置不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    parkFormat(row,column){
       let labelData = this.parkOptions.find(item => row.pkPark === item.pkPark);
       return labelData !== undefined ? labelData.parkName : '';
    },
    /** 查询工单列表 */
    getList() {
      this.loading = true;
      // listParkAll().then(response => {
      //   this.parkOptions = response.data;
      // });
      listWorkOrder(this.queryParams).then(response => {
        this.workOrderList = response.rows;
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
        pkWorkOrder: null,
        woName: null,
        assetCode: null,
        typeCode: null,
        priorityCode: null,
        mrId: null,
        woStatus: "0",
        woDescription: null,
        failureModeCode: null,
        woImpactFunction: null,
        woPreviousWoId: null,
        woFailureTime: null,
        responsibleCode: null,
        responsibleDate: null,
        pkPark: null,
        warnType: null,
        machinePlace: null,
        dealRemakr: null,
        result: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        ts: null,
        dr: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      listParkAll().then(response => {
        this.parkOptions = response.data;
      });
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
      this.ids = selection.map(item => item.pkWorkOrder)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      listParkAll().then(response => {
        this.parkOptions = response.data;
      });
      this.title = "添加工单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const pkWorkOrder = row.pkWorkOrder || this.ids
      getWorkOrder(pkWorkOrder).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改工单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.pkWorkOrder != null) {
            updateWorkOrder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addWorkOrder(this.form).then(response => {
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
      const pkWorkOrders = row.pkWorkOrder || this.ids;
      this.$modal.confirm('是否确认删除工单编号为"' + pkWorkOrders + '"的数据项？').then(() => {
        this.loading = true;
        return delWorkOrder(pkWorkOrders);
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
      this.download('safety/workOrder/export', {
        ...this.queryParams
      }, `workOrder_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
