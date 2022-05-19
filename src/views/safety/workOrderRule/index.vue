<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
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
      <el-form-item label="关联事件" prop="relatedEvents">
        <el-select v-model="queryParams.relatedEvents">
          <el-option
            v-for="item in dict.type.relation_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
       <el-form-item label="时间" prop="woFailureTime">
        <el-date-picker
          v-model="queryParams.woFailureTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
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
          v-hasPermi="['safety:workOrderRule:add']"
        >配置</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['safety:workOrderRule:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['safety:workOrderRule:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['safety:workOrderRule:export']"
        >导出</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="workOrderRuleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="pk" align="center" prop="pkWorkOrderRule" v-if="true"/> -->
      <el-table-column label="规则编号" align="center" prop="woName" />
      <el-table-column label="规则名称" align="center" prop="ruleName" />
      <el-table-column label="工单类型" align="center" prop="typeCode">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.work_type" :value="scope.row.typeCode"/>
        </template>
      </el-table-column>
      <el-table-column label="关联事件" align="center" prop="relatedEvents">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.relation_type" :value="scope.row.relatedEvents"/>
        </template>
      </el-table-column>
      <el-table-column label="派单方式" align="center" prop="sendWay">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.send_way" :value="scope.row.sendWay"/>
        </template>
      </el-table-column>
      <el-table-column label="处理时限" align="center" prop="timeLimit">
         <template slot-scope="scope">
          {{scope.row.timeLimit}}小时
        </template>
      </el-table-column>
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
            v-hasPermi="['safety:workOrderRule:edit']"
          >接单对象配置</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['safety:workOrderRule:remove']"
          >删除</el-button>
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

    <!-- 添加或修改工单配置规则对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="规则编号" prop="woName">
          <el-input v-model="form.woName" placeholder="请输入规则编号" />
        </el-form-item>
        <el-form-item label="规则名称" prop="ruleName">
          <el-input v-model="form.ruleName" placeholder="请输入规则名称" />
        </el-form-item>
        <el-form-item label="工单类型" prop="typeCode">
          <el-select v-model="form.typeCode">
            <el-option
              v-for="item in dict.type.work_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关联事件" prop="relatedEvents">
          <el-select v-model="form.relatedEvents">
            <el-option
              v-for="item in dict.type.relation_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="派单方式" prop="sendWay">
          <el-select v-model="form.sendWay">
            <el-option
              v-for="item in dict.type.send_way"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="处理时限" prop="timeLimit">
          <el-input v-model="form.timeLimit" placeholder="请输入处理时限">
             <i slot="suffix" style="margin-right: 10px">小时</i>
          </el-input>
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
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWorkOrderRule, getWorkOrderRule, delWorkOrderRule, addWorkOrderRule, updateWorkOrderRule } from "@/api/safety/workOrderRule";

export default {
  name: "WorkOrderRule",
  dicts: ['work_type','relation_type','send_way'],
  data() {
    return {
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
      // 工单配置规则表格数据
      workOrderRuleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        woName: undefined,
        ruleName: undefined,
        typeCode: undefined,
        relatedEvents: undefined,
        sendWay: undefined,
        timeLimit: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pkWorkOrderRule: [
          { required: true, message: "pk不能为空", trigger: "blur" }
        ],
        woName: [
          { required: true, message: "规则编号不能为空", trigger: "blur" }
        ],
        ruleName: [
          { required: true, message: "规则名称不能为空", trigger: "blur" }
        ],
        typeCode: [
          { required: true, message: "工单类型 work_type不能为空", trigger: "blur" }
        ],
        relatedEvents: [
          { required: true, message: "关联事件不能为空", trigger: "blur" }
        ],
        sendWay: [
          { required: true, message: "派单方式不能为空", trigger: "blur" }
        ],
        timeLimit: [
          { required: true, message: "处理时限 统一为小时不能为空", trigger: "blur" }
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
    this.getList();
  },
  methods: {
    /** 查询工单配置规则列表 */
    getList() {
      this.loading = true;
      listWorkOrderRule(this.queryParams).then(response => {
        this.workOrderRuleList = response.rows;
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
        pkWorkOrderRule: undefined,
        woName: undefined,
        ruleName: undefined,
        typeCode: undefined,
        relatedEvents: undefined,
        sendWay: undefined,
        timeLimit: undefined,
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
      this.ids = selection.map(item => item.pkWorkOrderRule)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加工单配置规则";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.$modal.msgError('功能开发中');
      return false;
      this.loading = true;
      this.reset();
      const pkWorkOrderRule = row.pkWorkOrderRule || this.ids
      getWorkOrderRule(pkWorkOrderRule).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改工单配置规则";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.pkWorkOrderRule != null) {
            updateWorkOrderRule(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addWorkOrderRule(this.form).then(response => {
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
      const pkWorkOrderRules = row.pkWorkOrderRule || this.ids;
      this.$modal.confirm('是否确认删除工单配置规则编号为"' + pkWorkOrderRules + '"的数据项？').then(() => {
        this.loading = true;
        return delWorkOrderRule(pkWorkOrderRules);
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
      this.download('safety/workOrderRule/export', {
        ...this.queryParams
      }, `workOrderRule_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
